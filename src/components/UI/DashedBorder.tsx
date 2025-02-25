import {StyleSheet, View} from 'react-native';
import { rMS } from '../../config/responsive';
import colors from '../../config/colors';

const DashedBorder = () => {
  const dottedLineDots = Array.from({length: 1000}, (_, index) => (
    <View key={index} style={styles.dottedLineDot}></View>
  ));
  return <View style={styles.dottedLineContainer}>{dottedLineDots}</View>;
};

const styles = StyleSheet.create({
  dottedLineContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginLeft: 5,
    marginRight: 5,
    width:'100%'
  },
  dottedLineDot: {
    width: 6,
    height: rMS(2),
    backgroundColor: colors.borderColor,
    // borderRadius: 100,
    marginLeft: 5,
  },
});

export default DashedBorder;
