import React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {ScrollView} from 'react-native';
import {UI} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {CompositeScreenProps} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchInventory} from '../../redux/Action/inventoryAction';
import {clearGetInventoryErrorMsg} from '../../redux/Reducer/inventoryReducer/getInventorySlice';

type InventoryProps = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'Inventory'>,
  StackScreenProps<RootStackParamList>
>;

export interface objectName {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface InventoryData {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
  brand: string;
  price: number;
  stock: number;
  createdBy: objectName;
  updatedBy: objectName;
}

function Inventory({navigation}: InventoryProps): React.JSX.Element {
  const dispatchInventory = useAppDispatch();
  const {data, errorMsg, isError, isLoader} = useAppSelector(
    state => state.inventory.getInventory,
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddInventory')}
          style={style.iconContainer}>
          <Icon name="add" size={30} color={colors.themePrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getInventory = () => {
    dispatchInventory(fetchInventory());
  };

  React.useEffect(() => {
    getInventory();
  }, []);

  function renderItem({item}: {item: InventoryData}) {
    return (
      <UI.TableR
        onPress={() => {
          navigation.navigate('EditInventory', {inventory: item});
        }}>
        <UI.TableI name={item.name} />
        <UI.TableI name={item.unit} />
        <UI.TableI name={item.brand} />
        <UI.TableI name={item.quantity.toFixed(2)} />
        <UI.TableI name={`$${item.price.toFixed(2)}`} />
        <UI.TableI name={item.stock} />
        <UI.TableI
          name={`${item.createdBy?.firstName || ''} ${
            item.createdBy?.lastName || ''
          }`}
        />
        <UI.TableI
          name={`${item.updatedBy?.firstName || ''} ${
            item.updatedBy?.lastName || ''
          }`}
        />
      </UI.TableR>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        style={style.fullScreen}
        horizontal={true}
        refreshControl={
          <RefreshControl refreshing={isLoader} onRefresh={getInventory} />
        }>
        <View style={style.fullScreen}>
          <UI.TableH
            headers={[
              'Name',
              'Unit',
              'Brand',
              'Quantity',
              'Price',
              'In Stock',
              'Created By',
              'Modified By',
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
        onDismissSnackBar={() => dispatchInventory(clearGetInventoryErrorMsg())}
      />
    </SafeAreaView>
  );
}

export default Inventory;

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
  iconContainer: {
    height: 40,
    width: 40,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
