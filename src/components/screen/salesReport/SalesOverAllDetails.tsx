import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rMS} from '../../../config/responsive';
import colors from '../../../config/colors';

interface SalesOverAllDetailsProps {
  totalCreditCard: number;
  totalCash: number;
  totalZelle: number;
}

const SalesOverAllDetails = ({
  totalCreditCard,
  totalCash,
  totalZelle,
}: SalesOverAllDetailsProps) => {
  return (
    <>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>Type</Text>
        <Text style={styles.titleText}>Amount</Text>
      </View>
      <View style={styles.lineContainer} />
      <View style={styles.typeItemContainer}>
        <Text style={styles.typeItemText}>Credit Card</Text>
        <Text style={styles.typeItemText}>{`$${totalCreditCard.toFixed(
          2,
        )}`}</Text>
      </View>
      <View style={styles.typeItemContainer}>
        <Text style={styles.typeItemText}>Cash</Text>
        <Text style={styles.typeItemText}>{`$${totalCash.toFixed(2)}`}</Text>
      </View>
      <View style={styles.typeItemContainer}>
        <Text style={styles.typeItemText}>Zelle</Text>
        <Text style={styles.typeItemText}>{`$${totalZelle.toFixed(2)}`}</Text>
      </View>
      <View style={styles.lineContainerTotal} />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalText}>{`$${(
          totalCreditCard +
          totalCash +
          totalZelle
        ).toFixed(2)}`}</Text>
      </View>
    </>
  );
};

export default SalesOverAllDetails;

const styles = StyleSheet.create({
  titleTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: rMS(30),
    marginBottom: rMS(12),
  },
  titleText: {
    fontSize: rMS(16),
    color: colors.themePrimary,
    fontWeight: '500',
  },
  lineContainer: {
    height: 2,
    backgroundColor: colors.themePrimary,
  },
  typeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: rMS(30),
    marginTop: rMS(12),
  },
  typeItemText: {
    fontSize: rMS(15),
    color: colors.fontDark,
    fontWeight: '500',
  },
  lineContainerTotal: {
    height: 2,
    backgroundColor: colors.themePrimary,
    marginTop: rMS(20),
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: rMS(30),
    marginTop: rMS(10),
    marginBottom: rMS(20),
  },
  totalText: {
    fontSize: rMS(16),
    color: colors.themePrimary,
    fontWeight: '500',
  },
});
