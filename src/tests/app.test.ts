import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from '../App';
import { PostPreview } from '../components/PostPreview';
import { DateTimePicker } from '../components/DateTimePicker';

describe('Social Media Dashboard Tests', () => {
  test('App Navigation', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <App />
      </NavigationContainer>
    );
    
    const newPostTab = getByText('New Post');
    fireEvent.press(newPostTab);
    
    await waitFor(() => {
      expect(getByText('Create New Post')).toBeTruthy();
    });
  });
});