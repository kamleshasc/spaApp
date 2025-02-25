import {StyleSheet, Text, View} from 'react-native';
import useDimensionListener from '../../../hooks/useDimensionListener';
import {rMS} from '../../../config/responsive';
import colors from '../../../config/colors';

const PrivacyPolicyLoader = () => {
  const {height} = useDimensionListener().screen;

  return (
    <View
      style={[
        styles.root,
        {
          height: height - rMS(150),
        },
      ]}>
      <Text style={styles.textfont}>Loading...</Text>
    </View>
  );
};

export default PrivacyPolicyLoader;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textfont: {
    fontSize: rMS(15),
    fontWeight: '500',
    color: colors.fontLightGrey,
  },
});
