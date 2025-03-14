import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PreviewBase } from './PreviewBase';
import { PLATFORMS } from '../../constants/platforms';
import { colors } from '../../constants/colors';

interface FacebookPreviewProps {
  text: string;
  username?: string;
}

export const FacebookPreview: React.FC<FacebookPreviewProps> = ({
  text,
  username = 'Username',
}) => {
  const platform = PLATFORMS.find(p => p.id === 'facebook')!;
  const remainingChars = 63206 - text.length; // Facebook's character limit

  return (
    <PreviewBase platform={platform}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.avatar}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{username}</Text>
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
          <MaterialCommunityIcons
            name="thumb-up"
            size={16}
            color={platform.color}
          />
          <Text style={styles.reactionCount}>0</Text>
        </View>
        <View style={styles.engagement}>
          <Text style={styles.engagementText}>0 Comments</Text>
          <Text style={styles.engagementDot}>•</Text>
          <Text style={styles.engagementText}>0 Shares</Text>
        </View>
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
      </View>
    </PreviewBase>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.text.primary,
  },
  postInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  menuIcon: {
    padding: 4,
  },
  text: {
    fontSize: 15,
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
  reactionCount: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  engagement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  engagementText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  engagementDot: {
    fontSize: 13,
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
    fontSize: 13,
    color: colors.text.secondary,
  },
});