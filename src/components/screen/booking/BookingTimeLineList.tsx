import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../../config/colors';
import {rMS, rV} from '../../../config/responsive';
import DashedBorder from '../../UI/DashedBorder';
import useDeviceType from '../../../hooks/useDeviceType';

interface BookingTimeLineListTypes {
  startTime: string;
  endTime: string;
  firstValue: boolean;
  lastValue: boolean;
  expertName: string;
  itemColour: number;
  isDeleted: boolean;
  customerName: string;
  cancelPressed: () => void;
}

const BookingTimeLineList: React.FC<BookingTimeLineListTypes> = ({
  startTime,
  endTime,
  firstValue,
  lastValue,
  expertName,
  itemColour,
  isDeleted,
  customerName,
  cancelPressed,
}) => {
  const {isTablet} = useDeviceType();
  const width = isTablet ? '78%' : '76%';

  const backgroundColor =
    isDeleted == true
      ? colors.red
      : itemColour == 0
      ? colors.darkYellow
      : itemColour == 1
      ? colors.lightYellow
      : itemColour == 2
      ? colors.purple
      : colors.green;

  return (
    <View style={styles.flexDirection}>
      <View style={styles.timeContainer}>
        <View style={styles.timeSubContainer}>
          <Text style={styles.timeText}>{startTime}</Text>
        </View>
      </View>
      <View style={{width}}>
        {firstValue && <View style={styles.circleContainer} />}
        <View style={styles.contentSubContainer}>
          <View style={[styles.contentWidthAccess]}>
            <View style={[styles.itemContainer, {backgroundColor}]}>
              {!isDeleted && (
                <TouchableOpacity
                  style={styles.cancelContainer}
                  onPress={cancelPressed}>
                  <Image
                    style={styles.imageContainer}
                    source={require('../../../assets/images/cancel-icon.png')}
                  />
                </TouchableOpacity>
              )}
              <View style={styles.flexDirection}>
                <Text style={styles.itemTitle}>Booked</Text>
              </View>
              <View style={styles.flexDirection}>
                <Text style={styles.itemSubTitle}>Employee:-</Text>
                <Text style={styles.itemValue}>{`${expertName}`}</Text>
              </View>
              <View style={styles.flexDirection}>
                <Text style={styles.itemSubTitle}>Customer:-</Text>
                <Text style={styles.itemValue}>{`${customerName}`}</Text>
              </View>
              <View style={styles.flexDirection}>
                <Text style={styles.itemSubTitle}>Time Slot:-</Text>
                <Text style={styles.itemValue}>
                  {`${startTime} - ${endTime}`}
                </Text>
              </View>
            </View>
            <DashedBorder />
          </View>
        </View>
        {lastValue && <View style={styles.circleContainer} />}
      </View>
    </View>
  );
};

export default BookingTimeLineList;

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: 'row',
  },
  timeContainer: {
    width: '20%',
    alignItems: 'center',
  },
  timeSubContainer: {
    backgroundColor: colors.themePrimary,
    padding: rMS(8),
    borderRadius: 10,
  },
  timeText: {
    fontSize: rV(12),
    fontWeight: '500',
    color: colors.fontLight,
  },
  contentContainer: {
    width: '75%',
  },
  contentSubContainer: {
    flexDirection: 'row',
    borderLeftWidth: 1.5,
    borderLeftColor: colors.borderColor,
    marginLeft: 10,
    paddingTop: 4,
    paddingBottom: 10,
  },
  contentWidthAccess: {
    width: '95%',
  },
  itemContainer: {
    marginLeft: 12,
    borderRadius: 12,
    // backgroundColor: colors.primary,
    // backgroundColor: '#ffea61',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: rMS(2)},
        shadowRadius: rMS(4),
        shadowOpacity: 0.15,
      },
    }),
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: rMS(8),
    marginVertical: rMS(18),
  },
  itemTitle: {
    fontSize: rV(13),
    fontWeight: '600',
    color: colors.fontLight,
    // color: colors.fontDark,
  },
  itemSubTitle: {
    fontSize: rV(12),
    fontWeight: '500',
    // color: colors.fontDark,
    color: colors.fontLight,
  },
  itemValue: {
    fontSize: rV(12),
    fontWeight: '400',
    // color: colors.fontDark,
    color: colors.fontLight,
    width: '90%',
    marginLeft: 5,
  },
  circleContainer: {
    height: 20,
    width: 20,
    backgroundColor: colors.fontDark,
    borderRadius: 12,
  },
  cancelContainer: {
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
