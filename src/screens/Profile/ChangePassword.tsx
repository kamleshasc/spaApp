import {SafeAreaView, StyleSheet, View} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {rMS} from '../../config/responsive';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {changePassword} from '../../redux/Action/authAction';

type ChangePasswordProp = NativeStackScreenProps<
  RootStackParamList,
  'ChangePassword'
>;

interface inputObj {
  value: any;
  isValid: boolean;
  message: string;
}

type inputType = {
  currentPassword: inputObj;
  newPassword: inputObj;
  confirmPassword: inputObj;
};

const initialState: inputType = {
  currentPassword: {value: '', isValid: true, message: ''},
  newPassword: {value: '', isValid: true, message: ''},
  confirmPassword: {value: '', isValid: true, message: ''},
};

function ChangePassword({navigation}: ChangePasswordProp) {
  const [inputs, setInputs] = React.useState(initialState);
  const {confirmPassword, currentPassword, newPassword} = inputs;
  const dispatchChangePassword = useAppDispatch();
  const [showError, setShowError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const {isLoader} = useAppSelector(state => state.auth.changePassword);

  const inputChangedHandler = (inputIdentifer: any, inputValue: any) => {
    setInputs(curr => {
      return {
        ...curr,
        [inputIdentifer]: {value: inputValue, isValid: true},
      };
    });
  };

  const changePasswordHandler = async () => {
    try {
      let payload = {
        oldPassword: currentPassword.value,
        newPassword: newPassword.value,
      };
      await dispatchChangePassword(changePassword(payload)).unwrap();
      navigation.goBack();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error);
    }
  };

  const checkValidation = () => {
    let currentPasswordIsValid = true;
    let currentPasswordMsg = '';
    let newPasswordIsValid = true;
    let newPasswordMsg = '';
    let confirmPasswordIsValid = true;
    let confirmPasswordMsg = '';

    if (currentPassword.value.trim().length <= 0) {
      currentPasswordIsValid = false;
      currentPasswordMsg = 'Current Password is required.';
    } else if (currentPassword.value.trim().length < 6) {
      currentPasswordIsValid = false;
      currentPasswordMsg = 'Password must have at least 6 characters';
    }
    if (newPassword.value.trim().length <= 0) {
      newPasswordIsValid = false;
      newPasswordMsg = 'New Password is required.';
    } else if (newPassword.value.trim().length < 6) {
      newPasswordIsValid = false;
      newPasswordMsg = 'Password must have at least 6 characters';
    }

    if (confirmPassword.value.trim().length <= 0) {
      confirmPasswordIsValid = false;
      confirmPasswordMsg = 'Confirm Password is required.';
    } else if (confirmPassword.value.trim().length < 6) {
      confirmPasswordIsValid = false;
      confirmPasswordMsg = 'Password must have at least 6 characters';
    } else if (confirmPassword.value !== newPassword.value) {
      confirmPasswordIsValid = false;
      confirmPasswordMsg = 'Password does not match';
    }

    if (
      !currentPasswordIsValid ||
      !newPasswordIsValid ||
      !confirmPasswordIsValid
    ) {
      setInputs(curInputs => {
        return {
          ...curInputs,
          currentPassword: {
            message: currentPasswordMsg,
            value: curInputs.currentPassword.value,
            isValid: currentPasswordIsValid,
          },
          newPassword: {
            message: newPasswordMsg,
            value: curInputs.newPassword.value,
            isValid: newPasswordIsValid,
          },
          confirmPassword: {
            message: confirmPasswordMsg,
            value: curInputs.confirmPassword.value,
            isValid: confirmPasswordIsValid,
          },
        };
      });
      return;
    }
    changePasswordHandler();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.root}>
        <UI.Header
          headerName={'Change Password'}
          onPress={() => navigation.goBack()}
          showHeaderName={true}
        />
        <View style={styles.contentContainer}>
          <UI.Input
            textInputConfig={{
              placeholder: 'Current Password*',
              onChangeText: (value: any) =>
                inputChangedHandler('currentPassword', value),
              value: currentPassword.value,
            }}
            isError={!currentPassword.isValid}
            errorMsg={currentPassword.message}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'New Password*',
              onChangeText: (value: any) =>
                inputChangedHandler('newPassword', value),
              value: newPassword.value,
            }}
            isError={!newPassword.isValid}
            errorMsg={newPassword.message}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'Confirm Password*',
              onChangeText: (value: any) =>
                inputChangedHandler('confirmPassword', value),
              value: confirmPassword.value,
            }}
            isError={!confirmPassword.isValid}
            errorMsg={confirmPassword.message}
          />
          <UI.Btn
            onPressBtn={checkValidation}
            styles={styles.btn}
            disabledBtn={isLoader}>
            Save
          </UI.Btn>
        </View>
        <UI.Toast
          message={errorMessage}
          visible={showError}
          onDismissSnackBar={() => setShowError(false)}
        />
      </View>
    </SafeAreaView>
  );
}

export default ChangePassword;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  contentContainer: {
    maxWidth: 600,
    flex: 1,
    alignSelf: 'center',
    paddingTop: rMS(25),
  },
  btn: {
    marginTop: rMS(20),
  },
});
