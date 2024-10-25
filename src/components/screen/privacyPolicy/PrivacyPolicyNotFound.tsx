import {StyleSheet, Text, View} from 'react-native';
import {rMS} from '../../../config/responsive';
import colors from '../../../config/colors';
import useDimensionListener from '../../../hooks/useDimensionListener';

const PrivacyPolicyNotFound = () => {
  const {height} = useDimensionListener().screen;
  return (
    <View style={[styles.privacyContainer, {height: height - rMS(150)}]}>
      <Text style={styles.privacyText}>No Privacy Policy Found.</Text>
    </View>
  );
};

export default PrivacyPolicyNotFound;

const styles = StyleSheet.create({
  privacyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  privacyText: {
    fontSize: rMS(15),
    fontWeight: '500',
    color: colors.fontDark,
  },
});
