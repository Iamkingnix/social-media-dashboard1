import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { colors } from '../../constants/colors';
import { Button } from '../../components/Button';
import { usePlatformStore } from '../../store/platform-store';
import { platforms } from '../../constants/platforms';

export default function PlatformsScreen() {
  const { platforms: connectedPlatforms, connectPlatform, disconnectPlatform } = usePlatformStore();

  const handleConnect = async (platformId: string) => {
    try {
      await connectPlatform(platformId);
      Alert.alert('Success', 'Platform connected successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to connect platform');
    }
  };

  const handleDisconnect = async (platformId: string) => {
    Alert.alert(
      'Confirm Disconnect',
      'Are you sure you want to disconnect this platform?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: async () => {
            try {
              await disconnectPlatform(platformId);
              Alert.alert('Success', 'Platform disconnected successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to disconnect platform');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Connected Platforms</Text>
        
        {platforms.map((platform) => {
          const isConnected = connectedPlatforms.some(p => p.id === platform.id);
          
          return (
            <View key={platform.id} style={styles.platformCard}>
              <View style={styles.platformInfo}>
                <Ionicons
                  name={platform.icon as any}
                  size={24}
                  color={platform.color}
                />
                <View style={styles.platformTexts}>
                  <Text style={styles.platformName}>{platform.name}</Text>
                  <Text style={styles.platformStatus}>
                    {isConnected ? 'Connected' : 'Not Connected'}
                  </Text>
                </View>
              </View>
              
              <Button
                title={isConnected ? 'Disconnect' : 'Connect'}
                variant={isConnected ? 'outline' : 'primary'}
                onPress={() => isConnected
                  ? handleDisconnect(platform.id)
                  : handleConnect(platform.id)
                }
                style={styles.platformButton}
              />
            </View>
          );
        })}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Why Connect Platforms?</Text>
          <Text style={styles.infoText}>
            Connecting your social media platforms allows you to:
            {'\n\n'}
            • Post content directly from this app
            {'\n'}
            • Schedule posts for optimal timing
            {'\n'}
            • Track analytics across platforms
            {'\n'}
            • Manage all your social media in one place
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 24,
  },
  platformCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformTexts: {
    marginLeft: 12,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  platformStatus: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  platformButton: {
    minWidth: 100,
  },
  infoSection: {
    marginTop: 32,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});