import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../config/colors';
import {UI} from '../..';
import Icon from 'react-native-vector-icons/AntDesign';
import TimePickerUI from '../../UI/TimePickerUI';
import {
  DateFormateMMMMDDYYY,
  formatAndAddMinutes,
} from '../../../config/helper';
import {HelperText} from 'react-native-paper';
import {useAppDispatch} from '../../../hooks/storeHook';
import {newBooking} from '../../../redux/Action/bookingAction';

interface inputString {
  value: string;
}

interface bookingInputs {
  name: inputString;
  mail: inputString;
  phone: inputString;
  startTime: inputString;
  endTime: inputString;
}

const BookingIntialValue: bookingInputs = {
  name: {value: ''},
  mail: {value: ''},
  phone: {value: ''},
  startTime: {value: ''},
  endTime: {value: ''},
};

interface TakeBookingDetailsProps {
  visible: boolean;
  cancelPressed: () => void;
  okayPressed: () => void;
  selectedDate: any;
  selectedDetails: any;
}

const TakeBookingDetails: React.FC<TakeBookingDetailsProps> = ({
  visible,
  cancelPressed,
  okayPressed,
  selectedDate,
  selectedDetails,
}) => {
  const [showTime, setShowTime] = React.useState(false);
  const [inputs, setInputs] = React.useState<bookingInputs>(BookingIntialValue);
  const [errorStatus, setErrorStatus] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const dispatchBookingDetails = useAppDispatch();

  const inputChangedHandler = (inputIdentifer: string, inputValue: any) => {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [inputIdentifer]: {value: inputValue},
      };
    });
    if (errorStatus) {
      setErrorMessage('');
      setErrorStatus(false);
    }
  };

  const handleTimeChange = (value: Date) => {
    let splitDuration = selectedDetails.duration.split(' ')[0];
    let time = formatAndAddMinutes(value, splitDuration);

    inputChangedHandler('startTime', time.originalDateFormatted);
    inputChangedHandler('endTime', time.newDateFormatted);
    setShowTime(false);
  };

  const handleBookings = async () => {
    try {
      let body = {
        date: selectedDate,
        serviceId: selectedDetails.id,
        parentId: selectedDetails.parentId,
        name: inputs.name.value,
        mail: inputs.mail.value,
        phone: inputs.phone.value,
        serviceStartTime: inputs.startTime.value,
        serviceEndTime: inputs.endTime.value,
      };
      const result = await dispatchBookingDetails(newBooking(body)).unwrap();
      if (result) {
        okayPressed();
        clearAll();
      }
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error);
    }
  };

  const checkValidation = () => {
    const reg =
      /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|international|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    const number = /^\d+$/;

    if (inputs.name.value.trim().length <= 0) {
      setErrorStatus(true);
      setErrorMessage('All fields are required.');
      return;
    } else if (inputs.mail.value.trim().length <= 0) {
      setErrorStatus(true);
      setErrorMessage('All fields are required.');
      return;
    } else if (
      inputs.mail.value.trim().length > 0 &&
      !reg.test(inputs.mail.value)
    ) {
      setErrorStatus(true);
      setErrorMessage('Invalid Email.');
    } else if (inputs.phone.value.trim().length <= 0) {
      setErrorStatus(true);
      setErrorMessage('All fields are required.');
      return;
    } else if (
      inputs.phone.value.trim().length < 10 ||
      !number.test(inputs.phone.value)
    ) {
      setErrorStatus(true);
      setErrorMessage('Phone no is invalid.');
    } else if (inputs.startTime.value.trim().length <= 0) {
      setErrorStatus(true);
      setErrorMessage('All fields are required.');
      return;
    } else {
      // let body = {
      //   date: selectedDate,
      //   name: inputs.name.value,
      //   mail: inputs.mail.value,
      //   phone: inputs.phone.value,
      // };
      handleBookings();
    }
  };

  const clearAll = () => {
    setErrorMessage('');
    setErrorStatus(false);
    setInputs(BookingIntialValue);
  };

  return (
    <View style={styles.root}>
      <Modal animationType="fade" transparent={true} visible={visible}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Book Service</Text>
            </View>

            <View style={styles.columnRowContainer}>
              <View style={styles.fullScreen}>
                <UI.Input
                  disableInput={true}
                  textInputConfig={{
                    placeholder: 'Service Name',
                    value: selectedDetails?.name,
                  }}
                  stylesInput={styles.columnRowTextInputLeft}
                />
              </View>
              <View style={styles.fullScreen}>
                <UI.Input
                  disableInput={true}
                  textInputConfig={{
                    placeholder: 'Date',
                    value: DateFormateMMMMDDYYY(selectedDate),
                  }}
                  stylesInput={styles.columnRowTextInputRight}
                />
              </View>
            </View>
            <View style={styles.columnRowContainer}>
              <View style={styles.fullScreen}>
                <UI.Input
                  showIcon={false}
                  iconPressed={() => setShowTime(true)}
                  textInputConfig={{
                    onChangeText: (value: any) =>
                      inputChangedHandler('name', value),
                    placeholder: 'Enter Full Name',
                    value: inputs.name.value,
                  }}
                  stylesInput={styles.columnRowTextInputFull}>
                  <Icon name="calendar" size={28} color="black" />
                </UI.Input>
              </View>
            </View>
            <View style={styles.columnRowContainer}>
              <View style={styles.fullScreen}>
                <UI.Input
                  textInputConfig={{
                    onChangeText: (value: any) =>
                      inputChangedHandler('mail', value),
                    placeholder: 'Enter Email',
                    value: inputs.mail.value,
                  }}
                  stylesInput={styles.columnRowTextInputLeft}
                />
              </View>
              <View style={styles.fullScreen}>
                <UI.Input
                  textInputConfig={{
                    onChangeText: (value: any) =>
                      inputChangedHandler('phone', value),
                    placeholder: 'Enter Phone No.',
                    keyboardType: 'decimal-pad',
                    value: inputs.phone.value,
                    maxLength: 10,
                  }}
                  stylesInput={styles.columnRowTextInputRight}
                />
              </View>
            </View>
            <View style={styles.columnRowContainer}>
              <View style={styles.fullScreen}>
                <UI.Input
                  disableInput={true}
                  textInputConfig={{
                    placeholder: 'Duration',
                    value: String(selectedDetails?.duration),
                  }}
                  stylesInput={styles.columnRowTextInputLeft}
                />
              </View>
              <View style={styles.fullScreen}>
                <UI.Input
                  iconPressed={() => setShowTime(true)}
                  disableInput={true}
                  showIcon={true}
                  textInputConfig={{
                    placeholder: 'Select Time',
                    value: inputs.startTime.value,
                  }}
                  stylesInput={styles.columnRowTextInputRight}>
                  <Icon name="calendar" size={28} color="black" />
                </UI.Input>
              </View>
            </View>
            {errorStatus && (
              <View style={styles.errorContainer}>
                <HelperText
                  type="error"
                  visible={true}
                  style={styles.errorText}>
                  {errorMessage}
                </HelperText>
              </View>
            )}
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.cancelBtnContainer}
                onPress={() => {
                  cancelPressed(), clearAll();
                }}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bookBtnContainer}
                onPress={checkValidation}>
                <Text style={styles.bookBtnText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {showTime && (
        <TimePickerUI
          dateValue={selectedDate}
          handleCancelPressed={() => setShowTime(false)}
          handleOkayPressed={value => handleTimeChange(value)}
        />
      )}
    </View>
  );
};

export default TakeBookingDetails;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'absolute',
  },
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  subContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    borderRadius: 10,
    maxWidth: 700,
    marginHorizontal: 8,
    paddingVertical: 20,
  },
  headerContainer: {
    marginBottom: 20,
    paddingBottom: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.fontDark,
  },
  columnRowContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  columnRowTextInputLeft: {
    marginBottom: 0,
    marginHorizontal: 0,
    paddingVertical: 0,
    marginRight: 8,
  },
  columnRowTextInputRight: {
    marginBottom: 0,
    marginHorizontal: 0,
    paddingVertical: 0,
  },
  columnRowTextInputFull: {
    marginBottom: 0,
    marginHorizontal: 0,
    paddingVertical: 0,
    marginRight: 0,
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
  cancelBtnText: {
    fontSize: 14,
    color: 'rgb(248,62,85)',
  },
  bookBtnContainer: {
    backgroundColor: colors.secondaryDark,
    paddingHorizontal: 35,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    alignSelf: 'center',
  },
  bookBtnText: {
    fontSize: 14,
    color: '#fff',
  },
  errorContainer: {
    marginTop: -10,
    marginLeft: 0,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
