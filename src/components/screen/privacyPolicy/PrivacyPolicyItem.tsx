import {StyleSheet, Text, View} from 'react-native';
import {rMS} from '../../../config/responsive';
import colors from '../../../config/colors';

interface PrivacyPolicyItemProps {
  value: string;
  title: string;
  index: number;
}

function PrivacyPolicyItem({title, value, index}: PrivacyPolicyItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.indexValue}>{`${index + 1}.${title}:-`}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
}

export default PrivacyPolicyItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: rMS(5),
    marginBottom: rMS(10),
  },
  indexValue: {
    fontSize: rMS(13),
    fontWeight: '700',
    color: colors.fontDark,
  },
  valueText: {
    fontSize: rMS(13),
    fontWeight: '500',
    color: colors.fontDark,
    paddingLeft: rMS(20),
    justifyContent: 'center',
  },
});
