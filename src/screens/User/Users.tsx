import React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {fetchGetUser} from '../../redux/Action/userAction';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import {DateFormateMMMMDDYYY} from '../../config/helper';
import {UI} from '../../components';

export interface UserData {
  _id: string;
  userImage: string;
  firstName: string;
  lastName: string;
  title: string;
  mobileNumber: string;
  email: string;
  dateOfjoining: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  status: string;
}

type Props = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'Users'>,
  StackScreenProps<RootStackParamList>
>;

function Users({navigation}: Props) {
  const dispatch = useAppDispatch();
  const {data, isLoader, isError, errorMsg} = useAppSelector(
    state => state.user.getUser,
  );
  const [showError, setShowError] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddUser')}
          style={style.headerIconContainer}>
          <Icon name="adduser" size={30} color={colors.themePrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getUserList = () => {
    dispatch(fetchGetUser());
  };

  React.useEffect(() => {
    getUserList();
  }, []);

  React.useEffect(() => {
    if (isError && !showError) {
      setShowError(isError);
    }
  }, [isLoader]);

  const onPressUser = (value: UserData) => {
    navigation.navigate('EditUser', {user: value});
  };

  function renderItem({item}: {item: UserData}) {
    return (
      <UI.TableR
        onPress={() => {
          onPressUser(item);
        }}>
        <UI.TableI ImgUrl={item.userImage} />
        <UI.TableI name={item.firstName} />
        <UI.TableI name={item.lastName} />
        <UI.TableI name={item.title} />
        {/* <UI.TableI name={formatMobileNumber(item.mobileNumber)} /> */}
        <UI.TableI name={item.mobileNumber} />
        <UI.TableI name={item.email} />
        <UI.TableI name={item.dateOfjoining} />
        <UI.TableI name={DateFormateMMMMDDYYY(item.createdAt)} />
        <UI.TableI name={DateFormateMMMMDDYYY(item.updatedAt)} />
        <UI.TableI name={item.role} />
        <UI.TableI name={item.status} />
      </UI.TableR>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        style={style.fullScreen}
        horizontal={true}
        refreshControl={
          <RefreshControl refreshing={isLoader} onRefresh={getUserList} />
        }>
        <View style={style.fullScreen}>
          <UI.TableH
            headers={[
              'User Image',
              'First Name',
              'Last Name',
              'Title',
              'Mobile Number',
              'Email',
              'Date Of Joining',
              'Created Date',
              'Modified Date',
              'Role',
              'Status',
            ]}
          />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </ScrollView>
      <UI.Toast
        visible={showError}
        message={errorMsg}
        onDismissSnackBar={() => setShowError(false)}
      />
    </SafeAreaView>
  );
}

export default Users;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fullScreen: {
    flex: 1,
  },
  headerIconContainer: {
    height: 40,
    width: 40,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
