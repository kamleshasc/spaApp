import React, {useState} from 'react';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import {View, Modal, StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../../config/colors';

interface DatePickerUIProps {
  handleCancelPressed: () => void;
  handleOkayPressed: (date: Date) => void;
  dateValue: Date;
  options?: any;
}

const DatePickerUI: React.FC<DatePickerUIProps> = ({
  handleCancelPressed,
  handleOkayPressed,
  dateValue,
  options,
}) => {
  const [date, setDate] = useState(dateValue);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };

  const onOkayPressed = () => {
    const selectedDate = handleOkayPressed(date);
    return selectedDate;
  };

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <DatePicker
              mode="date"
              style={styles.datePicker}
              date={date}
              onDateChange={handleDateChange}
              {...options}
            />
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.cancelBtnContainer}
                onPress={handleCancelPressed}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.okayBtnContainer}
                onPress={onOkayPressed}>
                <Text style={styles.btnText}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePickerUI;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  datePicker: {
    marginBottom: 20,
    backgroundColor: colors.primary,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelBtnContainer: {
    borderColor: 'rgb(248,62,85)',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 15,
  },
  btnText: {
    fontSize: 14,
    color: '#fff',
  },
  cancelBtnText: {
    fontSize: 14,
    color: 'rgb(248,62,85)',
  },
  okayBtnContainer: {
    backgroundColor: colors.secondaryDark,
    paddingHorizontal: 35,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
