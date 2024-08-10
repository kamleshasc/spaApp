import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {UI} from '../../components';
import {rMS} from '../../config/responsive';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';

let onBoardingData = [
  {
    id: 1,
    title: 'Find and Book Services',
    subTitle:
      'Find and Book Barber, Beauty. Salon & Spa Service anywhere, Anytime.',
    imgPath: require('../../assets/images/easing-neck-pain-new.jpg'),
  },
  {
    id: 2,
    title: 'Style that fit you life Style',
    subTitle:
      'Choose Our Makeup Special offer Price Package that fit your Lifestyle.',
    imgPath: require('../../assets/images/back-massage-pain-new.jpg'),
  },
  {
    id: 3,
    title: 'Book an Appointment for Home Services',
    subTitle:
      'Choose Our Makeup Special offer Price Package that fit your Lifestyle.',
    imgPath: require('../../assets/images/foot_pain-new.jpg'),
  },
];

type onBoardingProps = StackScreenProps<RootStackParamList, 'OnBoarding'>;

function OnBoarding({navigation}: onBoardingProps) {
  const {width} = useWindowDimensions();
  const [content, setContent] = React.useState(onBoardingData);
  const [nextScreen, setNextScreen] = React.useState<number>(0);

  const handleOnpress = () => {
    if (nextScreen < 2) {
      setNextScreen(nextScreen + 1);
    } else {
      navigation.replace('Welcome');
      setNextScreen(0);
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.rootContainer}>
        <View style={styles.subContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.imgStyle}
              source={content[nextScreen].imgPath}
              resizeMode="cover"
            />
          </View>
          <View style={styles.paginationContainer}>
            <View
              style={[
                styles.paginationNonSlectedContainer,
                nextScreen == 0 && styles.paginationSelectedContainer,
              ]}>
              {nextScreen == 0 && <View style={styles.activeInnerContainer} />}
            </View>
            <View
              style={[
                styles.paginationNonSlectedContainer,
                nextScreen == 1 && styles.paginationSelectedContainer,
              ]}>
              {nextScreen == 1 && <View style={styles.activeInnerContainer} />}
            </View>
            <View
              style={[
                styles.paginationNonSlectedContainer,
                nextScreen == 2 && styles.paginationSelectedContainer,
              ]}>
              {nextScreen == 2 && <View style={styles.activeInnerContainer} />}
            </View>
          </View>
        </View>

        <Text style={styles.titleContainer}>{content[nextScreen].title}</Text>

        <View style={styles.subTitleContainer}>
          <Text
            style={[
              styles.subTitle,
              {
                width: width > 500 ? '70%' : '90%',
              },
            ]}>
            {content[nextScreen].subTitle}
          </Text>
        </View>

        <View
          style={[
            styles.btnContainer,
            {
              width: width > 500 ? '70%' : '100%',
            },
          ]}>
          <UI.Btn disabledBtn={false} onPressBtn={handleOnpress}>
            {nextScreen == 2 ? 'Get Started' : 'Next'}
          </UI.Btn>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default OnBoarding;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  subContainer: {
    height: '70%',
  },
  imageContainer: {
    height: '90%',
    backgroundColor: 'white',
    borderBottomRightRadius: 200,
    overflow: 'hidden',
  },
  imgStyle: {
    height: '100%',
    width: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationNonSlectedContainer: {
    height: rMS(15),
    width: rMS(15),
    borderRadius: 12,
    backgroundColor: '#CFD6DC',
    marginHorizontal: 4,
  },
  paginationSelectedContainer: {
    height: rMS(15),
    width: rMS(30),
    padding: rMS(2),
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: colors.themePrimary,
  },
  titleContainer: {
    fontSize: rMS(18),
    fontWeight: '700',
    color: colors.fontDarkColor,
    textAlign: 'center',
  },
  subTitleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  subTitle: {
    fontSize: rMS(12),
    fontWeight: '500',
    color: colors.fontLightGrey,
    textAlign: 'center',
    alignSelf: 'center',
  },
  activeInnerContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
    backgroundColor: colors.themePrimary,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
