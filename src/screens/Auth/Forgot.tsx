import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {rMS} from '../../config/responsive';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {forgotPasswordOtp} from '../../redux/Action/otpAction';
import {verifyForgotOtp} from '../../redux/Action/authAction';
type forgotProps = NativeStackScreenProps<RootStackParamList, 'Forgot'>;

interface inputObj {
  value: string;
  isValid: boolean;
  message: string;
}

interface Inputs {
  email: inputObj;
  otp: inputObj;
}

const initalInputs: Inputs = {
  email: {value: '', isValid: true, message: ''},
  otp: {value: '', isValid: true, message: ''},
};

function Forgot({navigation}: forgotProps) {
  const [inputs, setInputs] = React.useState(initalInputs);
  const {email, otp} = inputs;
  const dispatchForgot = useAppDispatch();
  const {isLoading: forgotOtpStatus} = useAppSelector(
    state => state.otp.forgotOtp,
  );
  const {isLoader: verifyOtpStatus} = useAppSelector(
    state => state.auth.verifyForgotOtp,
  );
  const [messageStatus, setMessageStatus] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<any>('');
  const [otpSuccessStatus, setOtpSuccessStatus] =
    React.useState<boolean>(false);
  const [emailSentStatus, setEmailSentStatus] = React.useState<boolean>(false);
  let reg =
    /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|international|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

  const inputChangedHandler = (inputIdentifier: any, enteredValue: any) => {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true,
          message: '',
        },
      };
    });
  };

  const resetValues = () => {
    setInputs(initalInputs);
    setOtpSuccessStatus(false);
    setEmailSentStatus(false);
  };

  const verifyOtp = async () => {
    try {
      const res = await dispatchForgot(
        verifyForgotOtp({email: email.value, otp: otp.value}),
      ).unwrap();
      if (res?.success) {
        let userId = res?.data?.id;
        navigation.navigate('ResetPassword', {userId});
        resetValues();
      } else {
        setMessageStatus(true);
        setMessage(res?.message);
      }
    } catch (error) {
      console.log(error, 'errrr');

      setMessageStatus(true);
      setMessage(error);
    }
  };

  const checkValidation = () => {
    let emailIsValid = true;
    let emailMsg = '';
    let otpIsValid = true;
    let otpMsg = '';

    if (email?.value?.trim()?.length <= 0) {
      emailIsValid = false;
      emailMsg = 'Email is required.';
    } else if (email?.value?.trim()?.length > 0 && !reg.test(email.value)) {
      emailMsg = 'Invalid Email.';
      emailIsValid = false;
    }
    if (otp?.value?.trim()?.length <= 0) {
      otpIsValid = false;
      otpMsg = 'OTP is required.';
    } else if (otp?.value?.trim()?.length < 6) {
      otpIsValid = false;
      otpMsg = 'OTP must have at least 6 characters.';
    }
    if (!emailIsValid || !otpIsValid) {
      setInputs((prevInputs: any) => {
        return {
          ...prevInputs,
          email: {
            value: prevInputs.email.value,
            isValid: emailIsValid,
            message: emailMsg,
          },
          otp: {
            value: prevInputs.otp.value,
            isValid: otpIsValid,
            message: otpMsg,
          },
        };
      });
      return;
    }
    verifyOtp();
  };

  const forgotOtpApi = async () => {
    try {
      const res = await dispatchForgot(
        forgotPasswordOtp({email: email?.value}),
      ).unwrap();
      if (res?.success) {
        setMessageStatus(true);
        setOtpSuccessStatus(true);
        setEmailSentStatus(true);
        setMessage(res?.message);
      }
    } catch (error) {
      setMessageStatus(true);
      setMessage(error);
    }
  };

  const checkValidationEmail = () => {
    let emailIsValid = true;
    let emailMsg = '';
    if (email?.value?.trim()?.length <= 0) {
      emailIsValid = false;
      emailMsg = 'Email is required.';
    } else if (email?.value?.trim()?.length > 0 && !reg.test(email.value)) {
      emailMsg = 'Invalid Email.';
      emailIsValid = false;
    }
    if (!emailIsValid) {
      setInputs((prevInputs: any) => {
        return {
          ...prevInputs,
          email: {
            value: prevInputs.email.value,
            isValid: emailIsValid,
            message: emailMsg,
          },
        };
      });
      return;
    }
    forgotOtpApi();
  };

  return (
    <View style={styles.root}>
      <UI.Header
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Forgot Password</Text>
          <Text style={styles.titleSubText}>
            Please Enter your Email Address you will Receive a Code.
          </Text>
        </View>
        <UI.Input
          textInputConfig={{
            placeholder: 'Email*',
            onChangeText: (value: any) => inputChangedHandler('email', value),
            value: email?.value,
          }}
          iconPressed={checkValidationEmail}
          showText={true}
          disableText={forgotOtpStatus}
          isError={!email?.isValid}
          errorMsg={email?.message}
        />
        <UI.Input
          textInputConfig={{
            placeholder: 'OTP*',
            onChangeText: (value: any) => inputChangedHandler('otp', value),
            value: otp?.value,
            keyboardType: 'numeric',
            maxLength: 6,
          }}
          isError={!otp?.isValid}
          errorMsg={otp?.message}
        />

        <UI.Btn
          disabledBtn={verifyOtpStatus || !emailSentStatus}
          onPressBtn={checkValidation}>
          Verify
        </UI.Btn>
      </View>
      <UI.Toast
        visible={messageStatus}
        Success={otpSuccessStatus}
        message={message}
        onDismissSnackBar={() => {
          setMessageStatus(false), setOtpSuccessStatus(false);
        }}
      />
    </View>
  );
}

export default Forgot;
const styles = StyleSheet.create({
  root:{
    flex: 1, 
    backgroundColor: colors.primary
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
