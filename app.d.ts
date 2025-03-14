/// <reference types="expo-router/types" />

declare module '*.svg' {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
  }
  
  declare module '*.png' {
    const value: any;
    export = value;
  }
  
  declare module '*.jpg' {
    const value: any;
    export = value;
  }
  
  // Add environment variables types
  declare module '@env' {
    export const SOCIAL_MEDIA_API_KEY: string;
    export const ANALYTICS_API_KEY: string;
    export const API_URL: string;
  }