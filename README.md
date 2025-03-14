# Social Media Dashboard

A powerful cross-platform social media management dashboard built with React Native and Expo.

## Features

- 📱 Cross-platform (iOS, Android, Web)
- 📸 Multi-platform post creation
- 📅 Post scheduling
- 📊 Analytics tracking
- 📍 Location tagging
- 🖼️ Image editing and optimization
- 🔔 Push notifications
- 🌓 Dark/Light mode support
- 🔄 Auto-updates

## Platform-Specific Setup

### iOS Development Setup

1. Install Xcode (macOS only)
```bash
# Install Command Line Tools
xcode-select --install

# Install Xcode from App Store
# Open App Store and search for Xcode
```

2. Configure Xcode
```bash
# Open Xcode and accept license
sudo xcodebuild -license accept

# Install iOS Simulator
xcode-select -switch /Applications/Xcode.app
```

3. Install CocoaPods
```bash
sudo gem install cocoapods
```

4. Setup iOS project
```bash
cd ios
pod install
cd ..
```

### Android Development Setup

1. Install Android Studio
```bash
# Download from https://developer.android.com/studio
# Install Android Studio and launch it
```

2. Install Android SDK
```bash
# In Android Studio:
# 1. Go to Tools > SDK Manager
# 2. Select "SDK Platforms"
# 3. Check "Android 13 (Tiramisu)"
# 4. Select "SDK Tools"
# 5. Check:
#    - Android SDK Build-Tools
#    - Android Emulator
#    - Android SDK Platform-Tools
#    - Intel x86 Emulator Accelerator (HAXM)
```

3. Configure Environment Variables
```bash
# Add to ~/.bash_profile or ~/.zshrc:

# macOS/Linux
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Windows (System Environment Variables)
ANDROID_HOME=C:\Users\<username>\AppData\Local\Android\Sdk
Path=%Path%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
```

4. Create Android Virtual Device (AVD)
```bash
# In Android Studio:
# 1. Go to Tools > AVD Manager
# 2. Click "Create Virtual Device"
# 3. Select "Pixel 6"
# 4. Download and select "API 33"
# 5. Click "Finish"
```

### Web Development Setup

1. Install web dependencies
```bash
npm install --save-dev @expo/webpack-config
```

2. Configure web settings in app.json
```json
{
  "expo": {
    "web": {
      "favicon": "./assets/favicon.png",
      "backgroundColor": "#ffffff"
    }
  }
}
```

## General Setup

1. Clone the repository:
```bash
git clone https://github.com/Iamkingnix/social-media-dashboard.git
cd social-media-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Setup environment variables:
```bash
cp .env.example .env
```

4. Configure social media credentials:
```bash
# Twitter Setup
- Go to Twitter Developer Portal
- Create a new app
- Copy API keys to .env

# Facebook Setup
- Go to Facebook Developers
- Create a new app
- Add Facebook Login
- Copy App ID to .env

# Instagram Setup
- Connect to Facebook App
- Enable Instagram Basic Display API
- Copy Instagram App ID to .env

# LinkedIn Setup
- Go to LinkedIn Developers
- Create a new app
- Configure OAuth 2.0 settings
- Copy Client ID to .env
```

## Development

### Starting the Development Server

```bash
# Start Expo development server
npm start

# In separate terminals:
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

### Common Development Tasks

1. Adding a new screen:
```bash
# Create new screen in app/(tabs)
touch app/(tabs)/new-screen.tsx
```

2. Adding a new component:
```bash
# Create new component
mkdir -p components/NewComponent
touch components/NewComponent/index.tsx
touch components/NewComponent/styles.ts
```

3. Adding platform-specific code:
```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
      },
      android: {
        elevation: 5,
      },
      default: {
        // web
        boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
      },
    }),
  },
});
```

### Debugging

1. iOS Debugging:
```bash
# Open iOS Simulator logs
xcrun simctl spawn booted log stream --level debug

# Debug in Xcode
open ios/SocialMediaDashboard.xcworkspace
```

2. Android Debugging:
```bash
# Open Android logs
adb logcat

# Debug in Android Studio
# Open android/ folder in Android Studio
```

3. Web Debugging:
- Use Chrome DevTools
- Enable React Developer Tools
- Use Redux DevTools if applicable

## Troubleshooting

### iOS Issues

1. Pod install fails:
```bash
cd ios
pod deintegrate
pod cache clean --all
pod install
```

2. Build fails:
```bash
watchman watch-del-all
rm -rf node_modules
npm install
cd ios
pod install
cd ..
```

### Android Issues

1. Gradle build fails:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

2. Emulator issues:
```bash
# Clear AVD data
cd ~/Library/Android/sdk/tools/bin
./avdmanager delete avd -n <avd_name>
# Create new AVD through Android Studio
```

### Web Issues

1. Webpack build fails:
```bash
rm -rf node_modules/.cache
npm run web
```

[Continue with original README content...]
[Previous sections remain the same...]

## Debugging and Common Issues

### iOS Debugging Guide

#### Development Environment Issues

1. Xcode Build Errors
```bash
# Clear derived data
rm -rf ~/Library/Developer/Xcode/DerivedData

# Reset iOS simulator
xcrun simctl erase all

# Clean build folder
xcodebuild clean
```

2. Pod Issues
```bash
# Complete pod reset
cd ios
pod deintegrate
rm -rf Pods
rm -rf Podfile.lock
pod cache clean --all
pod install
cd ..
```

3. Metro Bundler Issues
```bash
# Clear metro cache
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

#### Runtime Debugging

1. Enable Network Inspection
```typescript
// Add to App.tsx
if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
}
```

2. Debug Layout Issues
```typescript
// Add temporary border to view
style={{
  borderWidth: 1,
  borderColor: 'red'
}}
```

3. Performance Monitoring
```typescript
import { Performance } from 'react-native';

Performance.mark('startProcess');
// ... your code
Performance.mark('endProcess');
Performance.measure('processTime', 'startProcess', 'endProcess');
```

### Android Debugging Guide

#### Build Issues

1. Gradle Sync Failed
```bash
# Clean gradle
cd android
./gradlew clean
rm -rf .gradle
rm -rf build
cd ..

# Update gradle wrapper
cd android
./gradlew wrapper
cd ..
```

2. Resource Not Found
```bash
# Clean android build
cd android
./gradlew cleanBuildCache
cd ..
rm -rf android/app/build
```

3. NDK Issues
```bash
# Update local.properties
echo "ndk.dir=$ANDROID_HOME/ndk-bundle" >> android/local.properties
```

#### Runtime Debugging

1. Enable Developer Menu
```bash
# Physical device
shake the device

# Emulator
⌘M (Mac) or Ctrl+M (Windows/Linux)
```

2. ADB Debugging Commands
```bash
# View logs
adb logcat | grep ReactNative

# Clear app data
adb shell pm clear com.Iamkingnix.socialmediaposts

# Install app
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

3. Memory Issues
```bash
# Check memory usage
adb shell dumpsys meminfo com.Iamkingnix.socialmediaposts
```

### Web Debugging Guide

#### Build Issues

1. Webpack Errors
```bash
# Clear cache
rm -rf node_modules/.cache
rm -rf web-build

# Rebuild
npm run web -- --reset-cache
```

2. Asset Loading Issues
```bash
# Check webpack config
module.exports = {
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      'react-native$': 'react-native-web'
    }
  }
};
```

#### Runtime Debugging

1. React DevTools Setup
```bash
# Install React DevTools
npm install -g react-devtools

# Launch DevTools
react-devtools
```

2. Performance Monitoring
```typescript
// Add to index.html
<script src="https://cdn.jsdelivr.net/npm/web-vitals"></script>

// Add to App.tsx
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

### Common Cross-Platform Issues

1. Image Loading Issues
```typescript
// Use proper resolution images
const Image = Platform.select({
  web: () => require('./image.web.jpg'),
  default: () => require('./image.native.jpg'),
})();
```

2. Navigation Issues
```typescript
// Clear navigation state
await AsyncStorage.removeItem('navigationState');
navigation.reset({
  index: 0,
  routes: [{ name: 'Home' }],
});
```

3. State Management Issues
```typescript
// Debug Redux store
import { createLogger } from 'redux-logger';

const logger = createLogger({
  collapsed: true,
  diff: true,
});

// Add to middleware
```

### Environment-Specific Issues

1. API Connection Issues
```typescript
// Add network debugging
if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
  global.FormData = global.originalFormData || global.FormData;
}
```

2. Social Media Authentication
```typescript
// Debug OAuth flow
const debugOAuth = async (platform: string) => {
  try {
    const result = await authorize(platform);
    console.log(`${platform} auth result:`, result);
  } catch (error) {
    console.error(`${platform} auth error:`, error);
  }
};
```

3. File System Issues
```typescript
// Debug file access
import * as FileSystem from 'expo-file-system';

const debugFileSystem = async () => {
  const info = await FileSystem.getInfoAsync(FileSystem.documentDirectory);
  console.log('File system info:', info);
};
```

### Performance Optimization Tips

1. Image Optimization
```typescript
// Implement image caching
import * as ImageCache from 'react-native-expo-image-cache';

const CachedImage = ({ uri }) => (
  <ImageCache.Image
    {...{ uri }}
    tint="light"
    transitionDuration={300}
  />
);
```

2. Memory Management
```typescript
// Implement component cleanup
useEffect(() => {
  return () => {
    // Cleanup resources
    ImageCache.clearCache();
  };
}, []);
```

3. Network Request Optimization
```typescript
// Implement request caching
import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60, // 1 hour
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
```

[Continue with original README content...]
[Previous sections remain the same...]

## Performance Profiling Guide

### React Native Performance Monitoring

#### Setup Performance Monitoring Tools

1. Install Dependencies
```bash
npm install --save-dev react-native-performance
npm install --save-dev react-native-performance-flipper
npm install --save-dev flipper-plugin-performance
```

2. Initialize Performance Monitoring
```typescript name=src/utils/performance.ts
import { Performance, PerformanceObserver } from 'react-native-performance';

export const initializePerformance = () => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log(`${entry.name}: ${entry.duration}ms`);
    });
  });

  observer.observe({ entryTypes: ['measure'] });
};
```

### Component Performance Profiling

1. Setup React Profiler
```typescript name=src/utils/profiler.tsx
import React, { ProfilerOnRenderCallback } from 'react';

const onRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  });
};

export const withProfiler = (WrappedComponent: React.ComponentType) => {
  return (props: any) => (
    <React.Profiler id={WrappedComponent.name} onRender={onRender}>
      <WrappedComponent {...props} />
    </React.Profiler>
  );
};
```

2. Measure Component Performance
```typescript name=components/PostPreview/index.tsx
import { withProfiler } from '../../src/utils/profiler';

const PostPreview: React.FC<PostPreviewProps> = ({ /* ... */ }) => {
  Performance.mark('PostPreview-start');
  
  // Component logic...
  
  Performance.mark('PostPreview-end');
  Performance.measure(
    'PostPreview-render',
    'PostPreview-start',
    'PostPreview-end'
  );
  
  return (/* ... */);
};

export default withProfiler(PostPreview);
```

### Memory Usage Profiling

1. Setup Memory Monitoring
```typescript name=src/utils/memory.ts
import { NativeModules } from 'react-native';

export const monitorMemory = () => {
  if (__DEV__) {
    const { heapTotal, heapUsed } = process.memoryUsage();
    console.log(`Heap Total: ${formatBytes(heapTotal)}`);
    console.log(`Heap Used: ${formatBytes(heapUsed)}`);
  }
};

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
```

### Network Performance Profiling

1. Setup Network Monitoring
```typescript name=src/utils/network.ts
import { InteractionManager } from 'react-native';

export const measureNetworkRequest = async (
  url: string,
  options: RequestInit
) => {
  const startTime = Performance.now();
  
  try {
    const response = await fetch(url, options);
    const endTime = Performance.now();
    
    console.log(`Request to ${url}: ${endTime - startTime}ms`);
    return response;
  } catch (error) {
    console.error(`Request failed: ${error}`);
    throw error;
  }
};
```

### Frame Rate Monitoring

1. Setup FPS Monitor
```typescript name=src/utils/fps.ts
import { Platform } from 'react-native';

class FPSMonitor {
  private lastFrameTime: number = 0;
  private frameCount: number = 0;
  private fps: number = 0;

  start() {
    const updateFPS = () => {
      const currentTime = Performance.now();
      const deltaTime = currentTime - this.lastFrameTime;
      
      this.frameCount++;
      
      if (deltaTime >= 1000) {
        this.fps = (this.frameCount * 1000) / deltaTime;
        this.frameCount = 0;
        this.lastFrameTime = currentTime;
        console.log(`Current FPS: ${Math.round(this.fps)}`);
      }
      
      requestAnimationFrame(updateFPS);
    };

    requestAnimationFrame(updateFPS);
  }
}

export const fpsMonitor = new FPSMonitor();
```

### Image Performance Optimization

1. Setup Image Performance Monitoring
```typescript name=src/utils/imagePerformance.ts
import { Image } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

export const optimizeImage = async (uri: string) => {
  Performance.mark('image-optimization-start');
  
  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1080 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    
    Performance.mark('image-optimization-end');
    Performance.measure(
      'image-optimization',
      'image-optimization-start',
      'image-optimization-end'
    );
    
    return result.uri;
  } catch (error) {
    console.error('Image optimization failed:', error);
    return uri;
  }
};
```

### Redux Performance Monitoring

1. Setup Redux Performance Middleware
```typescript name=src/utils/reduxPerformance.ts
import { Middleware } from 'redux';

export const performanceMiddleware: Middleware = () => (next) => (action) => {
  Performance.mark(`${action.type}-start`);
  
  const result = next(action);
  
  Performance.mark(`${action.type}-end`);
  Performance.measure(
    `${action.type}-duration`,
    `${action.type}-start`,
    `${action.type}-end`
  );
  
  return result;
};
```

### Performance Testing

1. Setup Performance Tests
```typescript name=src/tests/performance.test.ts
import { Performance } from 'react-native-performance';

describe('Performance Tests', () => {
  it('should render PostPreview within 16ms', async () => {
    Performance.mark('test-start');
    
    // Render component
    
    Performance.mark('test-end');
    const measurement = Performance.measure(
      'test-duration',
      'test-start',
      'test-end'
    );
    
    expect(measurement.duration).toBeLessThan(16);
  });
});
```

### Debug Performance in Development

1. Setup Development Performance Monitoring
```typescript name=src/utils/devPerformance.ts
if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
```

[Continue with original README content...]
[Previous sections remain the same...]

## Advanced Features and Workflows

### Social Media Post Scheduling System

1. Setup Scheduling Queue
```typescript name=src/utils/scheduler.ts
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = new Date('2025-03-14T18:08:38Z');
  const posts = await getScheduledPosts(now);
  
  for (const post of posts) {
    try {
      await publishPost(post);
      await markPostAsPublished(post.id);
    } catch (error) {
      await markPostAsFailed(post.id, error);
    }
  }
  
  return BackgroundFetch.BackgroundFetchResult.NewData;
});
```

2. Implement Post Queue Management
```typescript name=src/services/postQueue.ts
interface QueuedPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledTime: Date;
  images?: string[];
  status: 'pending' | 'published' | 'failed';
}

class PostQueueManager {
  private static instance: PostQueueManager;
  private queue: Map<string, QueuedPost> = new Map();

  static getInstance(): PostQueueManager {
    if (!PostQueueManager.instance) {
      PostQueueManager.instance = new PostQueueManager();
    }
    return PostQueueManager.instance;
  }

  async addToQueue(post: QueuedPost): Promise<void> {
    this.queue.set(post.id, post);
    await this.scheduleNotification(post);
  }

  async scheduleNotification(post: QueuedPost): Promise<void> {
    // Implementation
  }
}
```

### Analytics Integration

1. Setup Analytics Tracking
```typescript name=src/services/analytics.ts
interface PostAnalytics {
  postId: string;
  platform: string;
  impressions: number;
  engagements: number;
  clicks: number;
  shares: number;
}

class AnalyticsService {
  async trackPost(postId: string): Promise<PostAnalytics> {
    // Implementation
  }

  async generateReport(startDate: Date, endDate: Date): Promise<PostAnalytics[]> {
    // Implementation
  }
}
```

### Content Management System

1. Setup Media Library
```typescript name=src/services/mediaLibrary.ts
interface MediaAsset {
  id: string;
  uri: string;
  type: 'image' | 'video';
  metadata: {
    size: number;
    dimensions: {
      width: number;
      height: number;
    };
    created: Date;
  };
  tags: string[];
}

class MediaLibraryManager {
  async addAsset(uri: string, type: 'image' | 'video'): Promise<MediaAsset> {
    // Implementation
  }

  async searchAssets(query: string): Promise<MediaAsset[]> {
    // Implementation
  }
}
```

### AI-Powered Features

1. Setup Content Suggestions
```typescript name=src/services/contentSuggestions.ts
interface ContentSuggestion {
  text: string;
  hashtags: string[];
  bestTime: Date;
  targetPlatform: string;
  confidence: number;
}

class ContentSuggestionsService {
  async generateSuggestions(
    topic: string,
    platform: string
  ): Promise<ContentSuggestion[]> {
    // Implementation
  }

  async analyzeEngagement(
    content: string,
    platform: string
  ): Promise<number> {
    // Implementation
  }
}
```

### Advanced Platform Integration

1. Setup Cross-Platform Publishing
```typescript name=src/services/platformIntegration.ts
interface PlatformConfig {
  platform: string;
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  refreshToken: string;
}

class PlatformManager {
  private platforms: Map<string, PlatformConfig> = new Map();

  async authenticate(platform: string): Promise<void> {
    // Implementation
  }

  async publishContent(
    platform: string,
    content: string,
    media?: string[]
  ): Promise<string> {
    // Implementation
  }
}
```

### Real-time Collaboration

1. Setup Team Workspace
```typescript name=src/services/teamWorkspace.ts
interface WorkspaceUser {
  id: string;
  role: 'admin' | 'editor' | 'viewer';
  permissions: string[];
}

class WorkspaceManager {
  async inviteUser(email: string, role: string): Promise<void> {
    // Implementation
  }

  async assignTask(
    userId: string,
    task: string,
    deadline: Date
  ): Promise<void> {
    // Implementation
  }
}
```

### Custom Workflow Automation

1. Setup Workflow Rules
```typescript name=src/services/workflowAutomation.ts
interface WorkflowRule {
  id: string;
  trigger: {
    event: string;
    conditions: object;
  };
  actions: {
    type: string;
    params: object;
  }[];
}

class WorkflowAutomation {
  async createRule(rule: WorkflowRule): Promise<void> {
    // Implementation
  }

  async executeWorkflow(triggerId: string): Promise<void> {
    // Implementation
  }
}
```

### Advanced Error Handling

1. Setup Error Recovery
```typescript name=src/services/errorRecovery.ts
interface ErrorLog {
  id: string;
  timestamp: Date;
  error: Error;
  context: object;
  recovery?: {
    attempts: number;
    success: boolean;
    timestamp: Date;
  };
}

class ErrorRecoveryService {
  async handleError(error: Error, context: object): Promise<void> {
    // Implementation
  }

  async attemptRecovery(errorId: string): Promise<boolean> {
    // Implementation
  }
}
```

[Continue with original README content...]