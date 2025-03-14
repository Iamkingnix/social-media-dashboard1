import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../../store/auth-store';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { colors } from '../../constants/colors';

export default function LoginScreen() {
  const router = useRouter();
  const { login, error, isLoading, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Clear any previous errors when the component mounts
  React.useEffect(() => {
    clearError();
  }, [clearError]);

  // Show error alert if login fails
  React.useEffect(() => {
    if (error) {
      Alert.alert('Login Error', error);
    }
  }, [error]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }
    
    await login(email, password);
    // If login is successful, the auth store will update and the _layout.tsx will handle navigation
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.form}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            autoComplete="password"
          />

          <Button
            title={isLoading ? "Signing in..." : "Sign In"}
            onPress={handleLogin}
            disabled={isLoading}
            style={styles.loginButton}
          />

          <TouchableOpacity 
            onPress={() => router.push("/signup")}
            style={styles.signupLink}
          >
            <Text style={styles.signupText}>
              Don't have an account? <Text style={styles.signupButtonText}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  loginButton: {
    marginTop: 8,
  },
  signupLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  signupText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  signupButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
});