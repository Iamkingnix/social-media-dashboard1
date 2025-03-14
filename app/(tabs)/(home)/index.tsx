import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../../constants/colors';
import { Button } from '../../../components/Button';
import { ContentCard } from '../../../components/ContentCard';

// Define types for our content state
interface ContentItem {
  id: string;
  title: string;
  description: string;
  platforms: string[];
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'published';
  mediaType?: 'text' | 'image' | 'video';
}

interface HomeState {
  content: ContentItem[];
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: HomeState = {
  content: [],
  isLoading: false,
  error: null,
};

export default function HomeScreen() {
  const router = useRouter();
  const [state, setState] = React.useState<HomeState>(initialState);

  React.useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      // TODO: Replace with your actual API call
      const response = await fetch('YOUR_API_ENDPOINT/content');
      const data = await response.json();

      setState({
        content: data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        content: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch content',
      });
    }
  };

  const handleContentPress = (contentId: string) => {
    router.push(`/content/${contentId}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Button
            title="Create New Post"
            onPress={() => router.push('/new-post')}
            style={styles.createButton}
          />
        </View>

        {state.content.map((item) => (
          <ContentCard
            key={item.id}
            content={item}
            onPress={() => handleContentPress(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  createButton: {
    minWidth: 120,
  },
});