import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  onClear?: () => void;
  style?: StyleProp<ViewStyle>;
  label?: string;
  minimumDate?: Date;
  error?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  onClear,
  style,
  label = 'Schedule Date & Time',
  minimumDate = new Date(),
  error,
}) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleConfirm = (date: Date) => {
    setDatePickerVisible(false);
    onChange(date);
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.button,
          error ? styles.buttonError : null,
          value ? styles.buttonSelected : null,
        ]}
        onPress={() => setDatePickerVisible(true)}
      >
        <MaterialCommunityIcons
          name="calendar-clock"
          size={24}
          color={value ? colors.primary : colors.text.secondary}
        />
        <Text style={[styles.buttonText, value && styles.buttonTextSelected]}>
          {value ? formatDateTime(value) : 'Select date and time'}
        </Text>
        {value && onClear && (
          <TouchableOpacity
            onPress={onClear}
            style={styles.clearButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color={colors.text.secondary}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisible(false)}
        minimumDate={minimumDate}
        date={value || new Date()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 8,
    padding: 12,
  },
  buttonError: {
    borderColor: colors.error,
  },
  buttonSelected: {
    borderColor: colors.primary,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.text.secondary,
    flex: 1,
  },
  buttonTextSelected: {
    color: colors.text.primary,
  },
  clearButton: {
    padding: 4,
  },
  error: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});