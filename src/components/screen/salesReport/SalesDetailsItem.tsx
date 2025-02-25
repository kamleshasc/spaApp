import {StyleSheet, Text, View} from 'react-native';
import useDeviceType from '../../../hooks/useDeviceType';
import {rMS} from '../../../config/responsive';
import colors from '../../../config/colors';

interface SalesDetailsItemProps {
  serviceName: string;
  price: any;
  type: string;
}

const SalesDetailsItem = ({
  serviceName,
  price,
  type,
}: SalesDetailsItemProps) => {
  const isTablet = useDeviceType().isTablet;
  return (
    <View style={[styles.itemContainer, {width: isTablet ? '70%' : '60%'}]}>
      <View style={styles.itemValueContainer}>
        <Text style={styles.itemTitleText}>Service:</Text>
        <Text style={styles.itemValueText}>{serviceName}</Text>
      </View>
      <View style={styles.itemValueContainer}>
        <Text style={styles.itemTitleText}>Price:</Text>
        <Text style={styles.itemValueText}>{`$ ${(price).toFixed(2)}`}</Text>
      </View>
      <View style={styles.itemValueContainer}>
        <Text style={styles.itemTitleText}>Type:</Text>
        <Text style={styles.itemValueText}>{type}</Text>
      </View>
    </View>
  );
};

export default SalesDetailsItem;

const styles = StyleSheet.create({
  itemContainer: {
    elevation: 4,
    borderRadius: rMS(10),
    backgroundColor: colors.primary,
    paddingVertical: rMS(8),
    paddingHorizontal: rMS(15),
    alignSelf: 'flex-end',
    marginRight: rMS(13),
    shadowColor: 'black',
    shadowOffset: {width: 0, height: rMS(2)},
    shadowRadius: rMS(4),
    shadowOpacity: 0.15,
    marginBottom: rMS(20),
  },
  itemValueContainer: {
    flexDirection: 'row',
  },
  itemTitleText: {
    fontSize: rMS(16),
    fontWeight: '500',
    color: colors.fontDark,
    marginRight: rMS(5),
  },
  itemValueText: {
    fontSize: rMS(16),
    fontWeight: '400',
    color: colors.fontDark,
    width: '70%',
  },
});
