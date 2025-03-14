import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PreviewBase } from './PreviewBase';
import { PLATFORMS } from '../../constants/platforms';
import { colors } from '../../constants/colors';

interface LinkedInPreviewProps {
  text: string;
  username?: string;
}

export const LinkedInPreview: React.FC<LinkedInPreviewProps> = ({
  text,
  username = 'Username',
}) => {
  const platform = PLATFORMS.find(p => p.id === 'linkedin')!;
  const remainingChars = 3000 - text.length; // LinkedIn's character limit

  return (
    <PreviewBase platform={platform}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/48' }}
          style={styles.avatar}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.tagline}>Your Professional Headline</Text>
          <View style={styles.postInfo}>
            <Text style={styles.timestamp}>Just now</Text>
            <MaterialCommunityIcons 
              name="earth" 
              size={12} 
              color={colors.text.secondary} 
            />
          </View>
        </View>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={20}
          color={colors.text.secondary}
          style={styles.menuIcon}
        />
      </View>

      <Text style={styles.text}>{text}</Text>

      <View style={styles.engagementBar}>
        <View style={styles.reactions}>
          <View style={styles.reactionIcons}>
            <View style={[styles.reactionIcon, { backgroundColor: '#0A66C2' }]}>
              <MaterialCommunityIcons name="thumb-up" size={12} color="#FFFFFF" />
            </View>
            <View style={[styles.reactionIcon, { backgroundColor: '#2867B2' }]}>
              <MaterialCommunityIcons name="heart" size={12} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.reactionCount}>0</Text>
        </View>
        <Text style={styles.engagementText}>0 comments</Text>
      </View>

      <View style={styles.actionBar}>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="thumb-up-outline"
            size={20}
            color={colors.text.secondary}
          />
          <Text style={styles.actionText}>Like</Text>
        </View>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="comment-outline"
            size={20}
            color={colors.text.secondary}
          />
          <Text style={styles.actionText}>Comment</Text>
        </View>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="share-outline"
            size={20}
            color={colors.text.secondary}
          />
          <Text style={styles.actionText}>Share</Text>
        </View>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="send-outline"
            size={20}
            color={colors.text.secondary}
          />
          <Text style={styles.actionText}>Send</Text>
        </View>
      </View>

      {remainingChars < 100 && (
        <Text style={[
          styles.charCount,
          remainingChars < 0 && styles.charCountError
        ]}>
          {remainingChars} characters remaining
        </Text>
      )}
    </PreviewBase>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.text.primary,
  },
  tagline: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  postInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  menuIcon: {
    padding: 4,
  },
  text: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
    marginBottom: 12,
  },
  engagementBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border.default,
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reactionIcons: {
    flexDirection: 'row',
  },
  reactionIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -4,
  },
  reactionCount: {
    fontSize: 12,
    color: colors.text.secondary,
    marginLeft: 4,
  },
  engagementText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  charCount: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 8,
    textAlign: 'right',
  },
  charCountError: {
    color: colors.error,
  },
});