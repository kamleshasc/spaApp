import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../config/colors';
import {rMS} from '../../../config/responsive';

type BookedItemProp = {
  date: any;
  service: string;
  startTime: string;
  endTime: string;
  expertName: string;
  status: boolean;
};

const BookedItem = ({
  date,
  service,
  startTime,
  endTime,
  expertName,
  status,
}: BookedItemProp) => {
  return (
    <View style={[styles.root, status && styles.statusContainer]}>
      <View style={styles.subContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Date :</Text>
          <Text style={styles.itemValue}>{date}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Service :</Text>
          <Text style={styles.itemValue} numberOfLines={1}>
            {service}
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Time :</Text>
          <Text style={styles.itemValue} numberOfLines={1}>
            {`${startTime} - ${endTime}`}
          </Text>
        </View>
        <View style={styles.lastItemContainer}>
          <Text style={styles.itemTitle}>Expert :</Text>
          <Text style={styles.itemValue} numberOfLines={1}>
            {expertName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BookedItem;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'green',
    borderRadius: 12,
    width: rMS(350),
    elevation: 7,
    alignSelf: 'center',
    marginHorizontal: 12,
    marginVertical: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  subContainer: {
    backgroundColor: colors.primary,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: rMS(13),
    fontWeight: '700',
    color: colors.fontDark,
    marginRight: 8,
  },
  itemValue: {
    fontSize: rMS(13),
    fontWeight: '500',
    color: colors.fontDark,
    width: '70%',
  },
  lastItemContainer: {
    flexDirection: 'row',
  },
  statusContainer: {
    backgroundColor: 'yellow',
  },
});
