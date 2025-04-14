import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {rMS} from '../../config/responsive';
import useDimensionListener from '../../hooks/useDimensionListener';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {
  fetchUpdateUser,
  getUserById,
  uploadImg,
} from '../../redux/Action/userAction';
import {clearGetUserByIdErrorMsg} from '../../redux/Reducer/userReducer/getUserByIdSlice';
import {IMAGE_URL} from '@env';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userDetails} from '../../redux/Action/authAction';

type EditProfileProp = NativeStackScreenProps<
  RootStackParamList,
  'EditProfile'
>;
type inputObj = {
  value: any;
  isValid: boolean;
  message: string;
};

type editProfileType = {
  firstName: inputObj;
  lastName: inputObj;
  email: inputObj;
  mobileNumber: inputObj;
  userImage: inputObj;
};

const initalEditInput: editProfileType = {
  firstName: {value: '', isValid: true, message: ''},
  lastName: {value: '', isValid: true, message: ''},
  email: {value: '', isValid: true, message: ''},
  mobileNumber: {value: '', isValid: true, message: ''},
  userImage: {value: '', isValid: true, message: ''},
};

function EditProfile({navigation, route}: EditProfileProp) {
  const {userId} = route.params;
  const {width: screenWidth} = useDimensionListener().screen;
  const disPatchEditProfile = useAppDispatch();
  const {isLoader: userStatus} = useAppSelector(
    state => state.user.getUserById,
  );
  const {isLoader: updateStatus} = useAppSelector(
    state => state.user.updateUser,
  );
  const [msgStatus, setMsgStatus] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<any>('');
  const [inputs, setInputs] = React.useState(initalEditInput);

  const {email, firstName, lastName, mobileNumber, userImage} = inputs;
  const keyFields = ['firstName', 'lastName', 'phone', 'userImage', 'email'];
  const reg =
    /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|international|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  let numbers = /^\d+$/;

  const inputChangedHandler = (inputIdentifer: any, inputValue: any) => {
    setInputs(curr => {
      return {
        ...curr,
        [inputIdentifer]: {value: inputValue, isValid: true},
      };
    });
  };

  const fetchInputs = (user: any) => {
    let keys = Object.keys(user).filter(value => keyFields.indexOf(value) > -1);
    for (let key of keys) {
      inputChangedHandler(key, user[key] || '');
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await disPatchEditProfile(getUserById({userId})).unwrap();
      if (res) {
        fetchInputs(res);
      }
    } catch (error) {
      setMsgStatus(true);
    }
  };

  React.useEffect(() => {
    getUserDetails();
  }, []);

  const userUploadImg = async (value: any) => {
    try {
      console.log(value,'value ====== >')
      const formData = new FormData();
      formData.append('file', {
        uri:
          Platform.OS === 'android'
            ? value.uri
            : value.uri.replace('file://', ''),
        name: value?.fileName || 'photo.jpg',
        type: value?.type || 'image/jpeg',
      });
      let result: any = await disPatchEditProfile(uploadImg(formData)).unwrap();
      if (result && result?.data) {
        inputChangedHandler('userImage', result?.data || '');
      }
    } catch (error) {
      console.log(error,'errorr')
      setMsgStatus(true);
      // setMessage(error);
    }
  };

  const onImageGalleryClick = () => {
    try {
      let options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 1,
      };
      launchImageLibrary(options, (response: ImagePickerResponse) => {
        setMessage('');
        if (response.didCancel) {
          setMsgStatus(true);
          setMessage('Image Not Selected');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          setMsgStatus(true);
          setMessage('Camera Not Avaliable');
          return;
        } else if (response.errorCode == 'permission') {
          setMsgStatus(true);
          setMessage('This Application Needs Camera Permission');
          return;
        } else if (response.errorCode == 'others') {
          setMsgStatus(true);
          setMessage(response.errorMessage);
          return;
        }
        const responseResult = response.assets;

        if (!responseResult) {
          setMsgStatus(true);
          setMessage('Image is not supported.');
          return;
        }
        const file = responseResult['0'];

        if (
          file.type !== 'image/jpeg' &&
          file.type !== 'image/jpg' &&
          file.type !== 'image/png'
        ) {
          setMsgStatus(true);
          setMessage('Only .jpeg,.jpg and .png Format Are Supported ');
          return;
        }
        userUploadImg(file);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const clearErrorMsg = () => {
    setMsgStatus(false);
    setMessage('');
    disPatchEditProfile(clearGetUserByIdErrorMsg());
  };

  const updateUser = async () => {
    try {
      let payload: any = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        mobileNumber: mobileNumber.value,
        userImage: userImage.value,
      };

      let result = await disPatchEditProfile(
        fetchUpdateUser({userId, payload}),
      ).unwrap();

      if (result?.success && result?.data) {
        await AsyncStorage.setItem('userDetails', JSON.stringify(result?.data));
        disPatchEditProfile(userDetails());
        navigation.goBack();
      }
    } catch (error) {
      setMsgStatus(true);
      setMessage(error);
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

    if (firstName.value.trim().length <= 0) {
      firstnameIsValid = false;
      firstnameIsValidMsg = 'First Name is required.';
    }
    if (lastName.value.trim().length <= 0) {
      lastnameIsValid = false;
      lastnameMessage = 'Last Name is required.';
    }

    if (email.value.trim().length <= 0) {
      emailMessage = 'Email is required.';
      emailIsValid = false;
    } else if (email.value.trim().length > 0 && !reg.test(email.value)) {
      emailMessage = 'Invalid Email.';
      emailIsValid = false;
    }

    if (
      mobileNumber.value.trim().length > 0 &&
      !numbers.test(mobileNumber.value)
    ) {
      mobilenoMessage = 'Mobile No. is invalid.';
      mobilenoIsValid = false;
    } else if (
      mobileNumber.value.trim().length > 0 &&
      (mobileNumber.value.trim().length > 10 ||
        mobileNumber.value.trim().length < 10)
    ) {
      mobilenoMessage = 'Mobile No. must have 10 digits.';
      mobilenoIsValid = false;
    }

    if (
      !firstnameIsValid ||
      !lastnameIsValid ||
      !emailIsValid ||
      !mobilenoIsValid
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
        };
      });
      return;
    }
    updateUser();
  };
console.log(userImage.value,'userImage.value');

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.root}>
        <UI.Header
          onPress={() => navigation.goBack()}
          headerName={'Edit Profile'}
          showHeaderName={true}
        />
        <View style={styles.subRoot}>
          <View
            style={[styles.profileContainer, {borderRadius: screenWidth / 2}]}>
            <Image
              style={[
                styles.image,
                {
                  borderRadius: screenWidth / 2,
                },
              ]}
              source={
                userImage.value.length > 0
                  ? {uri: IMAGE_URL + userImage.value}
                  : require('../../assets/images/no_user.png')
              }
            />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={onImageGalleryClick}>
              <Image
                style={styles.image}
                source={require('../../assets/images/pencil-icon.png')}
                tintColor={colors.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
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
              disableInput={true}
              textInputConfig={{
                placeholder: 'Email',
                onChangeText: (value: any) =>
                  inputChangedHandler('email', value),
                value: email.value,
              }}
              isError={!email.isValid}
              errorMsg={email.message}
            />

            <UI.Input
              textInputConfig={{
                placeholder: 'Mobile No.',
                maxLength: 10,
                onChangeText: (value: any) =>
                  inputChangedHandler('mobileNumber', value),
                value: mobileNumber.value,
              }}
              isError={!mobileNumber.isValid}
              errorMsg={mobileNumber.message}
            />
            <UI.Btn
              disabledBtn={userStatus || updateStatus}
              styles={{marginTop: rMS(25)}}
              onPressBtn={checkValidation}>
              Save
            </UI.Btn>
          </View>
        </View>
        <UI.Toast
          message={message}
          visible={msgStatus}
          onDismissSnackBar={() => clearErrorMsg()}
        />
      </View>
    </SafeAreaView>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  subRoot: {
    flex: 1,
    alignSelf: 'center',
    maxWidth: 600,
    marginTop: rMS(15),
  },
  profileContainer: {
    height: rMS(100),
    width: rMS(100),
    marginVertical: rMS(20),
    backgroundColor: colors.primary,
    alignSelf: 'center',
    padding: 6,
    borderWidth: 2,
    borderColor: colors.themePrimary,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  editIconContainer: {
    borderRadius: 40,
    height: rMS(25),
    width: rMS(25),
    backgroundColor: colors.themePrimary,
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5,
  },
  inputContainer: {
    marginTop: rMS(25),
  },
});
