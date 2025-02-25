import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import {SCREEN, UI} from '../../components';
import {CompositeScreenProps} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import {rMS} from '../../config/responsive';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import useDeviceType from '../../hooks/useDeviceType';
import {
  bookingPayment,
  fetchBookingPayment,
} from '../../redux/Action/paymentAction';
import {DateToYYYYMMDD} from '../../config/helper';
import {clearBookingPaymentSliceErrorMessage} from '../../redux/Reducer/paymentReducer/bookingPaymentSlice';
import {clearSelection} from '../../redux/Reducer/paymentReducer/storePaymetItemSlice';

type PaymentMethodsProps = CompositeScreenProps<
  StackScreenProps<RootStackParamList, 'PaymentMethod'>,
  DrawerScreenProps<DrawerNavigationParamList>
>;

function PaymentMethods({navigation}: PaymentMethodsProps) {
  const [selectedType, setSelectedType] = React.useState<number>(0);
  const {data} = useAppSelector(state => state.payment.storePayment);
  const {os} = useDeviceType();
  const dispatchPaymentMethod = useAppDispatch();
  const {errorMsg, isError, isLoader} = useAppSelector(
    state => state.payment.bookingPayment,
  );

  const handlePaymentAmount = data.reduce((prev, current) => {
    return prev + current.subServiceDetails.price;
  }, 0);

  const calculateTax = ((handlePaymentAmount * 6) / 100).toFixed(2);

  const handleTotal = (handlePaymentAmount + Number(calculateTax)).toFixed(2);

  const handleOnPay = async () => {
    try {
      let customerDetails = data[0];
      let bookingIds = data.map(value => value._id);

      let payload = {
        customerId: customerDetails?.customerId
          ? customerDetails?.customerId
          : null,
        customerName: customerDetails?.customerName,
        bookingIds: bookingIds,
        subTotal: handlePaymentAmount,
        tax: Number(calculateTax),
        total: Number(handleTotal),
        paymentMethod:
          selectedType == 1
            ? 'cash'
            : selectedType == 2
            ? 'credit_card'
            : selectedType == 3
            ? 'zelle'
            : '',
      };

      await dispatchPaymentMethod(bookingPayment(payload)).unwrap();
      dispatchPaymentMethod(
        fetchBookingPayment({date: DateToYYYYMMDD(customerDetails?.date)}),
      );
      dispatchPaymentMethod(clearSelection());
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.fullScreen}
        showsVerticalScrollIndicator={false}>
        <UI.Header
          showHeaderName={false}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.headLineContainer}>
          <View style={styles.headLineSubContainer}>
            <Text style={styles.headLineText}>Customer Details</Text>
            <View style={styles.firstContentContainer}>
              <Text style={styles.contentTitle}>Name:</Text>
              <Text style={styles.contentValue}>{data[0]?.customerName}</Text>
            </View>
            <View style={styles.secondContentContainer}>
              <Text style={styles.contentTitle}>Email:</Text>
              <Text style={styles.contentValue}>{data[0]?.mail || '-'}</Text>
            </View>
            <View style={styles.secondContentContainer}>
              <Text style={styles.contentTitle}>Phone:</Text>
              <Text style={styles.contentValue}>{data[0]?.phone || '-'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.serviceDetailsContainer}>
          <Text style={styles.headLineText}>Service Details</Text>
        </View>
        <SCREEN.ServiceDetailList
          serviceData={data.map(value => {
            return {
              serviceName: value?.subServiceDetails?.name,
              price: value?.subServiceDetails?.price,
              category: value?.subServiceDetails?.category,
            };
          })}
        />
        <View style={styles.paymemtContainer}>
          <Text style={styles.headLineText}>Payment Method</Text>
        </View>

        <SCREEN.PaymentOption
          selected={selectedType}
          onPress={value => setSelectedType(value)}
        />

        <View style={styles.headLineSubContainer}>
          <Text style={styles.headLineText}>Order Summary</Text>
        </View>

        <View style={styles.subOrderContainer}>
          <Text style={styles.contentTitle}>{'Sub Total:'}</Text>
          <Text style={styles.contentValue}>{`$ ${handlePaymentAmount.toFixed(
            2,
          )}`}</Text>
        </View>
        <View style={styles.subOrderContainer}>
          <Text style={styles.contentTitle}>{'Tax (6%):'}</Text>
          <Text style={styles.contentValue}>{`$ ${calculateTax}`}</Text>
        </View>
        <View style={styles.subOrderContainer}>
          <Text style={styles.contentTitle}>{'Total:'}</Text>
          <Text style={styles.contentValue}>{`$ ${handleTotal}`}</Text>
        </View>

        <UI.Btn
          disabledBtn={selectedType == 0 || isLoader}
          onPressBtn={handleOnPay}
          styles={styles.rootBtnContainer}>
          <View
            style={[styles.btnContainer, os == 'ios' && {paddingTop: rMS(7)}]}>
            <Text style={styles.textPay}>Pay</Text>
            <Text style={styles.btnTextTotal}>{`$ ${handleTotal}`}</Text>
          </View>
        </UI.Btn>
        <UI.Toast
          message={errorMsg}
          onDismissSnackBar={() =>
            dispatchPaymentMethod(clearBookingPaymentSliceErrorMessage())
          }
          visible={isError}
        />
      </ScrollView>
    </View>
  );
}

export default PaymentMethods;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fullScreen: {
    flex: 1,
  },
  headLineContainer: {
    flexDirection: 'row',
  },
  headLineSubContainer: {
    marginHorizontal: rMS(25),
    marginTop: rMS(10),
  },
  headLineText: {
    fontSize: rMS(17),
    color: colors.fontDark,
    fontWeight: '600',
  },
  firstContentContainer: {
    flexDirection: 'row',
    marginTop: rMS(8),
  },
  contentTitle: {
    fontSize: rMS(13),
    fontWeight: '600',
    color: colors.fontDark,
    marginRight: rMS(5),
  },
  contentValue: {
    fontSize: rMS(12),
    color: colors.fontDark,
    fontWeight: '400',
  },
  secondContentContainer: {
    flexDirection: 'row',
    marginTop: rMS(2),
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: rMS(30),
  },
  textPay: {
    fontSize: rMS(15),
    fontWeight: '800',
    color: colors.fontLight,
    marginRight: rMS(12),
  },
  btnTextTotal: {
    fontSize: rMS(14),
    fontWeight: '800',
    color: colors.fontLight,
  },
  serviceDetailsContainer: {
    marginHorizontal: rMS(25),
    marginBottom: rMS(10),
    marginTop: rMS(30),
  },
  paymemtContainer: {
    marginHorizontal: rMS(25),
    marginTop: rMS(10),
    marginBottom: rMS(10),
  },
  subOrderContainer: {
    flexDirection: 'row',
    marginHorizontal: rMS(25),
    marginTop: rMS(10),
    justifyContent: 'space-between',
  },
  rootBtnContainer: {
    marginTop: rMS(30),
    marginBottom: rMS(20),
    padding: 0,
  },
});
