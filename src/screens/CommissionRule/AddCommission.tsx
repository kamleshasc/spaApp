import React from 'react';
import {Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {criteriaData} from '../../config/data';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchGetUser} from '../../redux/Action/userAction';
import {rMS} from '../../config/responsive';
import {
  fetchAddCommissionRules,
  fetchCommissionRules,
} from '../../redux/Action/commissionRuleAction';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import useDeviceType from '../../hooks/useDeviceType';

interface objValues {
  value: any;
  isValid: boolean;
  message: any;
}

export interface CommissionInputs {
  name: objValues;
  criteria: objValues;
  applicableUser: objValues;
  value: objValues;
  createdBy?: objValues;
  updatedBy?: objValues;
}

export const initialInputs: CommissionInputs = {
  name: {value: '', isValid: true, message: ''},
  criteria: {value: '', isValid: true, message: ''},
  applicableUser: {value: [], isValid: true, message: ''},
  value: {value: '', isValid: true, message: ''},
  createdBy: {value: '', isValid: true, message: ''},
  updatedBy: {value: '', isValid: true, message: ''},
};

type addCommissionProp = StackScreenProps<
  RootStackParamList,
  'AddCommissionRule'
>;

function AddCommission({navigation}: addCommissionProp) {
  const [inputs, setInputs] = React.useState<CommissionInputs>(initialInputs);
  const [showError, setShowError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const dispatchAddCommission = useAppDispatch();
  const {data: userData, isLoader: userLoader} = useAppSelector(
    state => state.user.getUser,
  );
  const {errorMsg, isError, isLoader} = useAppSelector(
    state => state.commissionRule.addCommission,
  );
  const {isTablet} = useDeviceType();
  const marginTop = isTablet ? rMS(8) : rMS(5);

  React.useEffect(() => {
    dispatchAddCommission(fetchGetUser());
  }, []);

  React.useEffect(() => {
    if (!showError && isError) {
      setShowError(isError);
      setErrorMessage(errorMsg);
    }
  }, [isLoader]);

  const {name, criteria, applicableUser, createdBy, value} = inputs;

  const createCommissionRule = async () => {
    try {
      let body = {
        name: name.value,
        criteria: criteria.value,
        applicableUser: applicableUser.value,
        value: Number(value.value),
        createdBy: createdBy?.value || '',
      };
      await dispatchAddCommission(fetchAddCommissionRules(body)).unwrap();
      dispatchAddCommission(fetchCommissionRules());
      navigation.goBack();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error);
    }
  };

  const checkValidation = () => {
    let numbers = /^\d+(\.\d+)?$/;
    let nameIsValid = true;
    let nameMsg = '';
    let criteriaIsValid = true;
    let criteriaMsg = '';
    let applicableUserIsValid = true;
    let applicableUserMsg = '';
    let valueIsValid = true;
    let valueMsg = '';
    let createdByIsValid = true;
    let createdByMsg = '';

    if (name.value.trim().length <= 0) {
      nameIsValid = false;
      nameMsg = 'Name is required.';
    }

    if (criteria.value.trim().length <= 0) {
      criteriaIsValid = false;
      criteriaMsg = 'Criteria is required.';
    }

    if (applicableUser.value.length <= 0) {
      applicableUserIsValid = false;
      applicableUserMsg = 'User is required.';
    }

    if (value.value.trim().length > 0 && !numbers.test(value.value)) {
      valueIsValid = false;
      valueMsg = 'Please enter number or decimal only.';
    } else if (value.value.trim().length <= 0) {
      valueIsValid = false;
      valueMsg = 'Value is required.';
    }

    if (createdBy?.value.trim().length <= 0) {
      createdByIsValid = false;
      createdByMsg = 'Created By is required.';
    }

    if (
      !nameIsValid ||
      !criteriaIsValid ||
      !applicableUserIsValid ||
      !valueIsValid ||
      !createdByIsValid
    ) {
      setInputs(curInput => {
        return {
          name: {
            isValid: nameIsValid,
            value: curInput.name.value,
            message: nameMsg,
          },
          criteria: {
            isValid: criteriaIsValid,
            value: curInput.criteria.value,
            message: criteriaMsg,
          },
          applicableUser: {
            isValid: applicableUserIsValid,
            value: curInput.applicableUser.value,
            message: applicableUserMsg,
          },
          value: {
            isValid: valueIsValid,
            value: curInput.value.value,
            message: valueMsg,
          },
          createdBy: {
            isValid: createdByIsValid,
            value: curInput.createdBy?.value,
            message: createdByMsg,
          },
        };
      });
      return;
    }
    createCommissionRule();
  };

  const inputChangedHandler = (inputIdentifier: any, enteredValue: any) => {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Add Commission Rule</Text>
          </View>
          <UI.Input
            textInputConfig={{
              placeholder: 'Name*',
              value: name.value,
              onChangeText: (value: any) => inputChangedHandler('name', value),
            }}
            isError={!name.isValid}
            errorMsg={name.message}
          />

          <UI.DropDown
            data={criteriaData}
            onChange={(value: any) =>
              inputChangedHandler('criteria', value.value)
            }
            placeholder={'Select Criteria*'}
            value={criteria.value}
            isError={!criteria.isValid}
            errorMsg={criteria.message}
            styles={styles.dropdownStyle}
          />

          <UI.DropDownMultiSelect
            data={userData.map(value => {
              return {
                label: value.firstName + ' ' + value.lastName,
                value: value._id,
              };
            })}
            onChange={(value: any) =>
              inputChangedHandler('applicableUser', value)
            }
            placeholder={'Select Users*'}
            selected={applicableUser.value}
            isError={!applicableUser.isValid}
            errorMsg={applicableUser.message}
          />

          <UI.Input
            textInputConfig={{
              placeholder: 'Value*',
              value: value.value,
              keyboardType: 'number-pad',
              onChangeText: (value: any) => inputChangedHandler('value', value),
            }}
            stylesInput={[{marginTop}]} 
            isError={!value.isValid}
            errorMsg={value.message}
          />

          <UI.DropDown
            data={userData.map(value => {
              return {
                label: value.firstName + ' ' + value.lastName,
                value: value._id,
              };
            })}
            placeholder={'Created By*'}
            value={createdBy?.value}
            isError={!createdBy?.isValid}
            errorMsg={createdBy?.message}
            onChange={value => inputChangedHandler('createdBy', value.value)}
            styles={styles.dropdownStyle}
          />

          <View style={styles.btnContainer}>
            <UI.Btn
              disabledBtn={userLoader || isLoader}
              onPressBtn={checkValidation}>
              Add
            </UI.Btn>
          </View>
        </View>
      </ScrollView>
      <UI.Toast
        visible={showError}
        message={errorMessage}
        onDismissSnackBar={() => setShowError(false)}
      />
    </View>
  );
}

export default AddCommission;

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
