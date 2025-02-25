import React from 'react';
import {Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {rMS} from '../../config/responsive';
import {UI} from '../../components';
import {stockData, unitData} from '../../config/data';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchGetUser} from '../../redux/Action/userAction';
import {
  fetchAddInventory,
  fetchInventory,
} from '../../redux/Action/inventoryAction';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {clearAddInventoryData} from '../../redux/Reducer/inventoryReducer/addInventorySlice';

interface objStringValue {
  value: string;
  isValid: boolean;
  message: any;
}

export interface inventoryInputsTypes {
  name: objStringValue;
  unit: objStringValue;
  brand: objStringValue;
  quantity: objStringValue;
  price: objStringValue;
  stock: objStringValue;
  createdBy: objStringValue;
  updatedBy: objStringValue;
}

export const initialInputs: inventoryInputsTypes = {
  name: {value: '', isValid: true, message: ''},
  unit: {value: '', isValid: true, message: ''},
  brand: {value: '', isValid: true, message: ''},
  quantity: {value: '', isValid: true, message: ''},
  price: {value: '', isValid: true, message: ''},
  stock: {value: '', isValid: true, message: ''},
  createdBy: {value: '', isValid: true, message: ''},
  updatedBy: {value: '', isValid: true, message: ''},
};

type AddInventoryProp = NativeStackScreenProps<
  RootStackParamList,
  'AddInventory'
>;

function AddInventory({navigation}: AddInventoryProp) {
  const [inputs, setInputs] =
    React.useState<inventoryInputsTypes>(initialInputs);
  const {name, unit, brand, quantity, price, stock, createdBy} = inputs;
  const dispatchAddInventory = useAppDispatch();
  const {data: userData, isLoader: userDataLoader} = useAppSelector(
    root => root.user.getUser,
  );
  const {isError, errorMsg, isLoader} = useAppSelector(
    root => root.inventory.addInventory,
  );
  const [showError, setShowError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');

  const getUserDetails = () => {
    dispatchAddInventory(fetchGetUser());
  };

  React.useEffect(() => {
    getUserDetails();
  }, []);

  React.useEffect(() => {
    if (!showError && isError) {
      setShowError(isError);
      setErrorMessage(errorMsg);
    }
  }, [isLoader]);

  const inputChangedHandler = (inputIdentifier: any, enteredValue: any) => {
    try {
      setInputs(curInputs => {
        return {
          ...curInputs,
          [inputIdentifier]: {value: enteredValue, isValid: true},
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addInventory = async () => {
    try {
      let body = {
        name: name.value,
        unit: unit.value,
        brand: brand.value,
        quantity: Number(quantity.value).toFixed(2),
        price: Number(price.value).toFixed(2),
        stock: Number(stock.value),
        createdBy: createdBy?.value || '',
      };

      let result = await dispatchAddInventory(fetchAddInventory(body)).unwrap();
      if (result) {
        navigation.goBack();
        dispatchAddInventory(fetchInventory());
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage(error);
    }
  };

  const checkValidation = () => {
    let numbers = /^\d+(\.\d+)?$/;
    let nameIsValid = true;
    let nameMsg = '';
    let unitIsValid = true;
    let unitMsg = '';
    let brandIsValid = true;
    let brandMsg = '';
    let quantityIsValid = true;
    let quantityMsg = '';
    let priceIsValid = true;
    let priceMsg = '';
    let stockIsValid = true;
    let stockMsg = '';
    let createdByIsValid = true;
    let createdByMsg = '';

    if (name.value.trim().length <= 0) {
      nameIsValid = false;
      nameMsg = 'Inventory Name is required.';
    }

    if (unit.value.trim().length <= 0) {
      unitIsValid = false;
      unitMsg = 'Unit is required.';
    }

    if (brand.value.trim().length <= 0) {
      brandIsValid = false;
      brandMsg = 'Brand is required.';
    }

    if (quantity.value.trim().length > 0 && !numbers.test(quantity.value)) {
      quantityIsValid = false;
      quantityMsg = 'Please enter number or decimal only.';
    } else if (quantity.value.trim().length <= 0) {
      quantityIsValid = false;
      quantityMsg = 'Quantity is required.';
    }

    if (price.value.trim().length > 0 && !numbers.test(price.value)) {
      priceIsValid = false;
      priceMsg = 'Please enter number or decimal only.';
    } else if (price.value.trim().length <= 0) {
      priceIsValid = false;
      priceMsg = 'Price is required.';
    }

    if (stock.value.trim().length <= 0) {
      stockIsValid = false;
      stockMsg = 'Stock is required.';
    }

    if (createdBy.value.trim().length <= 0) {
      createdByIsValid = false;
      createdByMsg = 'Current user is required.';
    }

    if (
      !nameIsValid ||
      !unitIsValid ||
      !brandIsValid ||
      !quantityIsValid ||
      !priceIsValid ||
      !stockIsValid ||
      !createdByIsValid
    ) {
      setInputs(curinputs => {
        return {
          ...curinputs,
          name: {
            message: nameMsg,
            isValid: nameIsValid,
            value: curinputs.name.value,
          },
          unit: {
            message: unitMsg,
            isValid: unitIsValid,
            value: curinputs.unit.value,
          },
          brand: {
            message: brandMsg,
            isValid: brandIsValid,
            value: curinputs.brand.value,
          },
          quantity: {
            message: quantityMsg,
            isValid: quantityIsValid,
            value: curinputs.quantity.value,
          },
          price: {
            message: priceMsg,
            isValid: priceIsValid,
            value: curinputs.price.value,
          },
          stock: {
            message: stockMsg,
            isValid: stockIsValid,
            value: curinputs.stock.value,
          },
          createdBy: {
            message: createdByMsg,
            isValid: createdByIsValid,
            value: curinputs.createdBy.value,
          },
        };
      });
      return;
    }
    addInventory();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Add Inventory</Text>
          </View>
          <UI.Input
            textInputConfig={{
              placeholder: 'Inventory Name*',
              value: name.value,
              onChangeText: (value: any) => inputChangedHandler('name', value),
            }}
            isError={!name.isValid}
            errorMsg={name.message}
          />

          <UI.DropDown
            data={unitData}
            onChange={(value: any) => inputChangedHandler('unit', value.value)}
            placeholder={'Select Unit*'}
            value={unit.value}
            isError={!unit.isValid}
            errorMsg={unit.message}
            styles={styles.dropdownStyle}
          />

          <UI.Input
            textInputConfig={{
              placeholder: 'Brand*',
              value: brand.value,
              onChangeText: (value: any) => inputChangedHandler('brand', value),
            }}
            isError={!brand.isValid}
            errorMsg={brand.message}
          />

          <UI.Input
            textInputConfig={{
              placeholder: 'Quantity*',
              value: String(quantity.value),
              keyboardType: 'number-pad',
              onChangeText: (value: any) =>
                inputChangedHandler('quantity', value),
            }}
            isError={!quantity.isValid}
            errorMsg={quantity.message}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'Price*',
              value: String(price.value),
              onChangeText: (value: any) => inputChangedHandler('price', value),
              keyboardType: 'number-pad',
            }}
            isError={!price.isValid}
            errorMsg={price.message}
          />
          <UI.DropDown
            data={stockData}
            onChange={(value: any) => inputChangedHandler('stock', value.value)}
            placeholder={'Select Stock*'}
            value={String(stock.value)}
            isError={!stock.isValid}
            errorMsg={stock.message}
            styles={styles.dropdownStyle}
          />
          <UI.DropDown
            data={userData.map(value => {
              return {
                label: value.firstName + ' ' + value.lastName,
                value: value._id,
              };
            })}
            onChange={(value: any) =>
              inputChangedHandler('createdBy', value.value)
            }
            placeholder={'Select Owner*'}
            value={createdBy.value}
            isError={!createdBy.isValid}
            errorMsg={createdBy.message}
            styles={styles.dropdownStyle}
          />
          <View style={styles.btnContainer}>
            <UI.Btn
              onPressBtn={checkValidation}
              disabledBtn={userDataLoader || isLoader}>
              Add
            </UI.Btn>
          </View>
        </View>
      </ScrollView>
      <UI.Toast
        message={errorMessage}
        visible={showError}
        onDismissSnackBar={() => {
          setShowError(false), dispatchAddInventory(clearAddInventoryData());
        }}
      />
    </View>
  );
}

export default AddInventory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  subContainer: {
    maxWidth: 600,
    alignSelf: 'center',
    flex: 1,
  },
  btnContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  headerContainer: {
    marginVertical: rMS(40),
    alignItems: 'center',
  },
  headerText: {
    fontSize: rMS(21),
    fontWeight: '600',
    color: colors.fontDark,
  },
  dropdownStyle: {
    ...Platform.select({
      ios: {
        paddingLeft: rMS(13),
      },
      android: {
        paddingLeft: rMS(15),
      },
    }),
  },
});
