import {StyleSheet, Text, View} from 'react-native';
import {rMS} from '../../../config/responsive';
import colors from '../../../config/colors';
import React from 'react';

type ServiceListProps = {
  service: string;
  category: string;
  price: number;
};

const ServiceItem = ({service, category, price}: ServiceListProps) => {
  return (
    <View style={styles.root}>
      <View style={styles.itemContainer}>
        <View style={styles.contenetItemContainer}>
          <Text style={styles.contentKey}>Service Name:</Text>
          <Text style={styles.contentValue}>{service}</Text>
        </View>
        <View style={styles.contenetItemContainer}>
          <Text style={styles.contentKey}>Category:</Text>
          <Text style={styles.contentValue}>{category}</Text>
        </View>
        <View style={styles.contenetItemContainer}>
          <Text style={styles.contentKey}>Price:</Text>
          <Text style={styles.contentValue}>{`$ ${price}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  itemContainer: {
    marginHorizontal: rMS(25),
    elevation: 4,
    flex: 1,
    padding: rMS(10),
    backgroundColor: colors.primary,
    borderRadius: rMS(10),
    shadowColor: 'black',
    shadowOffset: {width: 0, height: rMS(2)},
    shadowRadius: rMS(4),
    shadowOpacity: 0.15,
    marginBottom: rMS(8),
  },
  contenetItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentKey: {
    fontSize: rMS(12),
    fontWeight: '600',
    color: colors.fontDark,
    marginRight: rMS(5),
    width:'30%'
  },
  contentValue: {
    fontSize: rMS(12),
    fontWeight: '400',
    color: colors.fontDark,
    marginRight: rMS(5),
    width:'65%',
    textAlign:'right'
  },
});
