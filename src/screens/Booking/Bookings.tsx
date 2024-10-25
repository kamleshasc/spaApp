import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {SCREEN, UI} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {rMS} from '../../config/responsive';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import TakeBookingDetails from '../../components/screen/booking/TakeBookingDetails';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchSubService} from '../../redux/Action/serviceAction';
import {
  DateFormateMMMMDDYYY,
  DateToYYYYMMDD,
  getCurrentDateZone,
} from '../../config/helper';
import {fetchBookingDetails} from '../../redux/Action/bookingAction';

type BookingType = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'Bookings'>,
  StackScreenProps<RootStackParamList>
>;
interface dropDownValue {
  value: string;
  label: string;
}
const initialDropDownValue: dropDownValue = {
  value: '',
  label: '',
};
const initialSelectedDate = getCurrentDateZone();

function Bookings({navigation}: BookingType) {
  const {width, height} = useWindowDimensions();
  const [selectedDate, setSelectedDate] =
    React.useState<any>(initialSelectedDate);
  const [showDate, setShowDate] = React.useState(false);
  const [showBooking, setShowBooking] = React.useState(false);
  const [selectedService, setSelectedService] =
    React.useState<dropDownValue>(initialDropDownValue);
  const bookingDispatch = useAppDispatch();
  const {data: SubServiceData, isLoader} = useAppSelector(
    state => state.service.getSubService,
  );

  const {
    data,
    isLoader: getbookingStatus,
    isError,
    errorMsg,
  } = useAppSelector(state => state.booking.getBooking);
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const [errorStatus, setErrorStatus] = React.useState(false);
  const [selectedAllService, setSelectedAllService] = React.useState<any>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setShowBooking(true)}
          style={styles.headerIconContainer}>
          <Text style={styles.headerFont}>Book Now</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    getServiceType();
  }, []);

  React.useEffect(() => {
    if (selectedService.value.length > 0) {
      fetchBookings();
      setServiceDetails(selectedService.value);
    }
  }, [selectedService, selectedDate]);

  React.useEffect(() => {
    if (isError && !errorStatus) {
      setErrorStatus(isError);
      setErrorMessage(errorMsg?.toString());
    }
  }, [getbookingStatus]);

  const getServiceType = async () => {
    try {
      const result = await bookingDispatch(fetchSubService()).unwrap();
      if (result && result.length && selectedService.value.length <= 0) {
        let body = {
          label: result[0].name,
          value: result[0].id,
        };
        setSelectedService(body);
      }
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error?.toString());
    }
  };

  const setServiceDetails = (id: string) => {
    let filterValue = SubServiceData.find(value => value.id == id);
    setSelectedAllService(filterValue);
  };

  const handleOnChangeService = (value: dropDownValue) => {
    setSelectedService(value);
  };

  const handleDateChange = (value: any) => {
    setSelectedDate(value);
    setShowDate(false);
  };

  const fetchBookings = async () => {
    try {
      let date = DateToYYYYMMDD(selectedDate);
      await bookingDispatch(
        fetchBookingDetails({serviceId: selectedService.value, date}),
      ).unwrap();
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error?.toString());
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <SCREEN.BookingTimeList
        startTime={item?.serviceStartTime}
        endTime={item?.serviceEndTime}
        expertName={item?.expertName}
        firstValue={index == 0}
        lastValue={index + 1 == data.length}
      />
    );
  };

  if (isLoader) {
    return <UI.Loader />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.fullScreen}>
        {showDate && (
          <UI.DatePick
            options={{
              minimumDate: initialSelectedDate,
            }}
            dateValue={selectedDate}
            handleCancelPressed={() => setShowDate(false)}
            handleOkayPressed={(value: Date) => handleDateChange(value)}
          />
        )}
        <TakeBookingDetails
          selectedDate={selectedDate}
          selectedDetails={selectedAllService}
          okayPressed={() => {
            setShowBooking(false);
            fetchBookings();
          }}
          cancelPressed={() => setShowBooking(false)}
          visible={showBooking}
        />

        <FlatList
          refreshing={getbookingStatus}
          onRefresh={fetchBookings}
          ListHeaderComponent={
            <>
              <View
                style={[
                  styles.rootBookingContainer,
                  {
                    height: rMS(100, height >= 800 && width > 600 ? 0.7 : 3),
                  },
                ]}>
                <View style={styles.serviceConatiner}>
                  <Text style={styles.serviceText}>Service Type:</Text>
                  <View style={styles.fullScreen}>
                    <UI.DropDown
                      data={SubServiceData.map(value => {
                        return {
                          label: value.name,
                          value: value.id,
                        };
                      })}
                      onChange={(value: any) => handleOnChangeService(value)}
                      placeholder={'Select Service'}
                      value={selectedService.value}
                      styles={styles.serviceInput}
                    />
                  </View>
                </View>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>Date:</Text>
                  <View style={styles.fullScreen}>
                    <UI.Input
                      showIcon={true}
                      disableInput={true}
                      textInputConfig={{
                        placeholder: 'Select Date',
                        value: DateToYYYYMMDD(selectedDate),
                      }}
                      iconPressed={() => setShowDate(true)}
                      stylesInput={styles.dateInput}>
                      <Icon name="calendar" size={28} color="black" />
                    </UI.Input>
                  </View>
                </View>
              </View>
              <View style={styles.scheduleContainer}>
                <Text style={styles.scheduleText}>
                  {`Schedule: ${DateFormateMMMMDDYYY(selectedDate)}`}
                </Text>
              </View>
            </>
          }
          ListEmptyComponent={
            getbookingStatus ? (
              <></>
            ) : (
              <View style={styles.noBookingContainer}>
                <Text style={styles.noBookingText}>No Bookings</Text>
              </View>
            )
          }
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => String(index)}
        />
      </View>
      <UI.Toast
        visible={errorStatus}
        message={errorMessage}
        onDismissSnackBar={() => {
          setErrorStatus(false);
        }}
      />
    </SafeAreaView>
  );
}

export default Bookings;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fullScreen: {
    flex: 1,
  },
  headerIconContainer: {
    height: 40,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.themePrimary,
  },
  headerFont: {
    fontSize: rMS(12),
    fontWeight: '600',
    color: colors.themePrimary,
  },
  rootBookingContainer: {
    padding: 20,
    maxWidth: 600,
    alignSelf: 'center',
  },
  noBookingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBookingText: {
    fontSize: rMS(15),
    fontWeight: '400',
    color: colors.fontDark,
  },
  scheduleContainer: {
    marginVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
  },
  scheduleText: {
    fontSize: rMS(16),
    fontWeight: '500',
    color: colors.fontDark,
  },
  dateContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: rMS(14),
    fontWeight: '600',
    color: colors.fontDark,
    width: '32%',
    textAlign: 'center',
  },
  dateInput: {
    marginBottom: 0,
    marginHorizontal: 0,
    paddingVertical: 0,
  },
  serviceConatiner: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceText: {
    fontSize: rMS(14),
    fontWeight: '600',
    color: colors.fontDark,
    width: '32%',
  },
  serviceInput: {
    marginBottom: 0,
    marginHorizontal: 0,
    paddingVertical: rMS(3),
    paddingRight: 5,
  },
});
