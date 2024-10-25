import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../config/colors';
import Icon from 'react-native-vector-icons/AntDesign';

interface objValues {
  name: string;
  price: any;
  duration: string;
}

interface SubServiceProp {
  value: objValues;
  onPress: () => void;
}

const SubServiceItem = ({value, onPress}: SubServiceProp) => {
  const priceAsNumber = parseFloat(value?.price);
  const formattedPrice = !isNaN(priceAsNumber)
    ? `$${priceAsNumber.toFixed(2)}`
    : '$0.00';
  return (
    <View style={styles.selectedSubServiceContainer}>
      <View style={styles.selectedSubServiceInnerContainer}>
        <View style={styles.selectedSubServiceDetailsContainer}>
          <View style={styles.selectedSubServiceDetailRow}>
            <Text style={styles.selectedSubServiceLabel}>Service:</Text>
            <Text style={styles.selectedSubServiceValue} numberOfLines={2}>
              {value?.name}
            </Text>
          </View>
          <View style={styles.selectedSubServiceDetailRow}>
            <Text style={styles.selectedSubServiceLabel}>Price:</Text>
            <Text style={styles.selectedSubServiceValue} numberOfLines={2}>
              {formattedPrice}
            </Text>
          </View>
          <View style={styles.selectedSubServiceDetailRow}>
            <Text style={styles.selectedSubServiceLabel}>Duration:</Text>
            <Text style={styles.selectedSubServiceValue} numberOfLines={2}>
              {value?.duration}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onPress}>
          <Icon name="delete" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubServiceItem;

const styles = StyleSheet.create({
  selectedSubServiceContainer: {
    marginBottom: 20,
    marginHorizontal: 22,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    padding: 10,
    flex: 1,
  },
  selectedSubServiceInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedSubServiceDetailsContainer: {
    width: '85%',
  },
  selectedSubServiceDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  selectedSubServiceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.fontDark,
    marginRight: 2,
  },
  selectedSubServiceValue: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.fontDark,
  },
});
