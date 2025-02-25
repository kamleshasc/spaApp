import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {rMS} from '../../config/responsive';
import {SCREEN, UI} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchGetUser} from '../../redux/Action/userAction';
import {RootState} from '../../redux/store';
import {
  fetchAddService,
  fetchService,
  uploadServiceImg,
} from '../../redux/Action/serviceAction';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {
  branchData,
  categoryData,
  siteData,
  statusData,
} from '../../config/data';
import Icon from 'react-native-vector-icons/AntDesign';
import {ImagePickerResponseObject} from '../../components/UI/CustomModalImagePicker';

export interface singleObjString {
  value: string;
  isValid: boolean;
  message: string;
}
export interface singleObjNumber {
  value: any;
  isValid: boolean;
  message: string;
}
export interface arrayString {
  value: string[];
  isValid: boolean;
  message: string;
}
type serviceItem = {
  name: string;
  price: number;
  duration: string;
};
export interface arrayService {
  value: serviceItem[];
  isValid: boolean;
  message: string;
}
export interface serviceInput {
  serviceName: singleObjString;
  subService: arrayService;
  category: singleObjString;
  selectedBranches: arrayString;
  selectedUsers: arrayString;
  serviceImage: singleObjString;
  createdBy: singleObjString;
}
export const initialInputs: serviceInput = {
  serviceName: {value: '', isValid: true, message: ''},
  subService: {value: [], isValid: true, message: ''},
  category: {value: '', isValid: true, message: ''},
  selectedBranches: {value: [], isValid: true, message: ''},
  selectedUsers: {value: [], isValid: true, message: ''},
  serviceImage: {value: '', isValid: true, message: ''},
  createdBy: {value: '', isValid: true, message: ''},
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddService'>;

function AddService({navigation}: Props) {
  const [inputs, setInputs] = React.useState<serviceInput>(initialInputs);
  const {
    serviceName,
    subService,
    selectedBranches,
    category,
    selectedUsers,
    serviceImage,
    createdBy,
  } = inputs;
  const addServiceDispatch = useAppDispatch();
  const {data} = useAppSelector((state: RootState) => state.user.getUser);
  const {isLoader, isError, errorMsg} = useAppSelector(
    (state: RootState) => state.service.addService,
  );
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const [showCameraOptions, setShowCameraOptions] =
    React.useState<boolean>(false);
  const [siteIsEnabled, setSiteIsEnabled] = React.useState(true);
  const [isStatusEnabled, setIsStatusEnabled] = React.useState(true);

  const toggleSwitch = (value: any) => setSiteIsEnabled(value);
  const toggleStatusSwitch = (value: any) => setIsStatusEnabled(value);

  function inputChangedHandler(inputIdentifier: any, enteredValue: any): void {
    setInputs(curInputs => {
      if (inputIdentifier === 'subService') {
        return {
          ...curInputs,
          subService: {
            value: [...curInputs.subService.value, enteredValue],
            isValid: true,
            message: '',
          },
        };
      } else {
        return {
          ...curInputs,
          [inputIdentifier]: {value: enteredValue, isValid: true},
        };
      }
    });
  }

  const submitService = async () => {
    try {
      let payload = {
        serviceName: serviceName.value,
        category: category.value,
        subService: subService.value,
        onsiteOffsite: siteIsEnabled ? 'On Site' : 'Off Site',
        selectedBranches: selectedBranches.value,
        selectedUsers: selectedUsers.value,
        status: isStatusEnabled ? 'Active' : 'DeActive',
        serviceImage: serviceImage.value,
        createdBy: createdBy.value,
      };
      await addServiceDispatch(fetchAddService(payload)).unwrap();
      addServiceDispatch(fetchService());
      navigation.goBack();
    } catch (error) {
      setError(true);
      setErrorMessage(error);
    }
  };

  function validationCheck() {
    let serviceNameIsvalid = true;
    let serviceNameMsg = '';
    let branchIsvalid = true;
    let branchMsg = '';
    let categoryIsvalid = true;
    let categoryMsg = '';
    let empIsvalid = true;
    let empMsg = '';
    let serviceIsvalid = true;
    let serviceMsg = '';
    let createdByIsvalid = true;
    let createdByMsg = '';
    let subServiceIsvalid = true;
    let subServiceMsg = '';

    if (serviceName.value.trim().length <= 0) {
      serviceNameIsvalid = false;
      serviceNameMsg = 'Service Name is required.';
    }

    if (selectedBranches.value.length <= 0) {
      branchIsvalid = false;
      branchMsg = 'Branch is required.';
    }
    if (category.value.length <= 0) {
      categoryIsvalid = false;
      categoryMsg = 'Category is required.';
    }
    if (selectedUsers.value.length <= 0) {
      empIsvalid = false;
      empMsg = 'Assign Employee is required.';
    }
    if (serviceImage.value.length <= 0) {
      serviceIsvalid = false;
      serviceMsg = 'Service Image is required.';
    }
    if (createdBy.value.length <= 0) {
      createdByIsvalid = false;
      createdByMsg = 'Created By is required.';
    }
    if (subService.value.length <= 0) {
      subServiceIsvalid = false;
      subServiceMsg = 'Sub Service is required.';
    }

    if (
      !serviceNameIsvalid ||
      !branchIsvalid ||
      !categoryIsvalid ||
      !empIsvalid ||
      !serviceIsvalid ||
      !createdByIsvalid ||
      !subServiceIsvalid
    ) {
      setInputs(curInputs => {
        return {
          ...curInputs,
          serviceName: {
            message: serviceNameMsg,
            value: curInputs.serviceName.value,
            isValid: serviceNameIsvalid,
          },
          selectedBranches: {
            message: branchMsg,
            value: curInputs.selectedBranches.value,
            isValid: branchIsvalid,
          },
          subService: {
            message: subServiceMsg,
            value: curInputs.subService.value,
            isValid: subServiceIsvalid,
          },
          category: {
            message: categoryMsg,
            value: curInputs.category.value,
            isValid: categoryIsvalid,
          },
          selectedUsers: {
            message: empMsg,
            value: curInputs.selectedUsers.value,
            isValid: empIsvalid,
          },
          serviceImage: {
            message: serviceMsg,
            value: curInputs.serviceImage.value,
            isValid: serviceIsvalid,
          },
          createdBy: {
            message: createdByMsg,
            value: curInputs.createdBy.value,
            isValid: createdByIsvalid,
          },
        };
      });
      return;
    }
    submitService();
  }

  const getAssignEmployeeDetails = () => {
    addServiceDispatch(fetchGetUser());
  };

  React.useEffect(() => {
    getAssignEmployeeDetails();
  }, []);

  React.useEffect(() => {
    if (!isLoader && isError) {
      setError(isError);
      setErrorMessage(errorMsg);
    }
  }, [isLoader]);

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
      let result: any = await addServiceDispatch(
        uploadServiceImg(formData),
      ).unwrap();
      inputChangedHandler('serviceImage', result?.data || '');
    } catch (error) {
      setError(true);
      setErrorMessage(error);
    }
  };

  const handleImagePickerResponse = (res: ImagePickerResponseObject) => {
    if (!res.errorStatus) {
      uploadService(res.data);
    } else {
      setError(res.errorStatus);
      setErrorMessage(res.errorMsg);
    }
  };

  const deleteService = (value: number) => {
    setInputs(curr => {
      const newArray = curr.subService.value;
      newArray.splice(value, 1);
      return {
        ...curr,
        subService: {
          value: newArray,
          isValid: true,
          message: '',
        },
      };
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Add New Service</Text>
          </View>
          <UI.ImagePickerModal
            showModal={showCameraOptions}
            modalResponse={handleImagePickerResponse}
            onCloseModal={() => {
              setShowCameraOptions(false);
            }}
          />

          <UI.Input
            textInputConfig={{
              placeholder: 'Service Name*',
              value: serviceName.value,
              onChangeText: (value: any) =>
                inputChangedHandler('serviceName', value),
            }}
            isError={!serviceName.isValid}
            errorMsg={serviceName.message}
          />

          <UI.DropDownMultiSelect
            data={branchData}
            onChange={(value: any) =>
              inputChangedHandler('selectedBranches', value)
            }
            placeholder={'Select Branch*'}
            selected={selectedBranches.value}
            isError={!selectedBranches.isValid}
            errorMsg={selectedBranches.message}
          />

          <UI.DropDown
            data={categoryData}
            placeholder={'Select Category*'}
            value={category.value}
            isError={!category.isValid}
            errorMsg={category.message}
            onChange={(value: any) =>
              inputChangedHandler('category', value.value)
            }
            styles={styles.dropdownStyle}
          />

          <SCREEN.ServiceWithList
            addedValues={value => inputChangedHandler('subService', value)}
            deleteItemPressed={deleteValue => deleteService(deleteValue)}
            errorMsg={subService.message}
            isError={!subService.isValid}
            selectedSubService={subService.value}
          />

          <UI.DropDownMultiSelect
            data={data.map(value => {
              return {
                label: value.firstName + ' ' + value.lastName,
                value: value._id,
              };
            })}
            onChange={(value: any) =>
              inputChangedHandler('selectedUsers', value)
            }
            placeholder={'Select Employee to assign*'}
            selected={selectedUsers.value}
            isError={!selectedUsers.isValid}
            errorMsg={selectedUsers.message}
          />

          <UI.Radio
            radioTitle="Site"
            firstText={'On'}
            secondText={'Off'}
            status={siteIsEnabled}
            firstTextPressed={() => toggleSwitch(true)}
            secondTextPressed={() => toggleSwitch(false)}
          />

          <UI.Input
            showIcon={true}
            disableInput={true}
            textInputConfig={{
              value: serviceImage.value,
              placeholder: 'Upload Img*',
            }}
            iconPressed={() => setShowCameraOptions(true)}
            isError={!serviceImage.isValid}
            errorMsg={serviceImage.message}>
            <Icon name="upload" size={30} color="black" />
          </UI.Input>

          <UI.DropDown
            data={data.map(value => {
              return {
                label: value.firstName + ' ' + value.lastName,
                value: value._id,
              };
            })}
            placeholder={'Created By*'}
            value={createdBy.value}
            isError={!createdBy.isValid}
            errorMsg={createdBy.message}
            onChange={value => inputChangedHandler('createdBy', value.value)}
            styles={styles.dropdownStyle}
          />

          <UI.Radio
            radioTitle="Active"
            firstText={'Yes'}
            secondText={'No'}
            status={isStatusEnabled}
            firstTextPressed={() => toggleStatusSwitch(true)}
            secondTextPressed={() => toggleStatusSwitch(false)}
          />

          <View style={styles.btnContainer}>
            <UI.Btn disabledBtn={isLoader} onPressBtn={validationCheck}>
              Add
            </UI.Btn>
          </View>
        </View>
      </ScrollView>
      <UI.Toast
        visible={error}
        message={errorMessage}
        onDismissSnackBar={() => setError(false)}
      />
    </SafeAreaView>
  );
}

export default AddService;

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
    fontSize: rMS(22),
    fontWeight: '600',
    color: colors.fontDark,
  },
  dropdownStyle:{
    ...Platform.select({
      ios:{
        paddingLeft: rMS(13),
      },
      android:{
        paddingLeft: rMS(15),
      }
    })
  }
});
