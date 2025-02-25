import React from 'react';
import {View, Modal, StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../../config/colors';
import {rMS} from '../../config/responsive';
import useDeviceType from '../../hooks/useDeviceType';

interface CancelBookingModalProps {
  bookingId?: string;
  customerName?: string;
  date?: string;
  time?: string;
  handleCancelPressed?: () => void;
  handleOkayPressed?: (bookingId: string) => void;
  btnStatus?: boolean;
}

const CancelBookingModal: React.FC<CancelBookingModalProps> = ({
  customerName,
  date,
  time,
  bookingId,
  handleCancelPressed,
  handleOkayPressed,
  btnStatus,
}) => {
  const {isTablet} = useDeviceType();

  const onOkayPressed = () => {
    if (handleOkayPressed && bookingId) {
      handleOkayPressed(bookingId);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onDismiss={handleCancelPressed}>
      <View style={styles.container}>
        <View style={[styles.subContainer, {width: isTablet ? '70%' : '80%'}]}>
          <Text style={styles.titleText}>Booking Cancel</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              Please confirm if you’d like to proceed with the cancellation.
            </Text>
          </View>

          <View style={styles.userInfoContainer}>
            {customerName &&<View style={styles.userContentContainer}>
              <Text style={styles.userInfoTitle}>Cutomer:</Text>
              <Text style={styles.userInfoValue}>{customerName}</Text>
            </View>}
            <View style={styles.userContentContainer}>
              <Text style={styles.userInfoTitle}>Date:</Text>
              <Text style={styles.userInfoValue}>{date}</Text>
            </View>
            <View style={styles.userContentContainer}>
              <Text style={styles.userInfoTitle}>Time:</Text>
              <Text style={styles.userInfoValue}>{time}</Text>
            </View>
          </View>

          <View style={styles.btnRootContainer}>
            <TouchableOpacity
              style={[
                styles.cancelBtnContainer,
                btnStatus && styles.disableStyle,
              ]}
              onPress={handleCancelPressed}>
              <Text style={styles.canelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={btnStatus}
              style={[
                styles.okayBtnContainer,
                btnStatus && styles.disableStyle,
              ]}
              onPress={onOkayPressed}>
              <Text style={styles.okayBtnText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CancelBookingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  subContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    // padding: 20,
    paddingTop: 8,
    paddingBottom: 20,
    // alignItems: 'center',
    // width: '70%',
  },
  titleText: {
    fontSize: rMS(22),
    fontWeight: '700',
    color: colors.fontDark,
    textAlign: 'center',
  },
  btnRootContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelBtnContainer: {
    borderColor: colors.themePrimary,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 15,
  },
  canelBtnText: {
    fontSize: rMS(15),
    color: colors.themePrimary,
    fontWeight: '500',
  },
  okayBtnContainer: {
    backgroundColor: colors.themePrimary,
    paddingHorizontal: 35,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    alignSelf: 'center',
  },
  okayBtnText: {
    fontSize: rMS(15),
    fontWeight: '500',
    color: '#fff',
  },
  contentContainer: {
    marginVertical: rMS(13),
    marginHorizontal: rMS(20),
  },
  contentText: {
    fontSize: rMS(14),
    fontWeight: '500',
    color: colors.fontDark,
    textAlign: 'justify',
  },
  userInfoContainer: {
    marginHorizontal: rMS(20),
    marginBottom: rMS(20),
  },
  userContentContainer: {
    flexDirection: 'row',
    marginBottom: rMS(5),
  },
  userInfoTitle: {
    fontSize: rMS(13),
    fontWeight: '500',
    color: colors.fontDark,
    width: '30%',
  },
  userInfoValue: {
    fontSize: rMS(13),
    fontWeight: '400',
    color: colors.fontDark,
    width: '70%',
  },
  disableStyle: {
    opacity: 0.5,
  },
});
