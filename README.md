# Social Media Dashboard

A comprehensive social media management platform that allows users to create, schedule, and analyze content across multiple social media platforms.

## Features

- 🔐 Authentication & User Profiles
- 📝 Content Creation & Upload
- 🔄 Platform Management
- 📅 Content Scheduling
- 📊 Analytics Dashboard
- 🌙 Dark Theme with Pastel Accents

## Tech Stack

- React Native (Expo)
- TypeScript
- Zustand for State Management
- React Native Navigation
- Expo Router
- AsyncStorage for Persistence

## Project Structure

```
app/
├── (auth)/
│   ├── _layout.tsx
│   ├── login.tsx
│   └── signup.tsx
├── (tabs)/
│   ├── (home)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── content-details.tsx
│   ├── _layout.tsx
│   ├── create.tsx
│   ├── platforms.tsx
│   ├── schedule.tsx
│   └── analytics.tsx
├── _layout.tsx
└── modal.tsx
components/
├── Button.tsx
├── Input.tsx
├── ContentCard.tsx
├── PlatformBadge.tsx
└── EmptyState.tsx
constants/
├── colors.ts
└── platforms.ts
store/
├── auth-store.ts
├── content-store.ts
└── platform-store.ts
types/
└── content.ts
```

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/Iamkingnix/social-media-dashboard.git
```

2. Install dependencies
```bash
cd social-media-dashboard
bun install
```

3. Start the development server
```bash
bun expo start
```

## Environment Setup

Make sure you have the following installed:
- Node.js (v16 or higher)
- Bun
- Expo CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Current Status

Project initiated on 2025-03-14 05:49:35 UTC by @Iamkingnix