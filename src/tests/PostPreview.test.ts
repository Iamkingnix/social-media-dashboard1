import { render } from '@testing-library/react-native';
import { PostPreview } from '../components/PostPreview';

describe('PostPreview Component', () => {
  test('renders post preview correctly', () => {
    const mockProps = {
      text: 'Test post content',
      platforms: ['twitter', 'facebook'],
      username: 'Iamkingnix',
      images: []
    };

    const { getByText } = render(<PostPreview {...mockProps} />);
    expect(getByText('Test post content')).toBeTruthy();
  });
});