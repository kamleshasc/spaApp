import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {View, Modal, StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../../config/colors';

interface DatePickerUIProps {
  handleCancelPressed: () => void;
  handleOkayPressed: (date: Date) => void;
  dateValue: Date;
}

const TimePickerUI: React.FC<DatePickerUIProps> = ({
  handleCancelPressed,
  handleOkayPressed,
  dateValue,
}) => {
  const [date, setDate] = useState(dateValue);

  const handleTimeChange = (newDate: Date) => {
    setDate(newDate);
  };

  const onOkayPressed = () => {
    const selectedDate = handleOkayPressed(date);
    return selectedDate;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onDismiss={() => handleCancelPressed()}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <DatePicker
            mode="time"
            style={styles.timePicker}
            date={date}
            onDateChange={handleTimeChange}
          />
          <View style={styles.btnRootContainer}>
            <TouchableOpacity
              style={styles.cancelBtnContainer}
              onPress={() => handleCancelPressed()}>
              <Text style={styles.canelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.okayBtnContainer}
              onPress={onOkayPressed}>
              <Text style={styles.okayBtnText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TimePickerUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  subContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  timePicker: {
    marginBottom: 20,
    backgroundColor: colors.primary,
  },
  btnRootContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelBtnContainer: {
    borderColor: colors.themePrimary,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 15,
  },
  canelBtnText: {
    fontSize: 14,
    color: colors.themePrimary,
  },
  okayBtnContainer: {
    backgroundColor: colors.themePrimary,
    paddingHorizontal: 35,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    alignSelf: 'center',
  },
  okayBtnText: {
    fontSize: 14,
    color: '#fff',
  },
});
