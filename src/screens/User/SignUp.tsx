import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {rMS} from '../../config/responsive';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../navigation/RootNavigation';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchAddCustomer} from '../../redux/Action/customerAction';

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
interface objValues {
  value: any;
  isValid: boolean;
  message: any;
}

interface signUpInputsTypes {
  firstName: objValues;
  lastName: objValues;
  email: objValues;
  mobileNumber: objValues;
  password: objValues;
  confirmPassword: objValues;
}

const initalSignUpInputs: signUpInputsTypes = {
  firstName: {value: '', isValid: true, message: ''},
  lastName: {value: '', isValid: true, message: ''},
  email: {value: '', isValid: true, message: ''},
  mobileNumber: {value: '', isValid: true, message: ''},
  password: {value: '', isValid: true, message: ''},
  confirmPassword: {value: '', isValid: true, message: ''},
};

function SignUp({navigation}: SignUpProps) {
  const [inputs, setInputs] =
    React.useState<signUpInputsTypes>(initalSignUpInputs);
  const {firstName, lastName, email, password, confirmPassword, mobileNumber} =
    inputs;
  const reg =
    /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|international|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  let numbers = /^\d+$/;
  const dispatchSignUp = useAppDispatch();
  const [messageStatus, setMessageStatus] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const {isLoader} = useAppSelector(state => state.customer.addCustomer);

  const signUp = () => {
    navigation.goBack();
  };

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

  const createUserApi = async () => {
    try {
      let payload = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        mobileNumber: mobileNumber.value,
        password: password.value,
      };
      await dispatchSignUp(fetchAddCustomer(payload)).unwrap();
      navigation.goBack();
    } catch (error) {
      setMessageStatus(true);
      setErrorMessage(error);
    }
  };

  const checkValidation = () => {
    let firstNameIsValid = true;
    let firstNameMsg = '';
    let lastNameIsValid = true;
    let lastNameMsg = '';
    let emailIsValid = true;
    let emailMsg = '';
    let mobileNumberIsValid = true;
    let mobileNumberMsg = '';
    let passwordIsValid = true;
    let passwordMsg = '';
    let confirmPasswordIsValid = true;
    let confirmPasswordMsg = '';

    if (firstName.value.trim().length <= 0) {
      firstNameIsValid = false;
      firstNameMsg = 'First Name is required.';
    }

    if (lastName.value.trim().length <= 0) {
      lastNameIsValid = false;
      lastNameMsg = 'Last Name is required.';
    }

    if (email.value.trim().length <= 0) {
      emailIsValid = false;
      emailMsg = 'Email is required.';
    } else if (email.value.trim().length > 0 && !reg.test(email.value)) {
      emailMsg = 'Invalid Email.';
      emailIsValid = false;
    }

    if (
      mobileNumber.value.trim().length > 0 &&
      !numbers.test(mobileNumber.value)
    ) {
      mobileNumberMsg = 'Phone No. is invalid.';
      mobileNumberIsValid = false;
    } else if (mobileNumber.value.trim().length <= 0) {
      mobileNumberIsValid = false;
      mobileNumberMsg = 'Phone No. is required.';
    } else if (mobileNumber.value.trim().length < 10) {
      mobileNumberMsg = 'Phone No. must have 10 digits.';
      mobileNumberIsValid = false;
    }

    if (password.value.trim().length <= 0) {
      passwordIsValid = false;
      passwordMsg = 'Password is required.';
    } else if (password.value.trim().length < 6) {
      passwordIsValid = false;
      passwordMsg = 'Password must have at least 6 characters.';
    }

    if (confirmPassword.value.trim().length <= 0) {
      confirmPasswordIsValid = false;
      confirmPasswordMsg = 'Confirm Password is required.';
    } else if (confirmPassword.value.trim().length < 6) {
      confirmPasswordIsValid = false;
      confirmPasswordMsg = 'Confirm Password must have at least 6 characters.';
    } else if (password.value.trim() != confirmPassword.value.trim()) {
      confirmPasswordIsValid = false;
      confirmPasswordMsg = 'Confirm Password not matched.';
    }

    if (
      !firstNameIsValid ||
      !lastNameIsValid ||
      !emailIsValid ||
      !mobileNumberIsValid ||
      !passwordIsValid ||
      !confirmPasswordIsValid
    ) {
      setInputs(curInputs => {
        return {
          ...curInputs,
          firstName: {
            message: firstNameMsg,
            value: curInputs.firstName.value,
            isValid: firstNameIsValid,
          },
          lastName: {
            message: lastNameMsg,
            value: curInputs.lastName.value,
            isValid: lastNameIsValid,
          },
          email: {
            message: emailMsg,
            value: curInputs.email.value,
            isValid: emailIsValid,
          },
          mobileNumber: {
            message: mobileNumberMsg,
            value: curInputs.mobileNumber.value,
            isValid: mobileNumberIsValid,
          },
          password: {
            message: passwordMsg,
            value: curInputs.password.value,
            isValid: passwordIsValid,
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
    createUserApi();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.fullScreen}>
        <ScrollView>
          <UI.Header onPress={signUp} />
          <View style={styles.content}>
            <View
              style={{
                marginLeft: rMS(21),
                marginBottom: rMS(40),
                maxWidth: 340,
              }}>
              <Text
                style={{
                  fontSize: rMS(25),
                  color: colors.fontDark,
                  fontWeight: '600',
                }}>
                Create New Account
              </Text>
              <Text
                style={{
                  fontSize: rMS(12),
                  fontWeight: '500',
                  color: colors.fontDarkGrey,
                  marginTop: 12,
                }}>
                Please Type full information below and we can create your
                Account
              </Text>
            </View>
            <UI.Input
              textInputConfig={{
                placeholder: 'First Name*',
                onChangeText: (value: any) =>
                  inputChangedHandler('firstName', value),
                value: firstName.value,
              }}
              isError={!firstName.isValid}
              errorMsg={firstName.message}
            />
            <UI.Input
              textInputConfig={{
                placeholder: 'Last Name*',
                onChangeText: (value: any) =>
                  inputChangedHandler('lastName', value),
                value: lastName.value,
              }}
              isError={!lastName.isValid}
              errorMsg={lastName.message}
            />
            <UI.Input
              textInputConfig={{
                placeholder: 'Email*',
                onChangeText: (value: any) =>
                  inputChangedHandler('email', value),
                value: email.value,
              }}
              isError={!email.isValid}
              errorMsg={email.message}
            />
            <UI.Input
              textInputConfig={{
                placeholder: 'Phone No*',
                onChangeText: (value: any) =>
                  inputChangedHandler('mobileNumber', value),
                value: mobileNumber.value,
                maxLength: 10,
                keyboardType: 'decimal-pad',
              }}
              isError={!mobileNumber.isValid}
              errorMsg={mobileNumber.message}
            />
            <UI.Input
              textInputConfig={{
                placeholder: 'Password*',
                onChangeText: (value: any) =>
                  inputChangedHandler('password', value),
                value: password.value,
                secureTextEntry: true,
              }}
              isError={!password.isValid}
              errorMsg={password.message}
            />
            <UI.Input
              textInputConfig={{
                placeholder: 'Confirm Password*',
                onChangeText: (value: any) =>
                  inputChangedHandler('confirmPassword', value),
                value: confirmPassword.value,
                secureTextEntry: true,
              }}
              isError={!confirmPassword.isValid}
              errorMsg={confirmPassword.message}
            />
            <UI.Btn
              onPressBtn={checkValidation}
              styles={{marginTop: rMS(14)}}
              disabledBtn={isLoader}>
              Sign Up
            </UI.Btn>
            {/* <View> */}
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: rMS(12),
                  color: colors.fontDarkGrey,
                  fontWeight: '400',
                }}>
                By Continuning Sign Up agree to the following
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={{marginRight: 5}}>
                  <Text
                    style={{
                      fontSize: rMS(12),
                      color: colors.fontDark,
                      fontWeight: '500',
                    }}>
                    Terms & Conditons
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: rMS(12),
                    color: colors.fontDarkGrey,
                    fontWeight: '400',
                  }}>
                  without Reservation.
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: rMS(20),
                }}>
                <Text
                  style={{
                    fontSize: rMS(13),
                    color: colors.fontDarkGrey,
                    fontWeight: '400',
                  }}>
                  Already have an account?
                </Text>
                <TouchableOpacity style={{marginLeft: 5}} onPress={signUp}>
                  <Text
                    style={{
                      fontSize: rMS(13),
                      fontWeight: '500',
                      color: '#FBBB00',
                      textDecorationLine: 'underline',
                    }}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* </View> */}
          </View>
        </ScrollView>
        <UI.Toast
          message={errorMessage}
          visible={messageStatus}
          onDismissSnackBar={() => setMessageStatus(false)}
        />
      </View>
    </SafeAreaView>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  fullScreen: {
    flex: 1,
    // alignSelf: 'center',
    // maxWidth: 600,
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    maxWidth: 600,
    marginTop: rMS(15),
  },
});
