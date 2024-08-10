import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {rMS} from '../../config/responsive';
import {SCREEN, UI} from '../../components';
import {branchData} from '../../config/data';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchService, fetchSubService} from '../../redux/Action/serviceAction';
import Icon from 'react-native-vector-icons/AntDesign';
import {DateFormateMMMMDDYYY} from '../../config/helper';
import {fetchClient} from '../../redux/Action/clientAction';
import {fetchGetUser} from '../../redux/Action/userAction';
import {fetchAddInvoice, fetchInvoice} from '../../redux/Action/invoiceAction';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../navigation/RootNavigation';
interface singleObjString {
  value: string;
  isValid: boolean;
  message: any;
}
interface singleObjNumber {
  value: number;
  isValid: boolean;
  message: any;
}

export interface inputInvoice {
  client: singleObjString;
  employee: singleObjString;
  branch: singleObjString;
  dateOfInvoice: singleObjString;
  invoiceNumber: singleObjString;
  total: singleObjNumber;
  taxPercentage: singleObjNumber;
  taxValue: singleObjNumber;
  finalTotal: singleObjNumber;
}

export const initialInputs: inputInvoice = {
  client: {value: '', isValid: true, message: ''},
  employee: {value: '', isValid: true, message: ''},
  branch: {value: '', isValid: true, message: ''},
  dateOfInvoice: {value: '', isValid: true, message: ''},
  invoiceNumber: {value: '', isValid: true, message: ''},
  total: {value: 0, isValid: true, message: ''},
  taxPercentage: {value: 6, isValid: true, message: ''},
  taxValue: {value: 0, isValid: true, message: ''},
  finalTotal: {value: 0, isValid: true, message: ''},
};

type AddInvoiceProp = NativeStackScreenProps<RootStackParamList, 'AddInvoice'>;

function AddInvoice({navigation}: AddInvoiceProp) {
  const [selectedServices, setSelectedServices] = React.useState<any[]>([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showDate, setShowDate] = React.useState(false);
  const dispatchAddInvoice = useAppDispatch();
  const {data: subServicesData} = useAppSelector(
    state => state.service.getSubService,
  );
  const {data: clientsData} = useAppSelector(state => state.client.getClient);
  const {data: usersData} = useAppSelector(state => state.user.getUser);
  const {errorMsg, isError, isLoader} = useAppSelector(
    state => state.Invoice.addInvoice,
  );
  const [inputs, setInputs] = React.useState<inputInvoice>(initialInputs);
  const [selectedServicesIsError, setSelectedServicesIsError] =
    React.useState<boolean>(true);
  const [selectedServiceErrorMsg, setSelectedServiceErrorMsg] =
    React.useState<string>('');
  const [showError, setShowError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');

  const {
    client,
    branch,
    dateOfInvoice,
    employee,
    invoiceNumber,
    total,
    taxValue,
    taxPercentage,
    finalTotal,
  } = inputs;

  const inputChangedHandler = (inputIdentifier: any, enteredValue: any) => {
    setInputs(currInputs => {
      return {
        ...currInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  };

  const calculateTax = () => {
    setSelectedServices(prevArray => {
      const arr = [...prevArray];
      let price = arr.reduce((curr, value: any) => {
        return (curr = curr + value?.price);
      }, 0);
      let tax = (price * 6) / 100;
      let totalWithTax = price + tax;
      inputChangedHandler('taxValue', tax.toFixed(2));
      inputChangedHandler('total', price.toFixed(2));
      inputChangedHandler('finalTotal', totalWithTax.toFixed(2));
      return prevArray;
    });
  };

  const getAllDetails = () => {
    dispatchAddInvoice(fetchClient());
    dispatchAddInvoice(fetchGetUser());
    dispatchAddInvoice(fetchSubService());
  };

  React.useEffect(() => {
    getAllDetails();
  }, []);

  React.useEffect(() => {
    if (!showError && isError) {
      setShowError(isError);
      setErrorMessage(errorMsg);
    }
  }, [isLoader]);

  const addValue = (addedValue: string) => {
    let addServiceDetail = subServicesData.reduce((curr, value) => {
      if (value.name == addedValue) {
        let body = {
          name: value.name,
          duration: value.duration,
          price: value.price,
        };
        curr = body;
      }
      return curr;
    }, null);

    if (addServiceDetail) {
      selectedServices.push(addServiceDetail);
      calculateTax();
      if (!selectedServicesIsError) {
        setSelectedServiceErrorMsg('');
        setSelectedServicesIsError(true);
      }
    }
  };

  const deleteValue = (deleteValue: number) => {
    setSelectedServices(prevArray => {
      const newArray = [...prevArray];
      newArray.splice(deleteValue, 1);
      return newArray;
    });
    calculateTax();
  };

  const handleDateChange = (value: Date) => {
    setShowDate(false);
    if (value) {
      setSelectedDate(value);
      const selectedDate = DateFormateMMMMDDYYY(value);
      inputChangedHandler('dateOfInvoice', selectedDate);
    }
  };

  const addInvoice = async () => {
    try {
      let payload = {
        client: client.value,
        employee: employee.value,
        branch: branch.value,
        selectedService: selectedServices,
        dateOfInvoice: String(selectedDate),
        invoiceNumber: invoiceNumber.value,
        total: total.value,
        taxValue: taxValue.value,
        taxPercentage: taxPercentage.value,
        finalTotal: finalTotal.value,
      };

      await dispatchAddInvoice(fetchAddInvoice(payload)).unwrap();

      dispatchAddInvoice(fetchInvoice());
      navigation.goBack();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error);
    }
  };

  const checkValidation = () => {
    let clientNameIsValid = true;
    let clientNameMsg = '';
    let employeeIsValid = true;
    let employeeMsg = '';
    let branchNameIsValid = true;
    let branchNameMsg = '';
    let selectedServiceIsValid = true;
    let selectedServiceMsg = '';
    let dateOfInvoiceIsValid = true;
    let dateOfInvoiceMsg = '';
    let invoiceNumberIsValid = true;
    let invoiceNumberMsg = '';

    if (client.value.trim().length <= 0) {
      clientNameIsValid = false;
      clientNameMsg = 'Client Name is required.';
    }

    if (employee.value.trim().length <= 0) {
      employeeIsValid = false;
      employeeMsg = 'Employee Name is required.';
    }

    if (branch.value.trim().length <= 0) {
      branchNameIsValid = false;
      branchNameMsg = 'Branch Name is required.';
    }

    if (selectedServices.length <= 0) {
      selectedServiceIsValid = false;
      selectedServiceMsg = 'Service is required.';
    }

    if (dateOfInvoice.value.trim().length <= 0) {
      dateOfInvoiceIsValid = false;
      dateOfInvoiceMsg = 'Date of invoice is required.';
    }

    if (invoiceNumber.value.trim().length <= 0) {
      invoiceNumberIsValid = false;
      invoiceNumberMsg = 'Invoice Number is required.';
    }

    if (
      !clientNameIsValid ||
      !employeeIsValid ||
      !branchNameIsValid ||
      !dateOfInvoiceIsValid ||
      !invoiceNumberIsValid ||
      !selectedServiceIsValid
    ) {
      setInputs(curinputs => {
        return {
          ...curinputs,
          client: {
            message: clientNameMsg,
            isValid: clientNameIsValid,
            value: curinputs.client.value,
          },
          employee: {
            message: employeeMsg,
            isValid: employeeIsValid,
            value: curinputs.employee.value,
          },
          branch: {
            message: branchNameMsg,
            isValid: branchNameIsValid,
            value: curinputs.branch.value,
          },
          dateOfInvoice: {
            message: dateOfInvoiceMsg,
            isValid: dateOfInvoiceIsValid,
            value: curinputs.dateOfInvoice.value,
          },
          invoiceNumber: {
            message: invoiceNumberMsg,
            isValid: invoiceNumberIsValid,
            value: curinputs.invoiceNumber.value,
          },
        };
      });

      if (!selectedServiceIsValid) {
        setSelectedServiceErrorMsg(selectedServiceMsg);
        setSelectedServicesIsError(selectedServiceIsValid);
      }
      return;
    }
    addInvoice();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Add Invoice</Text>
          </View>
          {showDate && (
            <UI.DatePick
              dateValue={selectedDate}
              handleCancelPressed={() => setShowDate(false)}
              handleOkayPressed={(value: Date) => handleDateChange(value)}
            />
          )}
          <UI.DropDown
            data={clientsData.map(val => {
              return {
                label: `${val.prefix} ${val.firstName} ${val.lastName}`,
                value: `${val._id}`,
              };
            })}
            onChange={(value: any) =>
              inputChangedHandler('client', value.value)
            }
            placeholder={'Select Client Name'}
            value={client.value}
            isError={!client.isValid}
            errorMsg={client.message}
          />
          <UI.DropDown
            data={usersData.map(val => {
              return {
                label: `${val.firstName} ${val.lastName}`,
                value: `${val._id}`,
              };
            })}
            onChange={(value: any) =>
              inputChangedHandler('employee', value.value)
            }
            placeholder={'Select Employee Name'}
            value={employee.value}
            isError={!employee.isValid}
            errorMsg={employee.message}
          />
          <UI.DropDown
            data={branchData}
            onChange={(value: any) =>
              inputChangedHandler('branch', value.value)
            }
            placeholder={'Select Branch Name'}
            value={branch.value}
            isError={!branch.isValid}
            errorMsg={branch.message}
          />
          <SCREEN.DropDownWithList
            selectedServices={selectedServices}
            addValue={addValue}
            data={subServicesData.map(value => {
              return {label: value.name, value: value.name};
            })}
            deleteItem={deleteValue}
            isError={!selectedServicesIsError}
            errorMsg={selectedServiceErrorMsg}
          />
          <UI.Input
            showIcon={true}
            disableInput={true}
            textInputConfig={{
              placeholder: 'Date of Invoice',
              value: dateOfInvoice.value,
            }}
            isError={!dateOfInvoice.isValid}
            errorMsg={dateOfInvoice.message}
            iconPressed={() => setShowDate(true)}>
            <Icon name="calendar" size={30} color="black" />
          </UI.Input>
          <UI.Input
            textInputConfig={{
              placeholder: 'Invoice Number',
              onChangeText: (value: any) =>
                inputChangedHandler('invoiceNumber', value),
              value: invoiceNumber.value,
              keyboardType: 'number-pad',
            }}
            isError={!invoiceNumber.isValid}
            errorMsg={invoiceNumber.message}
          />
          <UI.Input
            disableInput={true}
            textInputConfig={{
              placeholder: 'Invoice Total',
              value: total.value != 0 ? `$ ${total.value}` : '',
              keyboardType: 'number-pad',
            }}
            isError={!total.isValid}
            errorMsg={total.message}
          />
          <UI.Input
            disableInput={true}
            textInputConfig={{
              placeholder: 'Tax',
              value: `Tax(${taxPercentage.value}%): ${
                taxValue.value != 0 ? `$${taxValue.value}` : ''
              }`,
              keyboardType: 'number-pad',
            }}
          />
          <UI.Input
            disableInput={true}
            textInputConfig={{
              placeholder: 'Total With Tax',
              value: `Total with tax: $ ${finalTotal.value}`,
              keyboardType: 'number-pad',
            }}
            isError={!finalTotal.isValid}
            errorMsg={finalTotal.message}
          />
          <UI.Btn disabledBtn={isLoader} onPressBtn={checkValidation}>
            Submit
          </UI.Btn>
        </View>
      </ScrollView>
      <UI.Toast
        message={errorMessage}
        visible={showError}
        onDismissSnackBar={() => setShowError(false)}
      />
    </SafeAreaView>
  );
}

export default AddInvoice;
const styles = StyleSheet.create({
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
  subContainer: {
    maxWidth: 600,
    alignSelf: 'center',
    flex: 1,
    width: '100%',
  },
  headerContainer: {
    marginVertical: rMS(40),
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.fontDark,
  },
  dropdown: {
    paddingRight: 8,
    paddingLeft: 14,
    borderWidth: 1.5,
    borderColor: colors.secondaryDark,
    backgroundColor: colors.primary,
    borderRadius: 12,
    // marginBottom: 20,
    // marginHorizontal: 20,
    paddingVertical: 10,
    // width: '70%',
    flex: 0.7,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.fontDark,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
  errorContainer: {
    marginTop: -20,
    marginLeft: 16,
    marginBottom: 4,
  },
  errorFont: {
    fontSize: 13,
    fontWeight: '700',
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomColor: colors.secondaryDark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  itemFont: {
    fontSize: 14,
    color: colors.fontDark,
  },
});
