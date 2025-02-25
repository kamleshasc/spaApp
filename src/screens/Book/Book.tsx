import React from 'react';
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {rMS, rV} from '../../config/responsive';
import {getCurrentDateZoneToString} from '../../config/helper';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import {SCREEN, UI} from '../../components';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchExpertService} from '../../redux/Action/serviceAction';
import useDeviceType from '../../hooks/useDeviceType';

type BookProps = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'Book'>,
  StackScreenProps<RootStackParamList>
>;

function Book({navigation}: BookProps) {
  const currentDateString = getCurrentDateZoneToString();
  const [selectedExpert, setSelectedExpert] = React.useState<any>(null);
  const [selectedDate, setSelectedDate] = React.useState(currentDateString);
  const [errorStatus, setErrorStatus] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const {isTablet} = useDeviceType();

  const dispatchBook = useAppDispatch();
  const {data, isError, errorMsg, isLoader} = useAppSelector(
    state => state.service.getExperts,
  );

  const getExperts = async () => {
    try {
      await dispatchBook(fetchExpertService()).unwrap();
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error);
    }
  };

  React.useEffect(() => {
    if (!errorStatus && isError) {
      setErrorStatus(isError);
      setErrorMessage(errorMsg);
    }
  }, [isLoader]);

  React.useEffect(() => {
    getExperts();
  }, []);

  const getDate = (count: number) => {
    const date = new Date(currentDateString);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const onDayPress = React.useCallback((day: any) => {
    setSelectedDate(day.dateString);
  }, []);

  const onPressNext = () => {
    navigation.navigate('BookingUser', {
      expertId: selectedExpert,
      selectedDate: selectedDate,
    });
  };

  const onRefresh = () => {
    setSelectedExpert(null);
    getExperts();
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoader} onRefresh={onRefresh} />
        }>
        <>
          <View
            style={[styles.flexScreen, {marginTop: rMS(5, isTablet ? 3 : 2)}]}>
            <Text style={styles.selectExpertText}>Select Employee</Text>
            <View style={styles.expertListContainer}>
              <ScrollView
                style={styles.scrollStyle}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {isLoader ? (
                  <View style={styles.expertEmptyContainer} />
                ) : (
                  data.map((value, index) => {
                    let activeExpert =
                      selectedExpert == value?._id ? true : false;
                    return (
                      <SCREEN.ExpertsList
                        imgUrl={value?.userImage}
                        name={value?.firstName}
                        onPress={() => setSelectedExpert(value?._id || null)}
                        selectedExpert={activeExpert}
                        key={index}
                      />
                    );
                  })
                )}
              </ScrollView>
            </View>
          </View>
          <View style={[styles.flexScreen, {marginTop: rMS(5, 2)}]}>
            <Text style={styles.selectDateText}>Select Date</Text>
            <Calendar
              enableSwipeMonths={false}
              current={currentDateString}
              onDayPress={onDayPress}
              // displayLoadingIndicator={true}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: colors.themePrimary,
                  selectedTextColor: colors.primary,
                },
              }}
              minDate={getDate(0)}
              maxDate={getDate(15)}
              hideExtraDays={true}
              theme={{
                arrowColor: colors.themePrimary,
                todayTextColor: colors.themePrimary,
                textDisabledColor: colors.fontDarkGrey,
                // textDayFontSize: rMS(13), // day font size
                // textMonthFontSize: rMS(15), // month font size
                // textDayHeaderFontSize: rMS(9), // day header (Mon, Tue, etc.)
                // textMonthFontWeight: '700',
                // textDayHeaderFontWeight: '700',
                // textDayFontWeight: '700',
                // textDayFontSize: isTablet ? rMS(10) : rMS(12), // month font size
                // textDayHeaderFontSize: isTablet ? -20 : rMS(12),
                textSectionTitleColor: colors.themePrimary,
                textDayHeaderFontWeight: '500',
                ...Platform.select({
                  ios: {
                    // textMonthFontSize: rMS(18), // month font size
                    // day header (Mon, Tue, etc.)
                    textDayFontWeight: '500',
                    textMonthFontWeight: '500',
                  },
                  android: {
                    // textMonthFontSize: rMS(16), // month font size
                    // textDayFontSize: rMS(12), // month font size
                    // textDayHeaderFontSize: rMS(13), // day header (Mon, Tue, etc.)
                    textDayFontWeight: '700',
                    textMonthFontWeight: '700',
                  },
                }),
              }}
            />
          </View>
          <View
            style={{
              // flex:1,
              // height: '100%',
              marginTop: rMS(20, isTablet ? 3 : 2),
              maxWidth: 600,
              minWidth: rMS(340),
              // flexDirection: 'row',
              marginVertical: rMS(20),
              alignSelf: 'center',
            }}>
            <UI.Btn
              styles={{marginBottom: 0, marginHorizontal: 0}}
              disabledBtn={selectedExpert == null ? true : false}
              onPressBtn={onPressNext}>
              Next
            </UI.Btn>
          </View>
        </>
      </ScrollView>
      <UI.Toast
        visible={errorStatus}
        message={errorMessage}
        onDismissSnackBar={() => setErrorStatus(false)}
      />
    </SafeAreaView>
  );
}

export default Book;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  flexScreen: {
    flex: 1,
  },
  selectExpertText: {
    fontSize: rMS(18),
    ...Platform.select({
      ios: {
        fontWeight: '600',
      },
      android: {
        fontWeight: '700',
      },
    }),
    color: colors.fontDark,
    marginTop: rV(12),
    marginLeft: rMS(12),
  },
  expertListContainer: {
    marginVertical: rMS(12),
    flexDirection: 'row',
  },
  scrollStyle: {
    paddingHorizontal: 5,
  },
  selectDateText: {
    fontSize: rMS(18),
    ...Platform.select({
      ios: {
        fontWeight: '600',
      },
      android: {
        fontWeight: '700',
      },
    }),
    // fontWeight: '700',
    color: colors.fontDark,
    marginTop: rV(12),
    marginLeft: rMS(12),
    marginBottom: rMS(8),
  },
  btnContainer: {
    // backgroundColor: 'red',
    // position: 'absolute',
    // width: '100%',
    // bottom: 0,
    // marginBottom: rMS(20),
    // justifyContent: 'flex-end',
    marginBottom: 0,
    marginTop: rMS(20),
  },
  expertEmptyContainer: {
    height: rMS(140),
    width: rMS(140),
    borderRadius: 20,
    marginVertical: 12,
    marginHorizontal: 12,
  },
});
