import React from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../config/colors';
import {UI} from '../..';
import {
  addDurationToTime,
  DateFormateMMMMDDYYY,
  generateTimeSlots,
} from '../../../config/helper';
import {HelperText} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../../hooks/storeHook';
import {newBooking} from '../../../redux/Action/bookingAction';
import {rMS} from '../../../config/responsive';
import {getEmployeeByServiceId} from '../../../redux/Action/serviceAction';

interface inputString {
  value: string;
}
interface inputAny {
  value: any;
}

interface bookingInputs {
  name: inputString;
  mail: inputString;
  phone: inputString;
  startTime: inputString;
  endTime: inputString;
  employeeId: inputString;
  selectedId: inputString;
  selectedParentId: inputString;
  duration: inputString;
  price: inputAny;
  serviceName: inputString;
}

const BookingIntialValue: bookingInputs = {
  name: {value: ''},
  mail: {value: ''},
  phone: {value: ''},
  startTime: {value: ''},
  endTime: {value: ''},
  employeeId: {value: ''},
  selectedId: {value: ''},
  selectedParentId: {value: ''},
  duration: {value: ''},
  price: {value: 0},
  serviceName: {value: ''},
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
  const [inputs, setInputs] = React.useState<bookingInputs>(BookingIntialValue);
  const [errorStatus, setErrorStatus] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const dispatchBookingDetails = useAppDispatch();
  const {data: employeeData} = useAppSelector(
    state => state.service.getEmployeeByServiceId,
  );
  const {data: subServiceData} = useAppSelector(
    state => state.service.getSubService,
  );

  const timeSlot = generateTimeSlots('09:00', '18:00');

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

  const handleBookings = async () => {
    try {
      let body = {
        date: selectedDate,
        serviceId: inputs?.selectedId?.value,
        serviceName: inputs?.serviceName?.value,
        price: inputs?.price?.value,
        parentId: inputs?.selectedParentId?.value,
        name: inputs?.name?.value,
        mail: inputs?.mail?.value,
        phone: inputs?.phone?.value,
        serviceStartTime: inputs?.startTime?.value,
        serviceEndTime: inputs?.endTime?.value,
        expertId: inputs?.employeeId?.value,
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
    try {
      const reg =
        /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|international|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
      const number = /^\d+$/;

      if (inputs?.name?.value?.trim().length <= 0) {
        setErrorStatus(true);
        setErrorMessage('All fields are required.');
        return;
      } else if (inputs?.mail?.value?.trim().length <= 0) {
        setErrorStatus(true);
        setErrorMessage('All fields are required.');
        return;
      } else if (
        inputs?.mail?.value?.trim().length > 0 &&
        !reg.test(inputs?.mail?.value)
      ) {
        setErrorStatus(true);
        setErrorMessage('Invalid Email.');
      } else if (inputs?.phone?.value?.trim().length <= 0) {
        setErrorStatus(true);
        setErrorMessage('All fields are required.');
        return;
      } else if (
        inputs?.phone?.value?.trim().length < 10 ||
        !number.test(inputs?.phone?.value)
      ) {
        setErrorStatus(true);
        setErrorMessage('Phone no is invalid.');
      } else if (inputs?.startTime?.value?.trim().length <= 0) {
        setErrorStatus(true);
        setErrorMessage('All fields are required.');
        return;
      } else if (inputs?.employeeId?.value?.trim().length <= 0) {
        setErrorStatus(true);
        setErrorMessage('Employee field is required.');
        return;
      } else {
        handleBookings();
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const clearAll = () => {
    setErrorMessage('');
    setErrorStatus(false);
    setInputs(BookingIntialValue);
  };

  const getEmployeeData = async (id: any) => {
    try {
      await dispatchBookingDetails(
        getEmployeeByServiceId({serviceId: id}),
      ).unwrap();
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error);
    }
  };

  const handleOnChangeTime = (value: {value: string}) => {
    let splitDuration = inputs.duration.value.split(' ')[0];
    let time = addDurationToTime(value.value, Number(splitDuration));

    inputChangedHandler('startTime', time.originalTime);
    inputChangedHandler('endTime', time.updatedTime);
  };

  const handleOnchangeService = (value: any) => {
    let indexSubService = subServiceData.findIndex(
      (s_data: any) => s_data.id == value.value,
    );

    inputChangedHandler('selectedId', subServiceData[indexSubService]?.id);
    inputChangedHandler(
      'selectedParentId',
      subServiceData[indexSubService]?.parentId,
    );
    inputChangedHandler('duration', subServiceData[indexSubService].duration);
    inputChangedHandler('price', subServiceData[indexSubService].price);
    inputChangedHandler('serviceName', subServiceData[indexSubService].name);
    getEmployeeData(subServiceData[indexSubService]?.parentId);
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
                <UI.DropDown
                  data={subServiceData.map(value => {
                    return {
                      label: value.name,
                      value: value.id,
                    };
                  })}
                  onChange={(value: any) => handleOnchangeService(value)}
                  placeholder={'Select Service'}
                  value={inputs?.selectedId?.value}
                  styles={[styles.dropdownStyle, {marginRight: rMS(5)}]}
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
              <View style={styles.fullWidth}>
                <UI.DropDown
                  styles={styles.selectEmployeeStyle}
                  data={employeeData.map(value => {
                    return {
                      label: `${value?.firstName} ${value?.lastName}`,
                      value: value?._id,
                    };
                  })}
                  placeholder="Select Employee"
                  value={inputs?.employeeId?.value}
                  onChange={(value: any) =>
                    inputChangedHandler('employeeId', value?.value)
                  }
                />
              </View>
            </View>
            <View style={styles.columnRowContainer}>
              <View style={styles.fullScreen}>
                <UI.Input
                  textInputConfig={{
                    onChangeText: (value: any) =>
                      inputChangedHandler('name', value),
                    placeholder: 'Enter Full Name',
                    value: inputs?.name?.value,
                  }}
                  stylesInput={styles.columnRowTextInputFull}
                />
              </View>
            </View>
            <View style={styles.columnRowContainer}>
              <View style={styles.fullScreen}>
                <UI.Input
                  textInputConfig={{
                    onChangeText: (value: any) =>
                      inputChangedHandler('mail', value),
                    placeholder: 'Enter Email',
                    value: inputs?.mail?.value,
                  }}
                  stylesInput={styles.columnRowTextInputLeft}
                />
              </View>
              <View style={styles.fullScreen}>
                <UI.Input
                  textInputConfig={{
                    onChangeText: (value: any) =>
                      inputChangedHandler('phone', value),
                    placeholder: 'Enter Phone No',
                    keyboardType: 'decimal-pad',
                    value: inputs?.phone?.value,
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
                    value: inputs?.duration?.value,
                  }}
                  stylesInput={styles.columnRowTextInputLeft}
                />
              </View>
              <View style={styles.fullScreen}>
                <UI.DropDown
                  data={timeSlot.map(value => {
                    return {
                      label: value.label,
                      value: value.value,
                    };
                  })}
                  onChange={(value: any) => handleOnChangeTime(value)}
                  placeholder={'Select Time'}
                  value={inputs?.startTime?.value}
                  styles={styles.dropdownStyle}
                />
                {/* </View> */}
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
                style={[styles.cancelBtnContainer]}
                // disabled={isLoader}
                onPress={() => {
                  cancelPressed(), clearAll();
                }}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.bookBtnContainer]}
                // disabled={isLoader}
                onPress={checkValidation}>
                <Text style={styles.bookBtnText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    borderColor: colors.themePrimary,
  },
  headerText: {
    fontSize: rMS(14),
    fontWeight: '600',
    color: colors.themePrimary,
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
    borderColor: colors.themePrimary,
    borderWidth: 1,
    paddingHorizontal: rMS(20),
    borderRadius: rMS(8),
    paddingVertical: rMS(6),
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 15,
  },
  cancelBtnText: {
    fontSize: rMS(13),
    color: colors.themePrimary,
    fontWeight: '500',
  },
  bookBtnContainer: {
    backgroundColor: colors.themePrimary,
    paddingHorizontal: rMS(35),
    borderRadius: rMS(8),
    paddingVertical: rMS(6),
    alignItems: 'center',
    alignSelf: 'center',
  },
  bookBtnText: {
    fontSize: rMS(14),
    fontWeight: '600',
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
  fullWidth: {
    width: '100%',
  },
  selectEmployeeStyle: {
    marginBottom: 0,
    marginHorizontal: 0,
    paddingVertical: rMS(6),
    ...Platform.select({
      ios: {
        paddingLeft: rMS(12),
      },
      android: {
        paddingLeft: rMS(14),
      },
    }),
  },
  dropdownStyle: {
    marginBottom: 0,
    marginHorizontal: 0,
    paddingVertical: rMS(3),
    paddingRight: 5,
    ...Platform.select({
      ios: {
        paddingLeft: rMS(13),
      },
      android: {
        paddingLeft: rMS(15),
      },
    }),
  },
});
