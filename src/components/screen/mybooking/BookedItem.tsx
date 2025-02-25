import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../config/colors';
import {rMS} from '../../../config/responsive';
import {
  getDateInNewYorkTimeZoneMoment,
  getItPastDate,
} from '../../../config/helper';

type BookedItemProp = {
  date: any;
  service: string;
  startTime: string;
  endTime: string;
  expertName: string;
  status: boolean;
  cancelPressed: () => void;
  isCancelBooking: boolean;
};

const BookedItem = ({
  date,
  service,
  startTime,
  endTime,
  expertName,
  status,
  cancelPressed,
  isCancelBooking,
}: BookedItemProp) => {

  const isPastDate = getItPastDate(date);

  return (
    <View
      style={[
        styles.root,
        isCancelBooking
          ? {backgroundColor: colors.red}
          : status && styles.statusContainer,
      ]}>
      <View style={styles.subContainer}>
        {(!isCancelBooking && !isPastDate) && (
          <TouchableOpacity
            style={styles.cancelBtnContainer}
            onPress={cancelPressed}>
            <Image
              style={styles.imageContainer}
              source={require('../../../assets/images/cancel-icon.png')}
            />
          </TouchableOpacity>
        )}
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
    ...Platform.select({
      android: {
        elevation: rMS(3),
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: rMS(2)},
        shadowRadius: rMS(4),
        shadowOpacity: 0.15,
      },
    }),
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
  cancelBtnContainer: {
    zIndex: 1,
    height: rMS(28),
    width: rMS(28),
    position: 'absolute',
    right: 5,
    top: 8,
  },
  imageContainer: {
    height: '100%',
    width: '100%',
  },
});
