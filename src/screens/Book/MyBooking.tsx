import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {SCREEN, UI} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {deleteBoooking, getMyBookings} from '../../redux/Action/bookingAction';
import {
  DateFormateMMMMDDYYY,
  getCurrentDateZone,
  getDateInNewYorkTimeZone,
  getDateInNewYorkTimeZoneMoment,
} from '../../config/helper';
import CancelBookingModal from '../../components/UI/CancelBookingModal';
type BookingItem = {
  _id: string;
  date: any;
  service: string;
  serviceStartTime: string;
  serviceEndTime: string;
  expertName: string;
  isDeleted: boolean;
};

function MyBooking() {
  const {data, isLoader} = useAppSelector(state => state.booking.getMyBooking);
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const [errorStatus, setErrorStatus] = React.useState<boolean>(false);
  const dispatchMybooking = useAppDispatch();

  const [cancelBookingModalStatus, setCancelBookingModalStatus] =
    React.useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = React.useState<any>();
  const {isLoader: deleteBookingLoader} = useAppSelector(
    state => state.booking.deleteBooking,
  );

  const fetchMybookings = async () => {
    try {
      await dispatchMybooking(getMyBookings()).unwrap();
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error?.toString());
    }
  };

  React.useEffect(() => {
    fetchMybookings();
  }, []);

  const handleShowCancelBookingModal = (value: any) => {
    setCancelBookingModalStatus(true);
    setBookingDetails(value);
  };

  const renderItem = ({item}: {item: BookingItem}) => {
    const apiDate = new Date(item?.date); // API date in UTC
    // const currentDate = getCurrentDateZone(); // Current date in your local time zone
    const currentDate = getDateInNewYorkTimeZoneMoment(); // Current date in your local time zone
    const isApiDateGreater = apiDate.getTime() > currentDate.getTime();
    const isCancelBooking = item?.isDeleted;

    return (
      <SCREEN.BookedItem
        cancelPressed={() => handleShowCancelBookingModal(item)}
        date={DateFormateMMMMDDYYY(item?.date)}
        service={item?.service}
        startTime={item?.serviceStartTime}
        endTime={item?.serviceEndTime}
        expertName={item?.expertName}
        status={isApiDateGreater}
        isCancelBooking={isCancelBooking}
      />
    );
  };

  const handleCancelBookingModal = () => {
    setCancelBookingModalStatus(false);
    setBookingDetails({});
  };

  const handleOkayBookingModal = async (id: string) => {
    try {
      await dispatchMybooking(deleteBoooking({id: id})).unwrap();
      setCancelBookingModalStatus(false);
      fetchMybookings();
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error?.toString());
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.subContainer}>
        {cancelBookingModalStatus && (
          <CancelBookingModal
            btnStatus={deleteBookingLoader}
            bookingId={bookingDetails?._id}
            customerName={bookingDetails?.name}
            date={bookingDetails.date.split('T')[0]}
            handleCancelPressed={() => handleCancelBookingModal()}
            handleOkayPressed={(id: string) => handleOkayBookingModal(id)}
            time={`${bookingDetails?.serviceStartTime} - ${bookingDetails?.serviceEndTime}`}
          />
        )}
        <FlatList
          onRefresh={fetchMybookings}
          refreshing={isLoader}
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
        {!isLoader && data.length <= 0 && (
          <View style={styles.noBookingContainer}>
            <Text style={styles.textColor}>No Bookings</Text>
          </View>
        )}
      </View>
      <UI.Toast
        visible={errorStatus}
        message={errorMessage}
        onDismissSnackBar={() => {
          setErrorStatus(false), setErrorMessage('');
        }}
      />
    </SafeAreaView>
  );
}

export default MyBooking;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  subContainer: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  noBookingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    bottom: 0,
    left: 0,
    right: 0,
  },
  textColor: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
});
