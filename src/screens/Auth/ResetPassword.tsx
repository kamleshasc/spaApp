import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {rMS} from '../../config/responsive';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {resetPassword} from '../../redux/Action/authAction';

type ResetPasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ResetPassword'
>;

interface inputObj {
  value: string;
  isValid: boolean;
  message: string;
}

interface inputs {
  password: inputObj;
  confirmPassword: inputObj;
}

const initialnputs: inputs = {
  password: {value: '', isValid: true, message: ''},
  confirmPassword: {value: '', isValid: true, message: ''},
};

function ResetPassword({navigation, route}: ResetPasswordProps) {
  const {userId} = route.params;
  const [inputs, setInputs] = React.useState(initialnputs);
  const {confirmPassword, password} = inputs;
  const dispatchResetPassword = useAppDispatch();
  const [message, setMessage] = React.useState<any>('');
  const [messageStatus, setMessageStatus] = React.useState<boolean>(false);
  const {isLoader} = useAppSelector(state => state.auth.resetPassword);

  const inputChangedHandler = (inputIdentifier: any, inputValue: any) => {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [inputIdentifier]: {
          value: inputValue,
          isValid: true,
          message: '',
        },
      };
    });
  };

  const handleResetPassword = async () => {
    try {
      let body = {
        password: password?.value,
      };
      await dispatchResetPassword(resetPassword({id: userId, body})).unwrap();
      navigation.navigate('Login');
    } catch (error) {
      setMessageStatus(true);
      setMessage(error);
    }
  };

  const checkValidation = () => {
    let passwordIsValid = true;
    let passwordMsg = '';
    let confirmPasswordIsValid = true;
    let confirmPasswordMsg = '';

    if (password?.value?.trim()?.length <= 0) {
      passwordIsValid = false;
      passwordMsg = 'Password is required.';
    } else if (password?.value?.trim()?.length < 6) {
      passwordIsValid = false;
      passwordMsg = 'Password must be at least 6 characters long.';
    }
    if (confirmPassword?.value?.trim()?.length <= 0) {
      confirmPasswordIsValid = false;
      confirmPasswordMsg = 'Confirm Password is required.';
    } else if (confirmPassword?.value?.trim()?.length < 6) {
      confirmPasswordIsValid = false;
      confirmPasswordMsg = 'Password must be at least 6 characters long.';
    } else if (confirmPassword?.value !== password?.value) {
      confirmPasswordIsValid = false;
      confirmPasswordMsg = 'Password does not match.';
    }

    if (!passwordIsValid || !confirmPasswordIsValid) {
      setInputs(curInputs => {
        return {
          ...curInputs,
          password: {
            ...curInputs.password,
            isValid: passwordIsValid,
            message: passwordMsg,
          },
          confirmPassword: {
            ...curInputs.confirmPassword,
            isValid: confirmPasswordIsValid,
            message: confirmPasswordMsg,
          },
        };
      });
      return;
    }
    handleResetPassword();
  };

  return (
    <SafeAreaView style={styles.root}>
      <UI.Header
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Reset Password</Text>
          <Text style={styles.titleSubText}>
            Please Type full information below to reset your password.
          </Text>
        </View>
        <UI.Input
          textInputConfig={{
            placeholder: 'Password*',
            onChangeText: (value: any) =>
              inputChangedHandler('password', value),
            value: password?.value,
          }}
          isError={!password?.isValid}
          errorMsg={password?.message}
        />
        <UI.Input
          textInputConfig={{
            placeholder: 'Confirm Password*',
            onChangeText: (value: any) =>
              inputChangedHandler('confirmPassword', value),
            value: confirmPassword?.value,
          }}
          isError={!confirmPassword?.isValid}
          errorMsg={confirmPassword?.message}
        />
        <UI.Btn disabledBtn={isLoader} onPressBtn={checkValidation}>
          Change
        </UI.Btn>
      </View>
      <UI.Toast
        visible={messageStatus}
        message={message}
        onDismissSnackBar={() => setMessageStatus(false)}
      />
    </SafeAreaView>
  );
}

export default ResetPassword;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    maxWidth: 600,
    marginTop: rMS(15),
  },
  titleContainer: {
    marginLeft: rMS(21),
    marginBottom: rMS(40),
    maxWidth: 340,
  },
  titleText: {
    fontSize: rMS(25),
    color: colors.fontDark,
    fontWeight: '600',
  },
  titleSubText: {
    fontSize: rMS(12),
    fontWeight: '500',
    color: colors.fontDarkGrey,
    marginTop: 12,
  },
});
