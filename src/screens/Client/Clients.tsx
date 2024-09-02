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
import {UI} from '../../components';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/AntDesign';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchClient} from '../../redux/Action/clientAction';
import {clearGetClientErrorMsg} from '../../redux/Reducer/clientReducer/getClientSlice';
import {DateFormateMMMMDDYYY} from '../../config/helper';

type ClientProps = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'Clients'>,
  StackScreenProps<RootStackParamList>
>;
interface OwnerObject {
  _id: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}

export interface ClientsData {
  _id: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  addressLineOne: string;
  addressLineTwo: string;
  country: string;
  state: string;
  city: string;
  prefix: string;
  owner: OwnerObject;
  createdAt: any;
  updatedAt: any;
}

function Clients({navigation}: ClientProps): React.JSX.Element {
  const dispatchClients = useAppDispatch();
  const {data, errorMsg, isError, isLoader} = useAppSelector(
    state => state.client.getClient,
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddClient')}
          style={style.iconContainer}>
          <Icon name="adduser" size={30} color={colors.themePrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getUserList = () => {
    dispatchClients(fetchClient());
  };

  React.useEffect(() => {
    getUserList();
  }, []);

  const renderItem = ({item}: {item: ClientsData}) => {
    return (
      <UI.TableR
        onPress={() => {
          navigation.navigate('EditClient', {client: item});
        }}>
        <UI.TableI showImg={true} ImgUrl={''} />
        <UI.TableI
          name={`${item?.prefix || ''} ${item?.firstName || ''} ${
            item?.lastName || ''
          }`}
        />
        <UI.TableI name={item?.email} />
        <UI.TableI name={item?.mobileNumber} />
        <UI.TableI name={item?.addressLineOne} />
        <UI.TableI name={item?.addressLineTwo} />
        <UI.TableI name={item?.country} />
        <UI.TableI name={item?.state} />
        <UI.TableI name={item?.city} />
        <UI.TableI
          name={`${item?.owner?.firstName || ''} ${
            item?.owner?.lastName || ''
          }`}
        />
        <UI.TableI name={DateFormateMMMMDDYYY(item?.createdAt)} />
        <UI.TableI name={DateFormateMMMMDDYYY(item?.updatedAt)} />
      </UI.TableR>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoader} onRefresh={getUserList} />
        }
        style={style.fullScreen}
        horizontal={true}>
        <View style={style.fullScreen}>
          <UI.TableH
            headers={[
              '',
              'Client Name',
              'Email',
              'Mobile',
              'Address Line 1',
              'Address Line 2',
              'Country',
              'State',
              'City',
              'Owner',
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
      </ScrollView>
      <UI.Toast
        visible={isError}
        message={errorMsg}
        onDismissSnackBar={() => dispatchClients(clearGetClientErrorMsg())}
      />
    </SafeAreaView>
  );
}

export default Clients;

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
