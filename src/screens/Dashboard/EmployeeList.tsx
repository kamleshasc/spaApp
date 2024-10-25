import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {SCREEN, UI} from '../../components';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {rMS} from '../../config/responsive';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchServiceByCategory} from '../../redux/Action/serviceAction';
import {clearGetServiceByCategoryErrorMsg} from '../../redux/Reducer/serviceReducer/getServiceByCategorySlice';
import {getCurrentDateZoneToString} from '../../config/helper';

type EmployeeListProps = CompositeScreenProps<
  StackScreenProps<RootStackParamList, 'EmployeeList'>,
  DrawerScreenProps<DrawerNavigationParamList>
>;

interface EmployeItem {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  categories: string;
  userImage: string;
}

function EmployeeList({navigation, route}: EmployeeListProps) {
  const {serviceName} = route.params;
  const {data, errorMsg, isError, isLoader} = useAppSelector(
    state => state.service.getServiceByCategory,
  );
  const dispatchEmployeeList = useAppDispatch();
  const [errorStatus, setErrorStatus] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');

  React.useEffect(() => {
    if (isError && !errorStatus) {
      setErrorStatus(true);
      setErrorMessage(errorMsg);
    }
  }, [isLoader]);

  const fetchServiceDetails = async () => {
    try {
      await dispatchEmployeeList(
        fetchServiceByCategory({name: serviceName}),
      ).unwrap();
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error);
    }
  };

  React.useEffect(() => {
    fetchServiceDetails();
  }, []);

  const handleItemPress = (id: string) => {
    let c_date = getCurrentDateZoneToString();
    navigation.navigate('BookingUser', {expertId: id, selectedDate: c_date});
  };

  const renderItem = ({item}: {item: EmployeItem}) => {
    return (
      <SCREEN.CategoryItem
        name={item?.firstName}
        onPress={() => {
          handleItemPress(item._id);
        }}
        userImage={item?.userImage}
      />
    );
  };

  const handleClearMessage = () => {
    setErrorStatus(false);
    setErrorMessage('');
    dispatchEmployeeList(clearGetServiceByCategoryErrorMsg());
  };

  const onRefresh = () => {
    fetchServiceDetails();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.root}>
        <UI.Header
          onPress={() => navigation.goBack()}
          headerName={`${serviceName} Employee List`}
          showHeaderName={true}
        />
        {!isLoader && data.length <= 0 ? (
          <View style={styles.loadingContainer}>
            <Text
              style={
                styles.loadingText
              }>{`No Employess for ${serviceName}!`}</Text>
          </View>
        ) : (
          <FlatList
            onRefresh={onRefresh}
            refreshing={isLoader}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={styles.itemSep} />}
            contentContainerStyle={styles.contentContainer}
            columnWrapperStyle={styles.columnWrapper}
            data={data}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        )}
        <UI.Toast
          visible={errorStatus}
          message={errorMessage}
          onDismissSnackBar={() => {
            handleClearMessage();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default EmployeeList;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: rMS(18),
    fontWeight: '600',
    color: colors.fontDark,
  },
  itemSep: {
    marginVertical: rMS(5),
  },
  contentContainer: {
    paddingHorizontal: rMS(10),
    paddingVertical: rMS(10),
  },
  columnWrapper: {
    columnGap: rMS(8),
  },
});
