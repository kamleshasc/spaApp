import React from 'react';
import {
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import colors from '../config/colors';
import SCREENS from '../screens';
import {useAppDispatch} from '../hooks/storeHook';
import {loadUserScreens} from '../redux/Action/authAction';
import {UI} from '../components';
import CustomDrawerContent from './CustomDrawerContent';

export type DrawerNavigationParamList = {
  Dashboard: undefined;
  Employees: undefined;
  Services: undefined;
  Clients: undefined;
  Inventory: undefined;
  CommissionRules: undefined;
  Invoices: undefined;
  Bookings: undefined;
  Customers: undefined;
  Book: undefined;
  MyBooking: undefined;
  Profile: undefined;
  Payment: undefined;
  SalesReport: undefined;
};

export type DrawerNavigationPropList =
  DrawerNavigationProp<DrawerNavigationParamList>;

const Drawer = createDrawerNavigator<DrawerNavigationParamList>();

function DrawerNavigation() {
  const [screens, setScreens] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  // const {data, screens} = useAppSelector(state => state.auth.login);

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
          height: 55,
          backgroundColor: colors.primary,
          borderBottomWidth: 1,
          borderBottomColor: colors.themePrimary,
        },
        headerTitleStyle: {
          fontSize: 21,
          fontWeight: '600',
          color: colors.themePrimary,
        },
        headerTitleAlign: 'left',
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
      {screens.includes('Employees') && (
        <Drawer.Screen
          name="Employees"
          component={SCREENS.EMPLOYEESCREENS.employees}
        />
      )}
      {screens.includes('Services') && (
        <Drawer.Screen name="Services" component={SCREENS.SERVICE.services} />
      )}
      {/* {screens.includes('Clients') && (
        <Drawer.Screen name="Clients" component={SCREENS.CLIENT.clients} />
      )} */}
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
      {screens.includes('Customers') && (
        <Drawer.Screen
          name="Customers"
          component={SCREENS.CUSTOMERSCREENS.customer}
        />
      )}
      {screens.includes('Book') && (
        <Drawer.Screen name="Book" component={SCREENS.BOOKSCREENS.book} />
      )}
      {screens.includes('MyBooking') && (
        <Drawer.Screen
          name="MyBooking"
          component={SCREENS.BOOKSCREENS.myBooking}
          options={{drawerLabel: 'My Bookings', title: 'My Bookings'}}
        />
      )}
      <Drawer.Screen
        name="Payment"
        component={SCREENS.PAYMENTSCREENS.getBookings}
      />
      <Drawer.Screen
        name="SalesReport"
        options={{drawerLabel: 'Sales Report', title: 'Sales Report'}}
        component={SCREENS.REPORTSCREENS.salesReport}
      />
      <Drawer.Screen
        name="Profile"
        component={SCREENS.PROFILESCREENS.profile}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
