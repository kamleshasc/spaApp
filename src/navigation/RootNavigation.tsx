import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import colors from '../config/colors';
import {UserData} from '../screens/Employee/Employees';
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
import {GetBookingsListData} from '../screens/Payments/GetBookingsList';

interface BookingTimeLine {
  date: any;
  expertId: string;
  serviceId: string;
  parentId: string;
  name: string;
  mail: string;
  phone: string;
  duration: string;
  serviceName: string;
}

export type RootStackParamList = {
  DrawerNavigation: undefined;
  AddEmployee: undefined;
  EditEmployee: {user: UserData};
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
  SignUp: undefined;
  BookingUser: {expertId: string; selectedDate: string};
  BookingTimeLine: {payload: BookingTimeLine};
  EmployeeList: {serviceName: string};
  EditProfile: {userId: string};
  ChangePassword: undefined;
  PrivacyPolicy: undefined;
  Forgot: undefined;
  ResetPassword: {userId: string};
  PaymentMethod: undefined;
  SalesReportPdf: {startDate: string; endDate: string; s_type: string};
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
type Nav = {
  navigate: (value: string) => void;
};

function RootNavigation() {
  const {navigate} = useNavigation<Nav>();
  const [loadingStatus, setLoadingStatus] = React.useState(true);
  const rootDispatch = useAppDispatch();
  const handleNavigation = async () => {
    try {
      const value = await AsyncStorage.getItem('userScreens');
      if (value) {
        rootDispatch(loadUserScreens());
        rootDispatch(userDetails());
        navigate('DrawerNavigation');
        setLoadingStatus(false);
        return;
      } else {
        navigate('OnBoarding');
        setLoadingStatus(false);
        return;
      }
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
        headerBackTitleVisible: false,
      }}>
      {loadingStatus && <Stack.Screen name="Loading" component={UI.Loader} />}
      <Stack.Screen
        name="OnBoarding"
        component={SCREENS.ONBOARDINGSCREENS.onBoarding}
      />
      <Stack.Screen
        name="Welcome"
        component={SCREENS.ONBOARDINGSCREENS.welcome}
      />
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      <Stack.Screen name="Login" component={SCREENS.AUTHSCREENS.login} />
      <Stack.Screen
        name="AddEmployee"
        component={SCREENS.EMPLOYEESCREENS.addEmployee}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="EditEmployee"
        component={SCREENS.EMPLOYEESCREENS.editEmployee}
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
      <Stack.Screen name="SignUp" component={SCREENS.AUTHSCREENS.signup} />
      <Stack.Screen
        name="BookingUser"
        component={SCREENS.BOOKSCREENS.bookingUser}
      />
      <Stack.Screen
        name="BookingTimeLine"
        component={SCREENS.BOOKSCREENS.timeLine}
      />
      <Stack.Screen
        name="EmployeeList"
        component={SCREENS.DASHBOARD.employeeList}
      />
      <Stack.Screen
        name="EditProfile"
        component={SCREENS.PROFILESCREENS.editProfile}
      />
      <Stack.Screen
        name="ChangePassword"
        component={SCREENS.PROFILESCREENS.changePassword}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={SCREENS.PROFILESCREENS.privacyPolicy}
      />
      <Stack.Screen name="Forgot" component={SCREENS.AUTHSCREENS.forgot} />
      <Stack.Screen
        name="ResetPassword"
        component={SCREENS.AUTHSCREENS.resetPassword}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={SCREENS.PAYMENTSCREENS.paymentMethods}
      />
      <Stack.Screen
        name="SalesReportPdf"
        options={{headerShown: true, title: 'Report PDF'}}
        component={SCREENS.REPORTSCREENS.salesReportPdf}
      />
    </Stack.Navigator>
  );
}

export default RootNavigation;
