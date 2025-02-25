import React from 'react';
import {
  Modal,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {rMS, rV} from '../../config/responsive';
import {SCREEN, UI} from '../../components';
import {
  addDurationToTime,
  convertDateStringToDateWithZone,
  DateFormateMMMMDDYYY,
  formatAndAddMinutes,
  generateTimeSlots,
} from '../../config/helper';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {clearUserBookingErrorMessage} from '../../redux/Reducer/bookingReducer/userBookingSlice';
import {
  customerBooking,
  getBookingByExpertId,
} from '../../redux/Action/bookingAction';
// import TimelineCalendarScreen from '../../components/screen/book/Timetable';
// import Timetable from '../../components/screen/book/Timetable';
import moment from 'moment';
import Timetable from 'react-native-calendar-timetable';
import {clearGetBookingByExpertIdErrorMsg} from '../../redux/Reducer/bookingReducer/getBookinByExpertIdSlice';

type BookingProps = CompositeScreenProps<
  StackScreenProps<RootStackParamList, 'BookingTimeLine'>,
  DrawerScreenProps<DrawerNavigationParamList>
>;

function YourComponent({style, item, dayIndex, daysTotal, index}: any) {

  return (
    <View
      style={{
        ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
        backgroundColor: 'red',
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        maxWidth: '40%',
        // padding: 5,
        // marginTop:2
        // marginLeft: 0,
        // left: 0,
        // flex: 0.5,
      }}>
      <View style={{flexDirection: 'row'}}>
        {/* <Text
          style={{
            fontSize: rMS(12),
            fontWeight: '600',
            color: '#fff',
            marginRight: 5,
          }} numberOfLines={1}>
          Service:
        </Text> */}
        <Text
          style={{fontSize: rMS(12), fontWeight: '600', color: '#fff'}}
          numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        {/* <Text
          style={{
            fontSize: rMS(12),
            fontWeight: '600',
            color: '#fff',
            marginRight: 5,
          }}>
          {'Time:'}
        </Text> */}
        <Text style={{fontSize: rMS(12), fontWeight: '500', color: '#fff'}}>
          <Text>{item.startTime}</Text>
          <Text>-</Text>
          <Text>{item.endTime}</Text>
        </Text>
      </View>
    </View>
  );
}

function TimeLine({navigation, route}: BookingProps) {
  const {payload} = route.params;
  const {width, height} = useWindowDimensions();
  const [successModal, setSuccessModal] = React.useState(false);
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [errorStatus, setErrorStatus] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const timeSlot = generateTimeSlots('09:00', '18:00');
  const dispatchTimeLine = useAppDispatch();
  const {errorMsg, isError, isLoader} = useAppSelector(
    state => state.booking.userBooking,
  );
  const {data: BookingSlots, isLoader: getBookinStatus} = useAppSelector(
    state => state.booking.getBookingSlotByExpert,
  );

  const handleOnPressOkay = () => {
    setSuccessModal(false)
    navigation.navigate('Book');
  };

  React.useEffect(() => {
    getBookedSlots();
  }, []);

  React.useEffect(() => {
    if (isError && !errorStatus) {
      setErrorStatus(isError);
      setErrorMessage(errorMsg?.toString());
    }
  }, [isLoader]);

  const SuccessFullModal = () => {
    return (
      <Modal animationType="fade" transparent={true} visible={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Successfully Booked</Text>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Date:</Text>
              <Text style={styles.modalValue}>{payload?.date}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Time:</Text>
              <Text
                style={styles.modalValue}>{`${startTime} - ${endTime}`}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Service:</Text>
              <Text style={styles.modalValue}>{payload?.serviceName}</Text>
            </View>

            <TouchableOpacity
              style={styles.okayButton}
              onPress={handleOnPressOkay}>
              <Text style={styles.okayButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const handleOnChangeTime = (value: {value: string}) => {
    let splitDuration = payload.duration.split(' ')[0];
    let time = addDurationToTime(value.value, Number(splitDuration));
    setStartTime(time.originalTime);
    setEndTime(time.updatedTime);
  };

  const handleBooking = async () => {
    try {
      let body = {
        date: payload.date,
        expertId: payload.expertId,
        serviceId: payload.serviceId,
        parentId: payload.parentId,
        name: payload.name,
        mail: payload.mail,
        phone: payload.phone,
        serviceStartTime: startTime,
        serviceEndTime: endTime,
      };
      let response = await dispatchTimeLine(customerBooking(body)).unwrap();
      if (response) {
        setSuccessModal(true);
      }
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error);
    }
  };

  const getBookedSlots = async () => {
    try {
      const {date, expertId} = payload;
      await dispatchTimeLine(getBookingByExpertId({date, expertId})).unwrap();
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error);
    }
  };

  const itemsData = BookingSlots.map(event => {
    return {
      id: event.id,
      title: event.serviceName,
      startDate: moment(event.date)
        .set({
          hour: event.serviceStartTime.split(':')[0],
          minute: event.serviceStartTime.split(':')[1],
        })
        .toDate(), // Convert start time to Date
      endDate: moment(event.date)
        .set({
          hour: event.serviceEndTime.split(':')[0],
          minute: event.serviceEndTime.split(':')[1],
        })
        .toDate(), // Convert end time to Date
      startTime: event.serviceStartTime,
      endTime: event.serviceEndTime,
    };
  });

  const clearErrorMsg = () => {
    dispatchTimeLine(clearGetBookingByExpertIdErrorMsg());
    dispatchTimeLine(clearUserBookingErrorMessage());
    setErrorMessage('');
    setErrorStatus(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {successModal && <SuccessFullModal />}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={getBookinStatus}
            onRefresh={getBookedSlots}
          />
        }>
        <UI.Header
          onPress={() => navigation.goBack()}
          headerName={'Confirm Booking'}
          showHeaderName={true}
        />
        <View
          style={[
            styles.formContainer,
            {
              height: rMS(150, height >= 800 && width > 600 ? 0.6 : 2.8),
            },
          ]}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Service:</Text>
            <View style={styles.inputContainer}>
              <UI.Input
                disableInput={true}
                textInputConfig={{
                  placeholder: 'Selected Service',
                  value: payload?.serviceName,
                }}
                stylesInput={styles.inputStyle}></UI.Input>
            </View>
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Time:</Text>
            <View style={styles.inputContainer}>
              <UI.DropDown
                data={timeSlot.map(value => {
                  return {
                    label: value.label,
                    value: value.value,
                  };
                })}
                onChange={(value: any) => handleOnChangeTime(value)}
                placeholder={'Select Time'}
                value={startTime}
                styles={styles.dropdownStyle}
              />
            </View>
          </View>
          <UI.Btn
            styles={styles.bookButton}
            disabledBtn={isLoader}
            onPressBtn={handleBooking}>
            Book
          </UI.Btn>
        </View>
        <View style={styles.scheduledContainer}>
          <Text style={styles.scheduledText}>
            {`Scheduled Booking: ${DateFormateMMMMDDYYY(payload?.date)}`}
          </Text>
        </View>
        {/* <View style={styles.slotContainer} /> */}
        {/* <SCREEN.BookItem startTime={9} endTime={18} bookings={BookingSlots} /> */}
        {/* <Timetable /> */}
        <Timetable
          style={{
            container: {
              marginBottom: rMS(15),
              backgroundColor: colors.primary,
            },
            lines: {
              borderWidth: rMS(0.2),
              borderColor: colors.borderColor,
            },
            timeContainer: {
              // paddingVertical: 0,
              // paddingHorizontal: 0,
              backgroundColor: colors.themePrimary,
              borderRadius: 5,
              paddingVertical: 5,
              marginLeft: 3,
              marginTop: 8,
            },
            time: {
              fontSize: rMS(12),
              fontWeight: '700',
              color: '#fff',
            },
            contentContainer: {
              // paddingHorizontal: 10,
              // paddingLeft:8
              // margin: 0,
              // flex: 1,
            },
          }}
          // columnHorizontalPadding={10}
          timeWidth={rMS(75)}
          hourHeight={rMS(150)}
          hideNowLine={true}
          fromHour={9}
          toHour={18}
          // itemMinHeightInMinutes={0}
          linesTopOffset={rMS(30)}
          // columnWidth={400}
          // linesLeftInset={50}
          // linesLeftInset={40}
          // stickyHours={true}
          items={itemsData}
          renderItem={props => <YourComponent {...props} />}
          // date={BookTime}
          date={payload.date}
          // range={range}
        />
        <View style={styles.bottomSpacing} />
      </ScrollView>
      <UI.Toast
        visible={errorStatus}
        message={errorMessage}
        onDismissSnackBar={() => clearErrorMsg()}
      />
    </SafeAreaView>
  );
}

export default TimeLine;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    maxWidth: 650,
    alignSelf: 'center',
  },
  form: {
    padding: 20,
  },
  inputRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: rMS(14),
    fontWeight: '600',
    color: colors.fontDark,
    width: '20%',
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  inputStyle: {
    marginBottom: 0,
    marginHorizontal: 0,
    paddingVertical: 0,
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
  bookButton: {
    marginHorizontal: 20,
    marginBottom: 0,
    paddingVertical: rMS(8),
  },
  scheduledContainer: {
    paddingLeft: rMS(12),
    marginBottom: rMS(4),
    elevation: 1,
    backgroundColor: '#ffffff',
    paddingVertical: rMS(8),
  },
  scheduledText: {
    fontSize: rMS(15),
    fontWeight: '600',
    color: colors.fontDark,
  },
  slotContainer: {
    marginTop: rMS(20),
  },
  bottomSpacing: {
    marginBottom: rMS(30),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 12,
    paddingHorizontal: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: rMS(18),
    fontWeight: '600',
    color: colors.fontDark,
    textAlign: 'center',
  },
  modalRow: {
    flexDirection: 'row',
    marginTop: rMS(8),
  },
  modalLabel: {
    fontSize: rMS(15),
    fontWeight: '700',
    color: colors.fontDark,
    marginRight: rV(8),
  },
  modalValue: {
    fontSize: rMS(15),
    fontWeight: '400',
    color: colors.fontDark,
  },
  okayButton: {
    paddingHorizontal: rMS(30),
    paddingVertical: rMS(8),
    backgroundColor: colors.themePrimary,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 18,
    marginBottom: 8,
  },
  okayButtonText: {
    fontSize: rMS(14),
    fontWeight: '700',
    color: colors.primary,
  },
});
