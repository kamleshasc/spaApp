import React from 'react';
import {
  Alert,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {
  PERMISSIONS,
  RESULTS,
  checkMultiple,
  openSettings,
  requestMultiple,
} from 'react-native-permissions';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {rMS} from '../../config/responsive';
import {SCREEN, UI} from '../../components';
import {fetchGetUser} from '../../redux/Action/userAction';
import {getMyBookings} from '../../redux/Action/bookingAction';
import {clearUserData} from '../../redux/Reducer/userReducer/getUserSlice';
import {clearMyBookingErrorMessage} from '../../redux/Reducer/bookingReducer/getMyBookingSlice';
import {
  DateToYYYYMMDD,
  getCurrentDateZone,
  getCurrentDateZoneToString,
  getDateInNewYorkTimeZoneMoment,
} from '../../config/helper';
import {fetchExpertService} from '../../redux/Action/serviceAction';
import {clearGetAllExpertErrorMsg} from '../../redux/Reducer/serviceReducer/getAllExpertSlice';
type DashboardProps = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'Dashboard'>,
  StackScreenProps<RootStackParamList>
>;

function Dashboard({navigation}: DashboardProps): React.JSX.Element {
  const {userDetails} = useAppSelector(state => state.user.userDetails);
  const {
    data: userData,
    isError: userIsError,
    isLoader: userIsLoader,
  } = useAppSelector(state => state.service.getExperts);
  const {
    data: bookingData,
    isError: bookingIsError,
    isLoader: bookingIsLoader,
  } = useAppSelector(state => state.booking.getMyBooking);
  const dispatchDashboard = useAppDispatch();
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const [errorStatus, setErrorStatus] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState<boolean>(false);
  const currentDate = getDateInNewYorkTimeZoneMoment();
  

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={style.nameContainer}>
          <Text style={style.nameText}>
            {`Hello, ${userDetails?.firstName}`}
          </Text>
        </View>
      ),
    });
  }, [navigation, userDetails]);

  const handlePermissions = async (permissions: any) => {
    requestMultiple(permissions)
      .then(res => {
        const isPermissionDenied = Object.values(res).some(
          value => value === RESULTS.BLOCKED,
        );
        if (isPermissionDenied) {
          Alert.alert(
            'Permissions Required',
            'The app needs camera and media permissions to function properly. Please allow them in app settings.',
            [
              {
                text: 'Open Settings',
                onPress: () => {
                  openSettings().catch(() => {
                    Alert.alert('Error', 'Error opening settings.');
                  });
                },
              },
            ],
          );
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Error requesting permissions.');
      });
  };

  const checkAndRequestPermissions = () => {
    const permissions: any = Platform.select({
      ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY,PERMISSIONS.IOS.MEDIA_LIBRARY],
      android: [
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      ],
    });

    // const permissions = [PERMISSIONS.IOS.CAMERA,PERMISSIONS.IOS.PHOTO_LIBRARY,PERMISSIONS.IOS.MEDIA_LIBRARY];

    checkMultiple(permissions)
      .then(() => {
        handlePermissions(permissions);
      })
      .catch(() => {
        Alert.alert('Error', 'Error requesting permissions.');
      });
  };

  const fetchApis = async () => {
    try {
      setLoader(true);
      await dispatchDashboard(fetchExpertService()).unwrap();
      await dispatchDashboard(getMyBookings()).unwrap();
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error);
    } finally {
      setLoader(false);
    }
  };

  React.useEffect(() => {
    // checkPermissions();
    checkAndRequestPermissions();
  }, []);

  React.useEffect(() => {
    fetchApis();
  }, []);

  React.useEffect(() => {
    if (!errorStatus && (userIsError || bookingIsError)) {
      setErrorStatus(true);
    }
  }, [userIsLoader, bookingIsLoader]);

  const handleOnServicePress = (value: string) => {
    navigation.navigate('EmployeeList', {serviceName: value});
  };

  const clearErrorMesseage = () => {
    setErrorMessage('');
    setErrorStatus(false);
    dispatchDashboard(clearGetAllExpertErrorMsg());
    dispatchDashboard(clearMyBookingErrorMessage());
  };

  const handleEmployeePress = (id: string) => {
    let c_date = getCurrentDateZoneToString();
    navigation.navigate('BookingUser', {expertId: id, selectedDate: c_date});
  };

  const handleBookingPressed = () => {
    navigation.navigate('MyBooking');
  };

  const onRefresh = () => {
    dispatchDashboard(clearMyBookingErrorMessage());
    dispatchDashboard(clearGetAllExpertErrorMsg());
    fetchApis();
  };

  const upcomingBookingData = bookingData.filter(item => {
    const apiDate = new Date(item?.date);
    return (
      apiDate.getFullYear() > currentDate.getFullYear() ||
      (apiDate.getFullYear() === currentDate.getFullYear() &&
        apiDate.getMonth() > currentDate.getMonth()) ||
      (apiDate.getFullYear() === currentDate.getFullYear() &&
        apiDate.getMonth() === currentDate.getMonth() &&
        apiDate.getDate() >= currentDate.getDate())
    );
  });

  return (
    <View style={style.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loader} onRefresh={onRefresh} />
        }>
        <View style={style.imageContainer}>
          <Image
            style={style.image}
            source={require('../../assets/images/welcome.jpg')}
          />
        </View>

        <View style={style.serviceHeaderContainer}>
          <Text style={style.serviceHeaderText}>Services</Text>
        </View>
        <View style={style.serviceItemContainer}>
          <TouchableOpacity
            style={style.serviceSubItemContainer}
            onPress={() => handleOnServicePress('Facials')}>
            <View style={style.serviceItemImgContainer}>
              <Image
                tintColor={colors.themePrimary}
                style={style.serviceImgContainer}
                source={require('../../assets/images/facial.png')}
              />
            </View>
            <Text style={style.serviceItemFont}>Facials</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.serviceSubItemContainer}
            onPress={() => handleOnServicePress('Massages')}>
            <View style={style.serviceItemImgContainer}>
              <Image
                tintColor={colors.themePrimary}
                style={style.serviceImgContainer}
                source={require('../../assets/images/massage.png')}
              />
            </View>
            <Text style={style.serviceItemFont}>Massages</Text>
          </TouchableOpacity>
        </View>
        <View style={style.serviceItemContainer}>
          <TouchableOpacity
            style={style.serviceSubItemContainer}
            onPress={() => handleOnServicePress('Therapies')}>
            <View style={style.serviceItemImgContainer}>
              <Image
                tintColor={colors.themePrimary}
                style={style.serviceImgContainer}
                source={require('../../assets/images/therapist.png')}
              />
            </View>
            <Text style={style.serviceItemFont}>Therapies</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.serviceSubItemContainer}
            onPress={() => handleOnServicePress('Special Occasions')}>
            <View style={style.serviceItemImgContainer}>
              <Image
                tintColor={colors.themePrimary}
                style={style.serviceImgContainer}
                source={require('../../assets/images/bodySculpting.png')}
              />
            </View>
            <Text style={style.serviceItemFont}>Special Occasions</Text>
          </TouchableOpacity>
        </View>

        <View style={style.employeeHeaderContainer}>
          <Text style={style.employeeHeaderFont}>Employee</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Book')}>
            <Text style={style.employeeViewMore}>{`View More >`}</Text>
          </TouchableOpacity>
        </View>

        <View style={style.employeeListContainer}>
          {!bookingIsLoader && userData.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {userData.map((item, index) => {
                return (
                  <SCREEN.ExpertsList
                    imgUrl={item?.userImage}
                    name={item?.firstName}
                    onPress={() => handleEmployeePress(item?._id)}
                    key={index}
                  />
                );
              })}
            </ScrollView>
          ) : (
            <View style={style.loadingContainer}>
              <Text style={style.loadingText}>
                {loader ? 'Loading...' : 'No employee.'}
              </Text>
            </View>
          )}
        </View>

        <View style={style.bookingHeaderContainer}>
          <Text style={style.bookingHeaderText}>My Bookings</Text>
          <TouchableOpacity onPress={handleBookingPressed}>
            <Text style={style.bookingViewMore}>{`View More >`}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.bookingListContainer}>
          {upcomingBookingData.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {upcomingBookingData.map((item: any, index: any) => {
                return (
                  <SCREEN.DashboardBookingItem
                    onPress={handleBookingPressed}
                    date={DateToYYYYMMDD(item?.date)}
                    endTime={item?.serviceEndTime}
                    service={item?.serviceName}
                    startTime={item?.serviceStartTime}
                    key={index}
                  />
                );
              })}
            </ScrollView>
          ) : (
            <View style={style.loadingContainer}>
              <Text style={style.loadingText}>
                {loader ? 'Loading...' : 'No bookings.'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <UI.Toast
        message={errorMessage}
        visible={errorStatus}
        onDismissSnackBar={() => clearErrorMesseage()}
      />
    </View>
  );
}

export default Dashboard;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  nameContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.themePrimary,
  },
  nameText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.themePrimary,
  },
  serviceHeaderContainer: {
    flexDirection: 'row',
    marginHorizontal: rMS(22),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: rMS(12),
  },
  serviceHeaderText: {
    fontSize: rMS(18),
    fontWeight: '700',
    color: colors.fontDark,
  },
  serviceItemContainer: {
    flexDirection: 'row',
    height: rMS(100),
    marginHorizontal: rMS(10),
    backgroundColor: colors.primary,
  },
  serviceSubItemContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    borderColor: colors.themePrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rMS(8),
    margin: rMS(10),
    ...Platform.select({
      android: {
        elevation: rMS(3),
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: rMS(2)},
        shadowRadius: rMS(4),
        shadowOpacity: 0.15,
      },
    }),
  },
  serviceItemImgContainer: {
    height: rMS(50),
    width: rMS(50),
    alignSelf: 'center',
  },
  serviceImgContainer: {
    height: '100%',
    width: '100%',
  },
  serviceItemFont: {
    fontSize: rMS(12),
    fontWeight: '700',
    color: colors.themePrimary,
    marginTop: rMS(5),
    textAlign: 'center',
  },
  employeeHeaderContainer: {
    flexDirection: 'row',
    marginHorizontal: rMS(22),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: rMS(12),
  },
  employeeHeaderFont: {
    fontSize: rMS(18),
    fontWeight: '700',
    color: colors.fontDark,
  },
  employeeViewMore: {
    fontSize: rMS(14),
    fontWeight: '500',
    color: colors.borderColor,
  },
  employeeListContainer: {
    flexDirection: 'row',
    marginVertical: rMS(12),
  },
  bookingHeaderContainer: {
    flexDirection: 'row',
    marginHorizontal: rMS(22),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: rMS(12),
  },
  bookingHeaderText: {
    fontSize: rMS(18),
    fontWeight: '700',
    color: colors.fontDark,
  },
  bookingViewMore: {
    fontSize: rMS(14),
    fontWeight: '500',
    color: colors.borderColor,
  },
  bookingListContainer: {
    flexDirection: 'row',
    marginVertical: rMS(12),
  },
  imageContainer: {
    height: rMS(200),
  },
  image: {
    height: '100%',
    width: '100%',
  },
  loadingContainer: {
    height: rMS(110),
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: rMS(12),
    fontWeight: '600',
    color: colors.fontDarkGrey,
  },
});
