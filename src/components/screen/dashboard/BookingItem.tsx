import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {rMS} from '../../../config/responsive';
import colors from '../../../config/colors';

interface BookingItemProp {
  service: string;
  date: any;
  startTime: string;
  endTime: string;
  onPress: () => void;
}

const BookingItem = ({
  service,
  date,
  startTime,
  endTime,
  onPress,
}: BookingItemProp) => {
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <View style={styles.subContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{`Service: `}</Text>
          <Text style={styles.contentValue}>{service}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{`Date: `}</Text>
          <Text style={styles.contentValue}>{date}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{`Start Time: `}</Text>
          <Text style={styles.contentValue}>{startTime}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{`End  Time: `}</Text>
          <Text style={styles.contentValue}>{endTime}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default BookingItem;

const styles = StyleSheet.create({
  root: {
    height: rMS(110),
    backgroundColor: colors.themePrimary,
    width: rMS(200),
    marginHorizontal: rMS(10),
    borderRadius: rMS(10),
    elevation: rMS(3),
    marginTop: 4,
    marginVertical: rMS(10),
  },
  subContainer: {
    marginHorizontal: 10,
    backgroundColor: colors.primary,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  contentContainer: {
    flexDirection: 'row',
    marginTop: rMS(3),
  },
  contentTitle: {
    fontSize: rMS(12),
    fontWeight: '700',
    color: colors.fontDark,
  },
  contentValue: {
    fontSize: rMS(12),
    fontWeight: '500',
    color: colors.fontDark,
  },
});
