import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../config/colors';
import {rMS} from '../../config/responsive';
import useDeviceType from '../../hooks/useDeviceType';

interface CustomButttonUIProps {
  children?: React.ReactNode;
  disabledBtn?: boolean;
  onPressBtn: () => void;
  styles?: object;
}

function CustomButton({
  children,
  disabledBtn,
  onPressBtn,
  styles,
}: CustomButttonUIProps) {
  const {os, isTablet} = useDeviceType();

  const containerHeight =  os === 'ios' ? (isTablet ? 65 : 45) : isTablet ? 65 : 50;

  return (
    <TouchableOpacity
      disabled={disabledBtn}
      style={[
        innerStyle.container,
        disabledBtn && innerStyle.disableStyle,
        styles,
        {height:containerHeight}
      ]}
      onPress={onPressBtn}>
      <Text
        style={[innerStyle.fontText, disabledBtn && {color: colors.fontLight}]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;

const innerStyle = StyleSheet.create({
  container: {
    // paddingVertical: rMS(10),
    borderRadius: 30,
    backgroundColor: colors.themePrimary,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  fontText: {
    fontSize: rMS(16),
    fontWeight: '700',
    color: colors.fontLight,
  },
  disableStyle: {
    backgroundColor: '#E5E6EB',
  },
});
