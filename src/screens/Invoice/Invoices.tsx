import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {UI} from '../../components';
import {fetchInvoice} from '../../redux/Action/invoiceAction';
import {DateFormateMMMMDDYYY} from '../../config/helper';

type InvoiceType = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'Invoices'>,
  StackScreenProps<RootStackParamList>
>;

interface nameObj {
  id: string;
  firstName: string;
  lastName: string;
}

export interface InvoiceData {
  _id: string;
  client: nameObj;
  employee: nameObj;
  branch: string;
  selectedService: object[];
  dateOfInvoice: string;
  invoiceNumber: number;
  total: number;
  tax: number;
  finalTotal: number;
  createdAt: string;
  updatedAt: string;
}

function Invoice({navigation}: InvoiceType) {
  const {data, isError, errorMsg, isLoader} = useAppSelector(
    state => state.Invoice.getInvoice,
  );
  const invoiceDispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showError, setShowError] = React.useState(false);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddInvoice')}
          style={style.iconContainer}>
          <Icon name="add" size={30} color={colors.themePrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getInvoice = () => {
    invoiceDispatch(fetchInvoice());
  };

  React.useEffect(() => {
    if (isError && !showError) {
      setShowError(isError);
      setErrorMessage(errorMsg);
    }
  }, [isLoader]);

  React.useEffect(() => {
    getInvoice();
  }, []);

  function renderItem({item}: {item: InvoiceData}) {
    return (
      <UI.TableR
        onPress={() => {
          navigation.navigate('EditInvoice', {invoice: item});
        }}>
        <UI.TableI name={item?.invoiceNumber} />
        <UI.TableI name={DateFormateMMMMDDYYY(item?.dateOfInvoice)} />
        <UI.TableI
          name={`${item?.client?.firstName} ${item?.client?.lastName}`}
        />
        <UI.TableI
          name={`${item?.employee?.firstName} ${item?.employee?.lastName}`}
        />
        <UI.TableI name={item?.branch} />
        <UI.TableI
          link={'View Pdf'}
          onLinkPress={() =>
            navigation.navigate('PdfInvoice', {invoiceId: item?._id})
          }
        />
        <UI.TableI name={DateFormateMMMMDDYYY(item?.createdAt)} />
        <UI.TableI name={DateFormateMMMMDDYYY(item?.updatedAt)} />
      </UI.TableR>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        onRefresh={() => getInvoice()}
        refreshing={isLoader}
        data={new Array(1)}
        horizontal={true}
        renderItem={() => (
          <View style={style.fullScreen}>
            <UI.TableH
              headers={[
                'Invoice No.',
                'Invoice Date',
                'Client Name',
                'Employee Name',
                'Branch Name',
                'Invoice View',
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
        visible={showError}
        message={errorMessage}
        onDismissSnackBar={() => setShowError(false)}
      />
    </SafeAreaView>
  );
}

export default Invoice;
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
