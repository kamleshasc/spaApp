import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {rMS, rV} from '../../config/responsive';
import {UI} from '../../components';
import {
  loadUserScreens,
  loginUser,
  userDetails,
} from '../../redux/Action/authAction';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {clearLoginErrorMessage} from '../../redux/Reducer/authReducer/loginSlice';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';

interface inputObjString {
  value: string;
  isValid: boolean;
  message: string;
}

interface loginInputs {
  email: inputObjString;
  password: inputObjString;
}

const initalInputs: loginInputs = {
  email: {value: '', isValid: true, message: ''},
  password: {value: '', isValid: true, message: ''},
};

type loginProps = CompositeScreenProps<
  StackScreenProps<RootStackParamList, 'Login'>,
  DrawerScreenProps<DrawerNavigationParamList>
>;

function Login({navigation}: loginProps) {
  const [inputs, setInputs] = React.useState<loginInputs>(initalInputs);
  const {width} = useWindowDimensions();
  const loginDispatch = useAppDispatch();
  const {errorMsg, isError, isLoader} = useAppSelector(
    state => state.auth.login,
  );
  const reg =
    /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|international|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

  const inputsHandler = (inputIdentifier: string, enteredValue: any) => {
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

  const handleLogin = async () => {
    try {
      let payload = {
        email: inputs.email.value,
        password: inputs.password.value,
      };
      const result: any = await loginDispatch(loginUser(payload)).unwrap();
      if (result.success) {
        loginDispatch(loadUserScreens());
        loginDispatch(userDetails());
        navigation.replace('DrawerNavigation');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const checkValidation = () => {
    let loginIsValid = true;
    let loginMsg = '';
    let passwordIsValid = true;
    let passwordMsg = '';
    if (inputs?.email?.value?.trim()?.length <= 0) {
      loginIsValid = false;
      loginMsg = 'Email ID is required.';
    } else if (
      inputs?.email?.value?.trim()?.length > 0 &&
      !reg.test(inputs?.email?.value)
    ) {
      loginIsValid = false;
      loginMsg = 'Invalid Email ID.';
    }

    if (inputs?.password?.value?.trim()?.length <= 0) {
      passwordIsValid = false;
      passwordMsg = 'Password is required.';
    } else if (inputs?.password?.value?.trim()?.length < 6) {
      passwordIsValid = false;
      passwordMsg = 'Password must have at least 6 characters';
    }

    if (!loginIsValid || !passwordIsValid) {
      setInputs(curInputs => {
        return {
          ...curInputs,
          email: {
            message: loginMsg,
            isValid: loginIsValid,
            value: curInputs.email.value,
          },
          password: {
            message: passwordMsg,
            isValid: passwordIsValid,
            value: curInputs.password.value,
          },
        };
      });
      return;
    }
    handleLogin();
  };

  const signUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground
            style={styles.imageBackground}
            source={require('../../assets/images/login.jpg')}>
            <View style={styles.imageOverlay} />
          </ImageBackground>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome Back.!</Text>
          <Text style={styles.loginText}>Login to your Account</Text>
          <View style={styles.inputContainer}>
            <UI.Input
              textInputConfig={{
                placeholder: 'Email ID*',
                value: inputs?.email?.value,
                onChangeText: value => inputsHandler('email', value),
              }}
              isError={!inputs?.email?.isValid}
              errorMsg={inputs?.email?.message}
            />
            <UI.Input
              textInputConfig={{
                placeholder: 'Password*',
                value: inputs?.password?.value,
                onChangeText: value => inputsHandler('password', value),
                secureTextEntry: true,
              }}
              isError={!inputs?.password?.isValid}
              errorMsg={inputs?.password?.message}
            />
            <UI.Btn
              disabledBtn={isLoader}
              onPressBtn={checkValidation}
              styles={[
                styles.loginButton,
                {paddingVertical: rMS(width > 500 ? 6 : 12)},
              ]}>
              Login
            </UI.Btn>
            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => navigation.navigate('Forgot')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
              <Text style={styles.noAccountText}>Don't have an account?</Text>
              <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
                <Text style={styles.signUpText}>Sign UP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <UI.Toast
          visible={isError}
          message={errorMsg}
          onDismissSnackBar={() => {
            loginDispatch(clearLoginErrorMessage());
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    flexDirection: 'row',
    flex: 0.6,
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottomRightRadius: rMS(160),
    overflow: 'hidden',
  },
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  imageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  contentContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: rMS(20),
    fontWeight: '600',
    color: colors.themePrimary,
    textAlign: 'center',
    marginTop: rV(20),
  },
  loginText: {
    fontSize: rMS(12),
    fontWeight: '500',
    color: colors.fontLightGrey,
    textAlign: 'center',
    alignSelf: 'center',
  },
  inputContainer: {
    maxWidth: 500,
    alignSelf: 'center',
    marginTop: rMS(30),
  },
  loginButton: {
    marginTop: 20,
    paddingVertical: rMS(12),
  },
  forgotPasswordButton: {
    alignSelf: 'center',
  },
  forgotPasswordText: {
    fontSize: rMS(13),
    fontWeight: '500',
    color: colors.fontDarkGrey,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: rMS(20),
  },
  noAccountText: {
    fontSize: rMS(13),
    color: colors.fontDarkGrey,
    fontWeight: '400',
  },
  signUpButton: {
    marginLeft: 5,
  },
  signUpText: {
    fontSize: rMS(13),
    fontWeight: '500',
    color: '#FBBB00',
    textDecorationLine: 'underline',
  },
});
