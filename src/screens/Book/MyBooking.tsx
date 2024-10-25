import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {SCREEN, UI} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {getMyBookings} from '../../redux/Action/bookingAction';
import {clearMyBookingErrorMessage} from '../../redux/Reducer/bookingReducer/getMyBookingSlice';
import {DateFormateMMMMDDYYY, getCurrentDateZone} from '../../config/helper';
type BookingItem = {
  date: any;
  service: string;
  serviceStartTime: string;
  serviceEndTime: string;
  expertName: string;
};

function MyBooking() {
  const {data, errorMsg, isError, isLoader} = useAppSelector(
    state => state.booking.getMyBooking,
  );
  const dispatchMybooking = useAppDispatch();

  const fetchMybookings = () => {
    dispatchMybooking(getMyBookings());
  };

  React.useEffect(() => {
    fetchMybookings();
  }, []);

  const renderItem = ({item}: {item: BookingItem}) => {
    const apiDate = new Date(item.date); // API date in UTC
    const currentDate = getCurrentDateZone(); // Current date in your local time zone
    const isApiDateGreater = apiDate.getTime() > currentDate.getTime();

    return (
      <SCREEN.BookedItem
        date={DateFormateMMMMDDYYY(item?.date)}
        service={item?.service}
        startTime={item?.serviceStartTime}
        endTime={item?.serviceEndTime}
        expertName={item?.expertName}
        status={isApiDateGreater}
      />
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.subContainer}>
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
        visible={isError}
        message={errorMsg}
        onDismissSnackBar={() =>
          dispatchMybooking(clearMyBookingErrorMessage())
        }
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
