import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {criteriaData} from '../../config/data';
import {CommissionInputs, initialInputs} from './AddCommission';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchGetUser} from '../../redux/Action/userAction';
import {rMS} from '../../config/responsive';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {
  fetchCommissionRules,
  fetchUpdateCommissionRules,
} from '../../redux/Action/commissionRuleAction';

type EditCommissionProps = StackScreenProps<
  RootStackParamList,
  'EditCommissionRule'
>;

function EditCommission({navigation, route}: EditCommissionProps) {
  const commissionData = route.params?.commissionRule || {};
  const [inputs, setInputs] = React.useState<CommissionInputs>(initialInputs);
  const [showError, setShowError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const dispatchEditCommission = useAppDispatch();
  const {data: userData, isLoader: userLoader} = useAppSelector(
    state => state.user.getUser,
  );
  const {errorMsg, isError, isLoader} = useAppSelector(
    state => state.commissionRule.updateCommission,
  );
  const {name, criteria, applicableUser, value, updatedBy} = inputs;
  const keyFields = ['name', 'criteria', 'applicableUser', 'value'];

  const fetchCommission = (commission: any) => {
    const keys = Object.keys(commission).filter(
      currValue => keyFields.indexOf(currValue) > -1,
    );
    for (let key of keys) {
      if (key == 'value') {
        inputChangedHandler(key, String(commission[key]) || '');
      } else if (key == 'applicableUser') {
        let users = commission[key].map((x: any) => x._id);
        inputChangedHandler(key, users);
      } else {
        inputChangedHandler(key, commission[key] || '');
      }
    }
  };

  React.useEffect(() => {
    fetchCommission(commissionData);
    dispatchEditCommission(fetchGetUser());
  }, []);

  React.useEffect(() => {
    if (!showError && isError) {
      setShowError(isError);
      setErrorMessage(errorMsg);
    }
  }, [isLoader]);

  const inputChangedHandler = (inputIdentifier: any, enteredValue: any) => {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  };

  const saveCommissionRule = async () => {
    try {
      let commissionId = commissionData._id;
      let payload = {
        name: name.value,
        criteria: criteria.value,
        applicableUser: applicableUser.value,
        value: value.value,
        updatedBy: updatedBy?.value,
      };

      await dispatchEditCommission(
        fetchUpdateCommissionRules({commissionId, payload}),
      ).unwrap();
      dispatchEditCommission(fetchCommissionRules());
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
    let updatedByIsValid = true;
    let updatedByMsg = '';

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

    if (updatedBy?.value.trim().length <= 0) {
      updatedByIsValid = false;
      updatedByMsg = 'Current user is required.';
    }

    if (
      !nameIsValid ||
      !criteriaIsValid ||
      !applicableUserIsValid ||
      !valueIsValid ||
      !updatedByIsValid
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
          updatedBy: {
            isValid: updatedByIsValid,
            value: curInput.updatedBy?.value,
            message: updatedByMsg,
          },
        };
      });
      return;
    }
    saveCommissionRule();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Edit Commission Rule</Text>
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
            placeholder={'Current User*'}
            value={updatedBy?.value}
            isError={!updatedBy?.isValid}
            errorMsg={updatedBy?.message}
            onChange={value => inputChangedHandler('updatedBy', value.value)}
          />

          <View style={styles.btnContainer}>
            <UI.Btn disabledBtn={userLoader} onPressBtn={checkValidation}>
              Save
            </UI.Btn>
          </View>
        </View>
      </ScrollView>
      <UI.Toast
        visible={showError}
        message={errorMessage}
        onDismissSnackBar={() => setShowError(false)}
      />
    </SafeAreaView>
  );
}

export default EditCommission;
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
    fontSize: 22,
    fontWeight: '600',
    color: colors.fontDark,
  },
});
