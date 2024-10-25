import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import useDimensionListener from '../../hooks/useDimensionListener';
import {rMS} from '../../config/responsive';
import {useAppSelector} from '../../hooks/storeHook';
import {useLogout} from '../../hooks/useLogout';
import {IMAGE_URL} from '@env';
import {SCREEN} from '../../components';

type SettingsProps = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'Profile'>,
  StackScreenProps<RootStackParamList>
>;

function Profile({navigation}: SettingsProps) {
  const {width: screenWidth} = useDimensionListener().screen;
  const logoutProfile = useLogout();
  const {userDetails} = useAppSelector(root => root.user.userDetails);

  const onPressEditProfile = () => {
    let userId = userDetails._id;
    navigation.navigate('EditProfile', {userId});
  };

  const onPressChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.subContainer}>
        <View style={styles.profilePicContainer}>
          <View
            style={[
              styles.profilePicSubContainer,
              {borderRadius: screenWidth / 2},
            ]}>
            <Image
              style={[
                styles.imageStyle,
                {
                  borderRadius: screenWidth / 2,
                },
              ]}
              source={
                userDetails
                  ? userDetails?.userImage
                    ? {uri: IMAGE_URL + userDetails?.userImage}
                    : require('../../assets/images/no_user.png')
                  : require('../../assets/images/no_user.png')
              }
            />
          </View>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>
              {`${userDetails?.firstName} ${userDetails?.lastName}`}
            </Text>
          </View>
        </View>
        <SCREEN.ProfileOption
          name={'Edit Profile'}
          onPress={onPressEditProfile}
        />
        <SCREEN.ProfileOption
          name={'Change Password'}
          onPress={onPressChangePassword}
        />
        <SCREEN.ProfileOption
          name={'Privacy Policy'}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        />
        <SCREEN.ProfileOption name={'Logout'} onPress={() => logoutProfile()} />
      </View>
    </SafeAreaView>
  );
}

export default Profile;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  subContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    maxWidth: 600,
    alignSelf: 'center',
  },
  profilePicContainer: {
    marginTop: rMS(20),
    marginBottom: rMS(20),
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    backgroundColor: colors.primary,
  },
  profilePicSubContainer: {
    height: rMS(100),
    width: rMS(100),
    marginVertical: rMS(20),
    backgroundColor: colors.primary,
    alignSelf: 'center',
    overflow: 'hidden',
    padding: 6,
    borderWidth: 2,
    borderColor: colors.themePrimary,
  },
  imageStyle: {
    height: '100%',
    width: 'auto',
  },
  profileNameContainer: {
    marginBottom: rMS(30),
    alignItems: 'center',
  },
  profileName: {
    fontSize: rMS(18),
    fontWeight: '600',
    color: colors.themePrimary,
  },
});
