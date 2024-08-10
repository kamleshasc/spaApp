import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {rMS} from '../../config/responsive';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';

type WelcomeProp = StackScreenProps<RootStackParamList, 'Welcome'>;

function Welcome({navigation}: WelcomeProp) {
  const {width} = useWindowDimensions();
  const handleBtnPressed = () => {
    navigation.replace('Login');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require('../../assets/images/welcome.jpg')}
          resizeMode="cover">
          <View style={styles.overlay}>
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.headerText,
                  {width: width > 500 ? '70%' : '100%'},
                ]}>
                Book an Appointment for Salon, Spa & Barber
              </Text>
              <TouchableOpacity
                onPress={handleBtnPressed}
                style={[
                  styles.googleButton,
                  {width: width > 500 ? '70%' : '90%'},
                ]}>
                <View style={styles.buttonContent}>
                  <Image
                    style={styles.googleImage}
                    source={require('../../assets/images/google-img-new.png')}
                    resizeMode="contain"
                  />
                  <Text style={styles.googleButtonText}>
                    Connect with Google
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleBtnPressed}
                style={[
                  styles.facebookButton,
                  {width: width > 500 ? '70%' : '90%'},
                ]}>
                <View style={styles.buttonContent}>
                  <Image
                    style={styles.facebookImage}
                    source={require('../../assets/images/facebook-img-new.png')}
                    resizeMode="center"
                  />
                  <Text style={styles.facebookButtonText}>
                    Connect with Facebook
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an Account?</Text>
                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={handleBtnPressed}>
                  <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: rMS(20),
    fontWeight: '500',
    color: colors.fontLight,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: rMS(30),
    paddingHorizontal: 12,
  },
  googleButton: {
    backgroundColor: '#E5E5CB',
    paddingVertical: rMS(12),
    marginHorizontal: rMS(20),
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: rMS(20),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleImage: {
    height: rMS(20),
    width: rMS(20),
    marginVertical: 2,
  },
  googleButtonText: {
    fontSize: rMS(15),
    color: '#000000',
    fontWeight: '600',
    marginLeft: rMS(2),
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    paddingVertical: rMS(12),
    marginHorizontal: rMS(20),
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: rMS(30),
  },
  facebookImage: {
    height: rMS(25),
    width: rMS(25),
  },
  facebookButtonText: {
    fontSize: rMS(15),
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: rMS(2),
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: rMS(20),
  },
  signInText: {
    fontSize: rMS(15),
    color: '#ffffff',
    fontWeight: '400',
  },
  signInButton: {
    marginLeft: 5,
  },
  signInButtonText: {
    fontSize: rMS(15),
    color: '#FBBB00',
    textDecorationLine: 'underline',
  },
});
