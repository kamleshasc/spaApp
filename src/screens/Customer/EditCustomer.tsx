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
import {rMS} from '../../config/responsive';
import Icon from 'react-native-vector-icons/AntDesign';
import {statusData} from '../../config/data';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../navigation/RootNavigation';
import React from 'react';
import {DateFormateMMMMDDYYY, DateToYYYYMMDD} from '../../config/helper';
import {ImagePickerResponseObject} from '../../components/UI/CustomModalImagePicker';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {uploadServiceImg} from '../../redux/Action/serviceAction';
import {
  fetchGetCustomer,
  fetchUpdateCustomer,
} from '../../redux/Action/customerAction';
import {customerInputsTypes, initalCutomerInput} from './AddCustomer';

type EditCustomerProp = NativeStackScreenProps<
  RootStackParamList,
  'EditCustomer'
>;

function EditCustomer({route, navigation}: EditCustomerProp) {
  const {customer} = route.params;
  const [inputs, setInputs] =
    React.useState<customerInputsTypes>(initalCutomerInput);
  const [showCameraOptions, setShowCameraOptions] =
    React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const editDispatch = useAppDispatch();
  const {isLoader} = useAppSelector(state => state.customer.editCustomer);
  const [showDate, setShowDate] = React.useState(false);
  const reg =
    /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|international|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  let numbers = /^\d+$/;
  const [messageStatus, setMessageStatus] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');

  const {
    dateOfjoining,
    email,
    firstName,
    lastName,
    mobileNumber,
    status,
    userImage,
  } = inputs;

  const fieldsKeys = [
    'firstName',
    'lastName',
    'email',
    'mobileNumber',
    'dateOfjoining',
    'status',
    'userImage',
  ];

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

  const checkValidation = () => {
    let firstnameIsValid = true;
    let firstnameIsValidMsg = '';
    let lastnameIsValid = true;
    let lastnameMessage = '';
    let emailIsValid = true;
    let emailMessage = '';
    let mobilenoIsValid = true;
    let mobilenoMessage = '';
    let DOJIsValid = true;
    let DOJMessage = '';
    let statusIsValid = true;
    let statusMessage = '';
    let passwordIsValid = true;
    let passwordMessage = '';

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

    if (dateOfjoining.value.trim().length <= 0) {
      DOJIsValid = false;
      DOJMessage = 'Date of Joining is required.';
    }

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

    if (status.value.trim().length <= 0) {
      statusIsValid = false;
      statusMessage = 'Status is required.';
    }

    if (
      !firstnameIsValid ||
      !lastnameIsValid ||
      !emailIsValid ||
      !mobilenoIsValid ||
      !DOJIsValid ||
      !statusIsValid ||
      !passwordIsValid
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
          mobileNumber: {
            message: mobilenoMessage,
            value: curInputs.mobileNumber.value,
            isValid: mobilenoIsValid,
          },
          dateOfjoining: {
            message: DOJMessage,
            value: curInputs.dateOfjoining.value,
            isValid: DOJIsValid,
          },
          status: {
            message: statusMessage,
            value: curInputs.status.value,
            isValid: statusIsValid,
          },
        };
      });
      return;
    }
    updateCutomer();
  };

  const fetchCustomerDetails = (customerDetails: any) => {
    let keys = Object.keys(customerDetails).filter(
      x => fieldsKeys.indexOf(x) > -1,
    );

    for (let key of keys) {
      inputChangedHandler(key, customerDetails[key] || '');
    }
  };

  const onChangeStatus = (value: {value: any}) => {
    inputChangedHandler('status', value.value);
  };

  React.useEffect(() => {
    fetchCustomerDetails(customer);
  }, []);

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
      let result: any = await editDispatch(uploadServiceImg(formData)).unwrap();
      console.log(result, '===result===');

      inputChangedHandler('userImage', result?.data || '');
    } catch (error) {
      console.log(error, 'uploading customerrrr');

      // setMessageStatus(true);
      // setErrorMessage(error);
    }
  };

  const updateCutomer = async () => {
    try {
      let customerId = customer._id;
      let payload = {
        firstName: firstName.value,
        lastName: lastName.value,
        dateOfjoining: dateOfjoining.value,
        email: email.value,
        status: status.value,
        userImage: userImage.value,
        mobileNumber: mobileNumber.value,
      };
      await editDispatch(fetchUpdateCustomer({customerId, payload})).unwrap();
      editDispatch(fetchGetCustomer());
      navigation.goBack();
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

  const handleDateChange = (value: Date) => {
    setShowDate(false);
    if (value) {
      setSelectedDate(value);
      inputChangedHandler('dateOfjoining', value);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.subContainer}>
          <View style={style.titleContainer}>
            <Text style={style.titleContent}>Edit Customer</Text>
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
              editable: false,
            }}
            isError={!email.isValid}
            errorMsg={email.message}
          />
          <UI.Input
            textInputConfig={{
              placeholder: 'Phone*',
              onChangeText: (value: any) =>
                inputChangedHandler('mobileNumber', value),
              value: mobileNumber.value,
              keyboardType: 'decimal-pad',
            }}
            isError={!mobileNumber.isValid}
            errorMsg={mobileNumber.message}
          />
          <UI.Input
            showIcon={true}
            disableInput={true}
            textInputConfig={{
              placeholder: 'Date of Joining*',
              value:
                dateOfjoining.value.length > 0
                  ? DateFormateMMMMDDYYY(dateOfjoining.value)
                  : '',
            }}
            isError={!dateOfjoining.isValid}
            errorMsg={dateOfjoining.message}
            iconPressed={() => setShowDate(true)}>
            <Icon name="calendar" size={30} color="black" />
          </UI.Input>

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

          <UI.DropDown
            data={statusData}
            placeholder={'Status*'}
            value={status.value}
            isError={!status.isValid}
            errorMsg={status.message}
            onChange={onChangeStatus}
          />
          <UI.Btn disabledBtn={isLoader} onPressBtn={checkValidation}>
            Save
          </UI.Btn>
        </View>
        <UI.Toast
          message={errorMessage}
          visible={messageStatus}
          onDismissSnackBar={() => setErrorMessage(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditCustomer;

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
