import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AuthProvider } from '../contexts/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { AuthService } from '../services/AuthService';

const mockAuthService = {
  login: jest.fn(),
  logout: jest.fn(),
};

describe('Authentication Tests - 2025-03-14 18:32:37', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Login screen renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Remember Me')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  test('Login with valid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Username'), 'Iamkingnix');
    fireEvent.changeText(getByPlaceholderText('Password'), 'validPassword123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(mockAuthService.login).toHaveBeenCalledWith('Iamkingnix', 'validPassword123');
    });
  });

  test('Login with invalid credentials shows error', async () => {
    mockAuthService.login.mockRejectedValueOnce(new Error('Invalid credentials'));

    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Username'), 'wronguser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpass');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeTruthy();
    });
  });

  test('Remember Me functionality persists login state', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Username'), 'Iamkingnix');
    fireEvent.changeText(getByPlaceholderText('Password'), 'validPassword123');
    fireEvent.press(getByText('Remember Me'));
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'rememberedUser',
        'Iamkingnix'
      );
    });
  });

  test('Logout functionality clears session', async () => {
    const { getByText } = render(
      <AuthProvider>
        <LogoutButton />
      </AuthProvider>
    );

    fireEvent.press(getByText('Logout'));

    await waitFor(() => {
      expect(mockAuthService.logout).toHaveBeenCalled();
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('userToken');
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('rememberedUser');
    });
  });
});