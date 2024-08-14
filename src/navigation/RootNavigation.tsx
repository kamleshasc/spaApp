import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import colors from '../config/colors';
import {UserData} from '../screens/User/Users';
import {ServiceData} from '../screens/Service/Services';
import SCREENS from '../screens';
import {ClientsData} from '../screens/Client/Clients';
import {InventoryData} from '../screens/Inventory/Inventory';
import {commissionRuleData} from '../screens/CommissionRule/CommissionRules';
import {InvoiceData} from '../screens/Invoice/Invoices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {UI} from '../components';
import {useAppDispatch} from '../hooks/storeHook';
import {loadUserScreens, userDetails} from '../redux/Action/authAction';
import {CustomerData} from '../screens/Customer/Customer';

export type RootStackParamList = {
  DrawerNavigation: undefined;
  AddUser: undefined;
  EditUser: {user: UserData};
  AddService: undefined;
  EditService: {service: ServiceData};
  AddClient: undefined;
  EditClient: {client: ClientsData};
  AddInventory: undefined;
  EditInventory: {inventory: InventoryData};
  AddCommissionRule: undefined;
  EditCommissionRule: {commissionRule: commissionRuleData};
  AddInvoice: undefined;
  EditInvoice: {invoice: InvoiceData};
  PdfInvoice: {invoiceId: string};
  OnBoarding: undefined;
  Welcome: undefined;
  Login: undefined;
  Loading: undefined;
  AddCustomer: undefined;
  EditCustomer: {customer: CustomerData};
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
type Nav = {
  navigate: (value: string) => void;
};

function RootNavigation() {
  const {navigate} = useNavigation<Nav>();
  const rootDispatch = useAppDispatch();
  const handleNavigation = async () => {
    try {
      const value = await AsyncStorage.getItem('userScreens');
      if (value) {
        // setScreens(value);
        rootDispatch(loadUserScreens());
        rootDispatch(userDetails());
        navigate('DrawerNavigation');
      } else {
        navigate('OnBoarding');
      }
      console.log(value, 'result');
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleNavigation();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.primary,
          borderBottomWidth: 1,
          borderBottomColor: colors.themePrimary,
        },
        headerTitleStyle: {
          color: colors.themePrimary,
        },
        headerTintColor: colors.themePrimary,
      }}>
      <Stack.Screen name="Loading" component={UI.Loader} />
      <Stack.Screen
        name="OnBoarding"
        component={SCREENS.ONBOARDINGSCREENS.onBoarding}
      />
      <Stack.Screen
        name="Welcome"
        component={SCREENS.ONBOARDINGSCREENS.welcome}
      />
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      <Stack.Screen name="Login" component={SCREENS.USER.login} />
      <Stack.Screen
        name="AddUser"
        component={SCREENS.USER.addUser}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditUser"
        component={SCREENS.USER.editUser}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddService"
        component={SCREENS.SERVICE.addService}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditService"
        component={SCREENS.SERVICE.editService}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddClient"
        component={SCREENS.CLIENT.addClient}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditClient"
        component={SCREENS.CLIENT.editClient}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddInventory"
        component={SCREENS.INVENTORY.addInventory}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditInventory"
        component={SCREENS.INVENTORY.editInventory}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddCommissionRule"
        component={SCREENS.COMMISSIONRULESCREENS.addCommissionRule}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditCommissionRule"
        component={SCREENS.COMMISSIONRULESCREENS.editCommissionRule}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddInvoice"
        component={SCREENS.INVOICESCREENS.addInvoice}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditInvoice"
        component={SCREENS.INVOICESCREENS.editInvoice}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="PdfInvoice"
        component={SCREENS.INVOICESCREENS.PdfInvoice}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddCustomer"
        component={SCREENS.CUSTOMERSCREENS.addCustomer}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditCustomer"
        component={SCREENS.CUSTOMERSCREENS.editCustemer}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export default RootNavigation;
