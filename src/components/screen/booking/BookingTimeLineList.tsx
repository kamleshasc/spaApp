import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../config/colors';
import {rMS, rV} from '../../../config/responsive';

interface BookingTimeLineListTypes {
  startTime: string;
  endTime: string;
  firstValue: boolean;
  lastValue: boolean;
  expertName: string;
}

const BookingTimeLineList: React.FC<BookingTimeLineListTypes> = ({
  startTime,
  endTime,
  firstValue,
  lastValue,
  expertName,
}) => {
  return (
    <View style={styles.flexDirection}>
      <View style={styles.timeContainer}>
        <View style={styles.timeSubContainer}>
          <Text style={styles.timeText}>{startTime}</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        {firstValue && <View style={styles.circleContainer} />}
        <View style={styles.contentSubContainer}>
          <View style={styles.contentWidthAccess}>
            <View style={styles.itemContainer}>
              <View style={styles.flexDirection}>
                <Text style={styles.itemTitle}>Booked</Text>
              </View>
              <View style={styles.flexDirection}>
                <Text style={styles.itemSubTitle}>Employee:-</Text>
                <Text style={styles.itemValue}>{`${expertName}`}</Text>
              </View>
              <View style={styles.flexDirection}>
                <Text style={styles.itemSubTitle}>Time Slot:-</Text>
                <Text style={styles.itemValue}>
                  {`${startTime} - ${endTime}`}
                </Text>
              </View>
            </View>
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
    // borderTopWidth: 2,
    borderBottomWidth: 1.5,
    borderColor: colors.borderGrey,
    borderStyle: 'dashed',
    width: '100%',
  },
  itemContainer: {
    marginLeft: 12,
    borderRadius: 12,
    backgroundColor: colors.primary,
    elevation: 8,
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: rMS(8),
    marginVertical: rMS(18),
  },
  itemTitle: {
    fontSize: rV(13),
    fontWeight: '600',
    color: colors.fontDark,
  },
  itemSubTitle: {
    fontSize: rV(12),
    fontWeight: '500',
    color: colors.fontDark,
  },
  itemValue: {
    fontSize: rV(12),
    fontWeight: '400',
    color: colors.fontDark,
    width: '90%',
    marginLeft: 5,
  },
  circleContainer: {
    height: 20,
    width: 20,
    backgroundColor: colors.fontDark,
    borderRadius: 12,
  },
});
