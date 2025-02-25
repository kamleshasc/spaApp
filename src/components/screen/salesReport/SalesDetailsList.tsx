import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rMS} from '../../../config/responsive';
import colors from '../../../config/colors';
import SalesDetailsItem from './SalesDetailsItem';

interface SalesDetailsListProps {
  salesDate: any;
  salesData: any[];
}

const SalesDetailsList = ({salesDate, salesData}: SalesDetailsListProps) => {
  
  return (
    <>
      <View style={styles.monthContainer}>
        {/* <Text style={styles.monthText}>Month:</Text> */}
        <Text style={styles.dayText}>{salesDate}</Text>
      </View>
      {salesData.map((value: any, index: any) => {
        return (
          <SalesDetailsItem
            price={value?.price}
            serviceName={value?.service}
            type={value?.type}
            key={index.toString()}
          />
        );
      })}
    </>
  );
};

export default SalesDetailsList;

const styles = StyleSheet.create({
  monthContainer: {
    borderBottomWidth:rMS(1.5),
    borderColor:colors.themePrimary,
    paddingBottom:rMS(10),
    flexDirection: 'row',
    paddingHorizontal: rMS(12),
    marginBottom: rMS(10),
    // elevation:4,
    backgroundColor:colors.primary
  },
  monthText: {
    fontSize: rMS(18),
    fontWeight: '500',
    color: colors.fontDark,
    marginRight: rMS(5),
  },
  dayText: {
    fontSize: rMS(18),
    fontWeight: '500',
    color: colors.fontDark,
  },
});
