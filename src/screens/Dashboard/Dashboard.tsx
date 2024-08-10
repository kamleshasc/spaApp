import React, {useState} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {useAppSelector} from '../../hooks/storeHook';

function Dashboard({navigation}): React.JSX.Element {
  const {userDetails} = useAppSelector(state => state.user.userDetails);
  console.log(userDetails, 'userDetails');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 15,
            paddingVertical: 5,
            marginRight: 10,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.themePrimary,
          }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '700',
              color: colors.themePrimary,
            }}>
            {`Hello, ${userDetails?.firstName}`}
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  const requestPermissions = async () => {
    const cameraPermission = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    // const photoLibraryPermission = await request(
    //   Platform.OS === 'ios'
    //     ? PERMISSIONS.IOS.PHOTO_LIBRARY
    //     : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    // );

    if (
      cameraPermission !== RESULTS.GRANTED
      // photoLibraryPermission !== RESULTS.GRANTED
    ) {
      Alert.alert(
        'Permissions required',
        'This app needs camera and photo library access to function correctly.',
      );
    }
  };

  React.useEffect(() => {
    requestPermissions();
  }, []);
  return (
    <SafeAreaView style={style.container}>
      <Text style={{color: colors.fontDark}}>Dashboard</Text>
    </SafeAreaView>
  );
}

export default Dashboard;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
