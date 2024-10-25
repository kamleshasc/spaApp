import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {statusData} from '../../config/data';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {ImagePickerResponseObject} from '../../components/UI/CustomModalImagePicker';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {uploadServiceImg} from '../../redux/Action/serviceAction';
import {DateFormateMMMMDDYYY} from '../../config/helper';
import {rMS} from '../../config/responsive';
import {
  fetchAddCustomer,
  fetchGetCustomer,
} from '../../redux/Action/customerAction';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {signUpOtp} from '../../redux/Action/otpAction';

interface objValues {
  value: any;
  isValid: boolean;
  message: any;
}

export interface customerInputsTypes {
  firstName: objValues;
  lastName: objValues;
  email: objValues;
  otp: objValues;
  mobileNumber: objValues;
  dateOfjoining: objValues;
  status: objValues;
  userImage: objValues;
  password: objValues;
}

export const initalCutomerInput: customerInputsTypes = {
  firstName: {value: '', isValid: true, message: ''},
  lastName: {value: '', isValid: true, message: ''},
  email: {value: '', isValid: true, message: ''},
  otp: {value: '', isValid: true, message: ''},
  mobileNumber: {value: '', isValid: true, message: ''},
  dateOfjoining: {value: '', isValid: true, message: ''},
  status: {value: '', isValid: true, message: ''},
  userImage: {value: '', isValid: true, message: ''},
  password: {value: '', isValid: true, message: ''},
};

type addCustomerProp = NativeStackScreenProps<
  RootStackParamList,
  'AddCustomer'
>;

function AddCustomer({navigation}: addCustomerProp) {
  const [inputs, setInputs] =
    React.useState<customerInputsTypes>(initalCutomerInput);

  const [showCameraOptions, setShowCameraOptions] =
    React.useState<boolean>(false);
  const [messageStatus, setMessageStatus] = React.useState<boolean>(false);
  const [otpSuccessStatus, setOtpSuccessStatus] =
    React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const dispatchAddCustomer = useAppDispatch();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showDate, setShowDate] = React.useState(false);
  const {isLoading: otpStatus} = useAppSelector(state => state.otp.signUpOtp);
  const {isLoader: addCustomerStatus} = useAppSelector(
    state => state.customer.addCustomer,
  );
  const reg =
    /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|international|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  let numbers = /^\d+$/;

  const {
    email,
    otp,
    dateOfjoining,
    firstName,
    lastName,
    mobileNumber,
    status,
    userImage,
    password,
  } = inputs;

  function inputChangedHandler(inputIdentifier: any, enteredValue: any): void {
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
  }

  const uploadService = async (image: any) => {
    try {
      let formData = new FormData();
      formData.append('file', {
        uri:
          Platform.OS === 'android'
            ? image.uri
            : image.uri.replace('file://', ''),
        name: image.fileName,
        type: image.type,
      });
      let result: any = await dispatchAddCustomer(
        uploadServiceImg(formData),
      ).unwrap();
      inputChangedHandler('userImage', result?.data || '');
    } catch (error) {
      setMessageStatus(true);
      setErrorMessage(error);
    }
  };

  const handleImagePickerResponse = (res: ImagePickerResponseObject) => {
    if (!res.errorStatus) {
      uploadService(res.data);
    } else {
      setMessageStatus(res.errorStatus);
      setErrorMessage(res.errorMsg);
    }
  };

  // const onChangeStatus = (value: {value: any}) => {
  //   inputChangedHandler('status', value.value);
  // };

  const handleDateChange = (value: Date) => {
    setShowDate(false);
    if (value) {
      setSelectedDate(value);
      inputChangedHandler('dateOfjoining', value);
    }
  };

  const addCustomer = async () => {
    try {
      let payload = {
        firstName: firstName.value,
        lastName: lastName.value,
        dateOfjoining: dateOfjoining.value,
        email: email.value,
        status: status.value,
        userImage: userImage.value,
        mobileNumber: mobileNumber.value,
        password: password.value,
        otp: otp.value,
      };
      await dispatchAddCustomer(fetchAddCustomer(payload)).unwrap();
      dispatchAddCustomer(fetchGetCustomer());
      navigation.goBack();
    } catch (error) {
      setMessageStatus(true);
      setErrorMessage(error);
    }
  };

  const checkValidation = () => {
    let firstnameIsValid = true;
    let firstnameIsValidMsg = '';
    let lastnameIsValid = true;
    let lastnameMessage = '';
    let emailIsValid = true;
    let emailMessage = '';
    let mobilenoIsValid = true;
    let mobilenoMessage = '';
    // let DOJIsValid = true;
    // let DOJMessage = '';
    // let statusIsValid = true;
    // let statusMessage = '';
    let passwordIsValid = true;
    let passwordMessage = '';
    let otpIsValid = true;
    let otpMessage = '';

    if (firstName.value.trim().length <= 0) {
      firstnameIsValid = false;
      firstnameIsValidMsg = 'First Name is required.';
    }
    if (lastName.value.trim().length <= 0) {
      lastnameIsValid = false;
      lastnameMessage = 'Last Name is required.';
    }

    if (email.value.trim().length <= 0) {
      emailMessage = 'Email Is Required.';
      emailIsValid = false;
    } else if (email.value.trim().length > 0 && !reg.test(email.value)) {
      emailMessage = 'Invalid Email.';
      emailIsValid = false;
    }

    // if (String(dateOfjoining.value).trim().length <= 0) {
    //   DOJIsValid = false;
    //   DOJMessage = 'Date of Joining is required.';
    // }

    if (
      mobileNumber.value.trim().length > 0 &&
      !numbers.test(mobileNumber.value)
    ) {
      mobilenoMessage = 'Mobile No. is invalid.';
      mobilenoIsValid = false;
    } else if (mobileNumber.value.trim().length <= 0) {
      mobilenoMessage = 'Mobile No. is required.';
      mobilenoIsValid = false;
    } else if (
      mobileNumber.value.trim().length > 10 ||
      mobileNumber.value.trim().length < 10
    ) {
      mobilenoMessage = 'Mobile No. must have 10 digits.';
      mobilenoIsValid = false;
    }

    if (password.value.trim().length <= 0) {
      passwordIsValid = false;
      passwordMessage = 'Password is required.';
    } else if (password.value.trim().length < 6) {
      passwordIsValid = false;
      passwordMessage = 'Password must have at least 6 characters';
    }

    if (otp.value.trim().length <= 0) {
      otpIsValid = false;
      otpMessage = 'OTP is required.';
    } else if (otp.value.trim().length < 6) {
      otpIsValid = false;
      otpMessage = 'OTP must have at least 6 characters.';
    }

    // if (status.value.trim().length <= 0) {
    //   statusIsValid = false;
    //   statusMessage = 'Status is required.';
    // }

    if (
      !firstnameIsValid ||
      !lastnameIsValid ||
      !emailIsValid ||
      !mobilenoIsValid ||
      // !DOJIsValid ||
      // !statusIsValid ||
      !passwordIsValid ||
      !otpIsValid
    ) {
      setInputs(curInputs => {
        return {
          ...curInputs,
          firstName: {
            message: firstnameIsValidMsg,
            value: curInputs.firstName.value,
            isValid: firstnameIsValid,
          },
          lastName: {
            message: lastnameMessage,
            value: curInputs.lastName.value,
            isValid: lastnameIsValid,
          },
          email: {
            message: emailMessage,
            value: curInputs.email.value,
            isValid: emailIsValid,
          },
          otp: {
            message: otpMessage,
            value: curInputs.otp.value,
            isValid: otpIsValid,
          },
          password: {
            message: passwordMessage,
            value: curInputs.password.value,
            isValid: passwordIsValid,
          },
          mobileNumber: {
            message: mobilenoMessage,
            value: curInputs.mobileNumber.value,
            isValid: mobilenoIsValid,
          },
          // dateOfjoining: {
          //   message: DOJMessage,
          //   value: curInputs.dateOfjoining.value,
          //   isValid: DOJIsValid,
          // },
          // status: {
          //   message: statusMessage,
          //   value: curInputs.status.value,
          //   isValid: statusIsValid,
          // },
        };
      });
      return;
    }
    addCustomer();
  };

  const emailOtpApi = async () => {
    try {
      const res = await dispatchAddCustomer(
        signUpOtp({email: email.value}),
      ).unwrap();
      if (res.success) {
        setMessageStatus(true);
        setOtpSuccessStatus(true);
        setErrorMessage(res?.message);
      }
    } catch (error) {
      setMessageStatus(true);
      setErrorMessage(error);
    }
  };

  const checkEmailValidation = () => {
    let emailIsValid = true;
    let emailMsg = '';

    if (email.value.trim().length <= 0) {
      emailIsValid = false;
      emailMsg = 'Email is required.';
    } else if (email.value.trim().length > 0 && !reg.test(email.value)) {
      emailMsg = 'Invalid Email.';
      emailIsValid = false;
    }

    if (!emailIsValid) {
      setInputs(curInputs => {
        return {
          ...curInputs,
          email: {
            message: emailMsg,
            value: curInputs.email.value,
            isValid: emailIsValid,
          },
        };
      });
      return;
    }
    emailOtpApi();
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.subContainer}>
          <View style={style.titleContainer}>
            <Text style={style.titleContent}>Add Customer</Text>
          </View>
          {showDate && (
            <UI.DatePick
              dateValue={selectedDate}
              handleCancelPressed={() => setShowDate(false)}
              handleOkayPressed={(value: Date) => handleDateChange(value)}
            />
          )}
          <UI.ImagePickerModal
            showModal={showCameraOptions}
            modalResponse={handleImagePickerResponse}
            onCloseModal={() => {
              setShowCameraOptions(false);
            }}
          />
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
              onChangeText: (value: any) => inputChangedHandler('email', value),
              value: email.value,
            }}
            iconPressed={checkEmailValidation}
            showText={true}
            isError={!email.isValid}
            errorMsg={email.message}
            disableText={otpStatus}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'OTP*',
              onChangeText: (value: any) => inputChangedHandler('otp', value),
              value: otp.value,
              keyboardType: 'decimal-pad',
              maxLength: 6,
            }}
            isError={!otp.isValid}
            errorMsg={otp.message}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'Phone*',
              onChangeText: (value: any) =>
                inputChangedHandler('mobileNumber', value),
              value: mobileNumber.value,
              keyboardType: 'decimal-pad',
              maxLength: 10,
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
            }}
            isError={!password.isValid}
            errorMsg={password.message}
          />
          {/* <UI.Input
            showIcon={true}
            disableInput={true}
            textInputConfig={{
              placeholder: 'Date of Joining*',
              value:
                String(dateOfjoining.value).length > 0
                  ? DateFormateMMMMDDYYY(dateOfjoining.value)
                  : '',
            }}
            isError={!dateOfjoining.isValid}
            errorMsg={dateOfjoining.message}
            iconPressed={() => setShowDate(true)}>
            <Icon name="calendar" size={30} color="black" />
          </UI.Input> */}

          <UI.Input
            showIcon={true}
            disableInput={true}
            textInputConfig={{
              value: userImage.value,
              placeholder: 'Upload Img',
            }}
            iconPressed={() => setShowCameraOptions(true)}>
            <Icon name="upload" size={30} color="black" />
          </UI.Input>

          {/* <UI.DropDown
            data={statusData}
            placeholder={'Status*'}
            value={status.value}
            isError={!status.isValid}
            errorMsg={status.message}
            onChange={onChangeStatus}
          /> */}
          <UI.Btn disabledBtn={addCustomerStatus} onPressBtn={checkValidation}>
            Add
          </UI.Btn>
        </View>
      </ScrollView>
      <UI.Toast
        Success={otpSuccessStatus}
        message={errorMessage}
        visible={messageStatus}
        onDismissSnackBar={() => {
          setMessageStatus(false), setOtpSuccessStatus(false);
        }}
      />
    </SafeAreaView>
  );
}

export default AddCustomer;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  subContainer: {
    alignSelf: 'center',
    maxWidth: 600,
    flex: 1,
    marginBottom: 30,
  },
  titleContainer: {
    marginVertical: rMS(40),
    alignItems: 'center',
  },
  titleContent: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.fontDark,
  },
});
