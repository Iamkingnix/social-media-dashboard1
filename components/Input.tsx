import React, { forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { colors } from '../constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<ViewStyle>;
}

export const Input = forwardRef<TextInput, InputProps>(({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  ...props
}, ref) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      <TextInput
        ref={ref}
        style={[
          styles.input,
          error ? { borderColor: colors.error } : undefined,
          inputStyle,
        ]}
        placeholderTextColor={colors.text.placeholder}
        {...props}
      />
      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
  error: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});