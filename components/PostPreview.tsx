// ... (previous imports)
import { FacebookPreview } from './previews/FacebookPreview';
import { LinkedInPreview } from './previews/LinkedInPreview';

export const PostPreview: React.FC<PostPreviewProps> = ({
  platforms,
  text,
  username,
}) => {
  const renderPlatformPreview = (platformId: string) => {
    switch (platformId) {
      case 'twitter':
        return (
          <TwitterPreview
            key={platformId}
            text={text}
            username={username}
          />
        );
      case 'instagram':
        return (
          <InstagramPreview
            key={platformId}
            caption={text}
            username={username}
          />
        );
      case 'facebook':
        return (
          <FacebookPreview
            key={platformId}
            text={text}
            username={username}
          />
        );
      case 'linkedin':
        return (
          <LinkedInPreview
            key={platformId}
            text={text}
            username={username}
          />
        );
      default:
        return null;
    }
  };

  // ... (rest of the code)
};