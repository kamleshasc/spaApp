import React from 'react';
import {
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import colors from '../config/colors';
import SCREENS from '../screens';
import {useAppDispatch, useAppSelector} from '../hooks/storeHook';
import {clearUserScreens, loadUserScreens} from '../redux/Action/authAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UI} from '../components';
import CustomDrawerContent from './CustomDrawerContent';

export type DrawerNavigationParamList = {
  Dashboard: undefined;
  Users: undefined;
  Services: undefined;
  Clients: undefined;
  Inventory: undefined;
  CommissionRules: undefined;
  Invoices: undefined;
  Bookings: undefined;
};

export type DrawerNavigationPropList =
  DrawerNavigationProp<DrawerNavigationParamList>;

const Drawer = createDrawerNavigator<DrawerNavigationParamList>();

function DrawerNavigation() {
  const [screens, setScreens] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  // const {data, screens} = useAppSelector(state => state.auth.login);
  // console.log(data, 'data ==========>>>>');
  // console.log(data?.data?.screens, 'screens ==========>>>>');

  const dispatchDrawerNavigation = useAppDispatch();
  // React.useEffect(() => {
  //   dispatchDrawerNavigation(loadUserScreens());
  // }, []);

  const getScreens = async () => {
    try {
      // const value = await AsyncStorage.getItem('userScreens');
      // if (value) {
      //   setScreens(value);
      // }
      let result = await dispatchDrawerNavigation(loadUserScreens()).unwrap();

      if (result && result.length > 0) {
        setScreens(result);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getScreens();
  }, []);

  return loading ? (
    <UI.Loader />
  ) : (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          borderBottomWidth: 1,
          borderBottomColor: colors.themePrimary,
        },
        headerTitleStyle: {
          color: colors.themePrimary,
        },
        headerTintColor: colors.themePrimary,
        drawerActiveBackgroundColor: colors.themePrimary,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.fontDark,
      }}>
      {screens.includes('Dashboard') && (
        <Drawer.Screen
          name="Dashboard"
          component={SCREENS.DASHBOARD.dashboard}
        />
      )}
      {screens.includes('Users') && (
        <Drawer.Screen name="Users" component={SCREENS.USER.users} />
      )}
      {screens.includes('Services') && (
        <Drawer.Screen name="Services" component={SCREENS.SERVICE.services} />
      )}
      {screens.includes('Clients') && (
        <Drawer.Screen name="Clients" component={SCREENS.CLIENT.clients} />
      )}
      {screens.includes('Inventory') && (
        <Drawer.Screen
          name="Inventory"
          component={SCREENS.INVENTORY.inventory}
        />
      )}
      {screens.includes('CommissionRules') && (
        <Drawer.Screen
          name="CommissionRules"
          component={SCREENS.COMMISSIONRULESCREENS.commissionRules}
        />
      )}
      {screens.includes('Invoices') && (
        <Drawer.Screen
          name="Invoices"
          component={SCREENS.INVOICESCREENS.invoice}
        />
      )}
      {screens.includes('Bookings') && (
        <Drawer.Screen
          name="Bookings"
          component={SCREENS.BOOKINGSCREENS.bookings}
        />
      )}
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
