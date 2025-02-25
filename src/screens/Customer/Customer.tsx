import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import React from 'react';
import {fetchGetCustomer} from '../../redux/Action/customerAction';
import {DateFormateMMMMDDYYY} from '../../config/helper';
import {clearCustomerErrorMsg} from '../../redux/Reducer/customerReducer/getCustomerSlice';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/AntDesign';

export interface CustomerData {
  _id: string;
  userImage: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  dateOfjoining: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

type CustomerProp = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'Customers'>,
  StackScreenProps<RootStackParamList>
>;

function Customer({navigation}: CustomerProp) {
  const dispatchCustomer = useAppDispatch();
  const {data, errorMsg, isError, isLoader} = useAppSelector(
    state => state.customer.getCustomer,
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddCustomer')}
          style={style.iconContainer}>
          <Icon name="adduser" size={30} color={colors.themePrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getCustomerDetails = async () => {
    try {
      await dispatchCustomer(fetchGetCustomer()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getCustomerDetails();
  }, []);

  const renderItem = ({item}: {item: CustomerData}) => {
    return (
      <UI.TableR
        onPress={() => navigation.navigate('EditCustomer', {customer: item})}>
        <UI.TableI showImg={true} ImgUrl={item?.userImage} />
        <UI.TableI name={`${item?.firstName}`} />
        <UI.TableI name={`${item?.lastName}`} />
        <UI.TableI name={item?.email} />
        <UI.TableI name={item?.mobileNumber} />
        <UI.TableI name={DateFormateMMMMDDYYY(item?.createdAt)} />
        <UI.TableI name={DateFormateMMMMDDYYY(item?.updatedAt)} />
      </UI.TableR>
    );
  };

  return (
    <View style={style.container}>
      <FlatList
        onRefresh={() => getCustomerDetails()}
        refreshing={isLoader}
        data={new Array(1)}
        horizontal={true}
        renderItem={() => (
          <View style={style.fullScreen}>
            <UI.TableH
              headers={[
                '',
                'First Name',
                'Last Name',
                'Email',
                'Phone',
                'Created Date',
                'Updated Date',
              ]}
            />
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <UI.Toast
        visible={isError}
        message={errorMsg}
        onDismissSnackBar={() => dispatchCustomer(clearCustomerErrorMsg())}
      />
    </View>
  );
}

export default Customer;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fullScreen: {
    flex: 1,
  },
  iconContainer: {
    height: 40,
    width: 40,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
