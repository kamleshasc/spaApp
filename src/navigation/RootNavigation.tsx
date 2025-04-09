import React, {FC} from 'react';
import {
  StackNavigationOptions,
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
  price: any;
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

  const commonHeaderOptions: StackNavigationOptions = {
    headerShown: true,
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
  };

  const screens: {name: keyof RootStackParamList; component: FC<any>}[] = [
    {name: 'OnBoarding', component: SCREENS.ONBOARDINGSCREENS.onBoarding},
    {name: 'Welcome', component: SCREENS.ONBOARDINGSCREENS.welcome},
    {name: 'DrawerNavigation', component: DrawerNavigation},
    {name: 'Login', component: SCREENS.AUTHSCREENS.login},
    {name: 'SignUp', component: SCREENS.AUTHSCREENS.signup},
    {name: 'Forgot', component: SCREENS.AUTHSCREENS.forgot},
    {name: 'ResetPassword', component: SCREENS.AUTHSCREENS.resetPassword},
    {name: 'BookingUser', component: SCREENS.BOOKSCREENS.bookingUser},
    {name: 'BookingTimeLine', component: SCREENS.BOOKSCREENS.timeLine},
    {name: 'EmployeeList', component: SCREENS.DASHBOARD.employeeList},
    {name: 'EditProfile', component: SCREENS.PROFILESCREENS.editProfile},
    {name: 'ChangePassword', component: SCREENS.PROFILESCREENS.changePassword},
    {name: 'PrivacyPolicy', component: SCREENS.PROFILESCREENS.privacyPolicy},
    {name: 'PaymentMethod', component: SCREENS.PAYMENTSCREENS.paymentMethods},
  ];

  const headerScreens: {
    name: keyof RootStackParamList;
    component: FC<any>;
    options?: StackNavigationOptions;
  }[] = [
    {name: 'AddEmployee', component: SCREENS.EMPLOYEESCREENS.addEmployee},
    {name: 'EditEmployee', component: SCREENS.EMPLOYEESCREENS.editEmployee},
    {name: 'AddService', component: SCREENS.SERVICE.addService},
    {name: 'EditService', component: SCREENS.SERVICE.editService},
    {name: 'AddClient', component: SCREENS.CLIENT.addClient},
    {name: 'EditClient', component: SCREENS.CLIENT.editClient},
    {name: 'AddInventory', component: SCREENS.INVENTORY.addInventory},
    {name: 'EditInventory', component: SCREENS.INVENTORY.editInventory},
    {
      name: 'AddCommissionRule',
      component: SCREENS.COMMISSIONRULESCREENS.addCommissionRule,
    },
    {
      name: 'EditCommissionRule',
      component: SCREENS.COMMISSIONRULESCREENS.editCommissionRule,
    },
    {name: 'AddInvoice', component: SCREENS.INVOICESCREENS.addInvoice},
    {name: 'EditInvoice', component: SCREENS.INVOICESCREENS.editInvoice},
    {name: 'PdfInvoice', component: SCREENS.INVOICESCREENS.PdfInvoice},
    {name: 'AddCustomer', component: SCREENS.CUSTOMERSCREENS.addCustomer},
    {name: 'EditCustomer', component: SCREENS.CUSTOMERSCREENS.editCustemer},
    {
      name: 'SalesReportPdf',
      component: SCREENS.REPORTSCREENS.salesReportPdf,
      options: {title: 'Report PDF'},
    },
  ];

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {loadingStatus && <Stack.Screen name="Loading" component={UI.Loader} />}
      {screens.map(({name, component}) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}

      {headerScreens.map(({name, component, options}) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{...commonHeaderOptions, ...options}}
        />
      ))}
    </Stack.Navigator>
  );
}

export default RootNavigation;
