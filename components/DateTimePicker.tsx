import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  DateTimePickerAndroid,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateTimePickerProps {
  value?: Date;
  onChange: (date?: Date) => void;
  onClear?: () => void;
  minimumDate?: Date;
  label?: string;
}

export const DateTimePickerComponent: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  onClear,
  minimumDate,
  label = 'Select Date & Time',
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const currentDate = new Date('2025-03-14T15:08:31Z'); // Using provided UTC time

  const showPicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: value || currentDate,
        onChange: (event, selectedDate) => {
          if (event.type === 'set' && selectedDate) {
            onChange(selectedDate);
          }
        },
        mode: 'datetime',
        minimumDate,
      });
    } else {
      setPickerVisible(true);
    }
  };

  const handleIosChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate);
      setPickerVisible(false);
    } else if (event.type === 'dismissed') {
      setPickerVisible(false);
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          style={[styles.button, value && styles.buttonWithValue]}
          onPress={showPicker}
        >
          <MaterialCommunityIcons
            name="calendar-clock"
            size={24}
            color={value ? colors.text.primary : colors.text.secondary}
          />
          <Text
            style={[
              styles.placeholder,
              value && styles.value,
            ]}
          >
            {value ? formatDateTime(value) : 'Select date and time'}
          </Text>
        </TouchableOpacity>

        {value && onClear && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={onClear}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={24}
              color={colors.text.secondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {Platform.OS === 'ios' && (
        <Modal
          visible={isPickerVisible}
          transparent
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.pickerWrapper}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity
                  onPress={() => setPickerVisible(false)}
                >
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.pickerTitle}>Select Date & Time</Text>
                <TouchableOpacity
                  onPress={() => {
                    onChange(value || currentDate);
                    setPickerVisible(false);
                  }}
                >
                  <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={value || currentDate}
                mode="datetime"
                display="spinner"
                onChange={handleIosChange}
                minimumDate={minimumDate}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  buttonWithValue: {
    borderColor: colors.border.active,
  },
  placeholder: {
    flex: 1,
    fontSize: 16,
    color: colors.text.secondary,
  },
  value: {
    color: colors.text.primary,
  },
  clearButton: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerWrapper: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  cancelButton: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  doneButton: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
});

// Export with a different name to avoid conflicts
export { DateTimePickerComponent as DateTimePicker };