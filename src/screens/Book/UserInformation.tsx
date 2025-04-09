import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {rMS, rV} from '../../config/responsive';
import {categoryData} from '../../config/data';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {IMAGE_URL} from '@env';
import {fetchServiceByExpertId} from '../../redux/Action/serviceAction';
import {validatePathConfig} from '@react-navigation/native';

type UserInformationProp = NativeStackScreenProps<
  RootStackParamList,
  'BookingUser'
>;

function UserInformation({navigation, route}: UserInformationProp) {
  const {expertId, selectedDate} = route.params;
  const [selectedService, setSelectedService] = React.useState<any>(null);
  const dispatchUserInf = useAppDispatch();
  const {data} = useAppSelector(state => state.service.getServiceByExpertId);
  const {userDetails} = useAppSelector(state => state.user.userDetails);

  React.useEffect(() => {
    dispatchUserInf(fetchServiceByExpertId({expertId: expertId}));
  }, []);

  const handleService = (id: string) => {
    let selectedServiceDetails = data.reduce((prev, current) => {
      if (id == current.serviceId) {
        prev = current;
      }
      return prev;
    }, null);

    if (selectedServiceDetails) {
      setSelectedService(selectedServiceDetails);
    }
  };

  const handleNext = () => {
    let payload = {
      date: selectedDate,
      expertId: expertId,
      serviceId: selectedService?.serviceId,
      serviceName: selectedService?.name,
      price: selectedService?.price,
      parentId: selectedService?.parentId,
      name: userDetails?.firstName + userDetails?.lastName,
      mail: userDetails?.email ? userDetails.email : '',
      phone: userDetails?.mobileNumber ? userDetails.mobileNumber : '',
      duration: selectedService?.duration,
    };
    navigation.navigate('BookingTimeLine', {payload});
  };

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UI.Header
          onPress={() => navigation.goBack()}
          headerName={'Personal Information'}
          showHeaderName={true}
        />
        <View style={styles.subScreen}>
          <View style={styles.userContainer}>
            <Image
              resizeMode="cover"
              style={styles.userImage}
              source={
                userDetails?.userImage
                  ? {uri: `${IMAGE_URL}${userDetails?.userImage}`}
                  : require('../../assets/images/no_user.png')
              }
            />
          </View>
          <UI.Input
            disableInput={true}
            textInputConfig={{
              placeholder: 'First Name',
              value: userDetails?.firstName,
            }}
          />
          <UI.Input
            disableInput={true}
            textInputConfig={{
              placeholder: 'Last Name',
              value: userDetails?.lastName,
              editable: false,
            }}
          />
          <UI.Input
            disableInput={true}
            textInputConfig={{
              placeholder: 'Email',
              value: userDetails?.email,
              editable: false,
            }}
          />
          <UI.DropDown
            data={data.map(value => {
              return {
                label: value.name,
                value: value.serviceId,
              };
            })}
            onChange={(value: any) => handleService(value?.value)}
            placeholder={'Select Service'}
            value={selectedService?.serviceId || ''}
            styles={styles.inputStyle}
          />
          <UI.Input
            disableInput={true}
            textInputConfig={{
              placeholder: 'Price',
              value: selectedService?.price
                ? `$ ${selectedService?.price.toFixed(2)}`
                : '',
              editable: false,
            }}
          />
          <UI.Input
            disableInput={true}
            textInputConfig={{
              placeholder: 'Duration',
              value: selectedService?.duration || '',
              editable: false,
            }}
          />
          <View style={styles.btnContainer}>
            <UI.Btn
              disabledBtn={selectedService ? false : true}
              onPressBtn={handleNext}>
              Next
            </UI.Btn>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default UserInformation;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fullscreen: {
    flex: 1,
  },
  subScreen: {
    alignSelf: 'center',
    maxWidth: 600,
    flex: 1,
  },
  userContainer: {
    height: rMS(100),
    width: rMS(100),
    borderRadius: 200,
    marginVertical: rV(22),
    overflow: 'hidden',
    alignSelf: 'center',
  },
  userImage: {
    height: '100%',
    width: '100%',
  },
  btnContainer: {
    justifyContent: 'center',
    marginVertical: rMS(20),
  },
  inputStyle: {
    ...Platform.select({
      ios: {
        paddingLeft: rMS(13),
      },
      android: {
        paddingLeft: rMS(15),
      },
    }),
  },
});
