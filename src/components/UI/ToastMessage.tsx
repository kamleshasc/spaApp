import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import { rMS } from '../../config/responsive';

interface ToastMessageProps {
  Success?: boolean;
  visible: boolean;
  onDismissSnackBar: () => void;
  message: string;
}

function ToastMessage({
  Success,
  visible,
  onDismissSnackBar,
  message,
}: ToastMessageProps) {
  const barStyles = [];
  if (Success) {
    barStyles.push(styles.successStyle);
  } else {
    barStyles.push(styles.errorStyle);
  }
  return (
    <View style={styles.msgContainer}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        icon={'undo'}
        style={barStyles}
        theme={{colors: {inversePrimary: 'white', surface: 'white'}}}>
        <Text style={styles.fontStyle}>{message}</Text>
      </Snackbar>
    </View>
  );
}

export default ToastMessage;

const styles = StyleSheet.create({
  msgContainer: {
    position: 'absolute',
    bottom: '4%',
    width: '100%',
  },
  errorStyle: {
    backgroundColor: 'red',
  },
  successStyle: {
    backgroundColor: 'green',
  },
  fontStyle:{
    fontSize: rMS(13), color: 'white',fontWeight:'600'
  }
});
