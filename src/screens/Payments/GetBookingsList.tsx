import React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import useDeviceType from '../../hooks/useDeviceType';
import {rMS} from '../../config/responsive';
import {
  DateToYYYYMMDD,
  getDateInNewYorkTimeZoneMoment,
} from '../../config/helper';
import Icon from 'react-native-vector-icons/AntDesign';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchBookingPayment} from '../../redux/Action/paymentAction';
import {clearGetBookingPaymentData} from '../../redux/Reducer/paymentReducer/getBookingPaymentSlice';
import {toogleSelection} from '../../redux/Reducer/paymentReducer/storePaymetItemSlice';

type GetBoookingsListType = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'Payment'>,
  StackScreenProps<RootStackParamList>
>;

export interface subItemObj {
  _id: string;
  duration: string;
  name: string;
  price: any;
  category: string;
}

export interface expertObj {
  _id: string;
  name: string;
}

export interface GetBookingsListData {
  _id: string;
  date: any;
  deleteBy: boolean | null;
  expert: expertObj;
  isDeleted: boolean;
  mail: string;
  customerName: string;
  parentId: string;
  phone: string;
  serviceEndTime: string;
  serviceStartTime: string;
  subServiceDetails: subItemObj;
  customerId: string | null;
}

function GetBookingsList({navigation}: GetBoookingsListType) {
  const [showDate, setShowDate] = React.useState(false);
  const initialSelectedDate = getDateInNewYorkTimeZoneMoment();
  const [selectedDate, setSelectedDate] =
    React.useState<any>(initialSelectedDate);
  const isTablet = useDeviceType().isTablet;
  const dispatchGetBookingsList = useAppDispatch();
  const {
    data: bookingDetails,
    errorMsg,
    isError,
    isLoader,
  } = useAppSelector(state => state.payment.getBookingPayment);
  const {data} = useAppSelector(state => state.payment.storePayment);
  const isAnySelectedItem = data.length > 0;

  const handleNavigation = () => {
    navigation.navigate('PaymentMethod');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={!isAnySelectedItem}
          onPress={handleNavigation}
          style={[styles.headerBtnContainer, isTablet && {width: '20%'}]}>
          {isAnySelectedItem && (
            <Text style={[styles.headerFontText, isTablet && {fontSize: 20}]}>
              {'Next >>'}
            </Text>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, isAnySelectedItem]);

  const getBookingList = () => {
    dispatchGetBookingsList(
      fetchBookingPayment({date: DateToYYYYMMDD(selectedDate)}),
    );
  };

  React.useEffect(() => {
    onRefresh();
  }, [navigation]);

  React.useEffect(() => {
    getBookingList();
  }, [selectedDate]);

  const toggleSelection = (item: any) => {
    dispatchGetBookingsList(toogleSelection(item));
  };

  const renderItem = ({item}: {item: GetBookingsListData}) => {
    const isChecked = data.some(selected => selected._id === item._id);

    return (
      <UI.TableR onPress={() => toggleSelection(item)}>
        <UI.TableI showCheck={true} tickedStatus={isChecked} />
        <UI.TableI name={DateToYYYYMMDD(item?.date)} />
        <UI.TableI name={item?.customerName} />
        <UI.TableI
          name={`$${parseFloat(item?.subServiceDetails?.price).toFixed(2)}`}
        />
        <UI.TableI name={`${item?.expert?.name}`} />
        <UI.TableI name={`${item?.subServiceDetails?.name}`} />
        <UI.TableI name={item?.serviceStartTime} />
        <UI.TableI name={item?.serviceEndTime} />
      </UI.TableR>
    );
  };

  const handleDateChange = (value: any) => {
    setSelectedDate(value);
    setShowDate(false);
  };

  const onRefresh = () => {
    getBookingList();
  };

  return (
    <SafeAreaView style={styles.root}>
      {showDate && (
        <UI.DatePick
          dateValue={selectedDate}
          handleCancelPressed={() => setShowDate(false)}
          handleOkayPressed={(value: Date) => handleDateChange(value)}
        />
      )}
      <View style={styles.fullScreen}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.fullScreen}
          refreshControl={
            <RefreshControl refreshing={isLoader} onRefresh={onRefresh} />
          }>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Date:</Text>
            <UI.Input
              showIcon={true}
              disableInput={true}
              textInputConfig={{
                placeholder: 'Select Date',
                value: DateToYYYYMMDD(selectedDate),
              }}
              iconPressed={() => setShowDate(true)}
              stylesInput={styles.selectDateInput}>
              <Icon
                name="calendar"
                size={isTablet ? rMS(23) : rMS(21)}
                color="black"
              />
            </UI.Input>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={new Array(1)}
            renderItem={() => (
              <View style={styles.fullScreen}>
                <UI.TableH
                  headers={[
                    'Select',
                    'Booking Date',
                    'Customer Name',
                    'Price',
                    'Expert Name',
                    'Service Name',
                    'Service Start',
                    'Service End',
                  ]}
                />
                <FlatList
                  data={bookingDetails}
                  renderItem={renderItem}
                  keyExtractor={(_, index) => index.toString()}
                />
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </ScrollView>
      </View>
      <UI.Toast
        message={errorMsg}
        onDismissSnackBar={() =>
          dispatchGetBookingsList(clearGetBookingPaymentData())
        }
        visible={isError}
      />
    </SafeAreaView>
  );
}

export default GetBookingsList;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fullScreen: {
    flex: 1,
  },
  headerBtnContainer: {
    backgroundColor: colors.primary,
    height: '80%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerFontText: {
    fontSize: 19,
    fontWeight: '500',
    color: colors.themePrimary,
  },
  dateContainer: {
    height: rMS(100),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: rMS(14),
    fontWeight: '500',
    color: colors.fontDark,
    width: '30%',
    textAlign: 'center',
  },
  selectDateInput: {
    marginBottom: 0,
    marginHorizontal: 0,
    paddingVertical: 0,
    width: '60%',
  },
});
