import React, {useState} from 'react';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import {View, Modal, StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../../config/colors';
import {rMS} from '../../config/responsive';

interface DatePickerUIProps {
  handleCancelPressed: () => void;
  handleOkayPressed: (date: any) => void;
  dateValue: any;
  options?: any;
}

const DatePickerUI: React.FC<DatePickerUIProps> = ({
  handleCancelPressed,
  handleOkayPressed,
  dateValue,
  options,
}) => {
  const [date, setDate] = useState(dateValue);

  const handleDateChange = (newDate: any) => {
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
              // dividerColor={colors.themePrimary}
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
    padding: rMS(20),
    alignItems: 'center',
  },
  datePicker: {
    // marginBottom: 20,
    // backgroundColor: colors.primary,
    // shadowColor: 'red',
    // shadowRadius: 0,
    // shadowOpacity: 1,
    // shadowOffset: {height: 0, width: 0},
  },
  btnContainer: {
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
  btnText: {
    fontSize: rMS(12),
    fontWeight: '500',
    color: colors.primary,
  },
  cancelBtnText: {
    fontSize: rMS(12),
    color: colors.themePrimary,
    fontWeight: '600',
  },
  okayBtnContainer: {
    backgroundColor: colors.themePrimary,
    paddingHorizontal: 35,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
