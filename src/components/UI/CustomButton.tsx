import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import colors from '../../config/colors';
import {rMS} from '../../config/responsive';

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
  return (
    // <View style={[{marginBottom: 20}, styles]}>
    <TouchableOpacity
      disabled={disabledBtn}
      style={[
        {
          paddingVertical: rMS(10),
          borderRadius: 30,
          backgroundColor: colors.themePrimary,
          marginHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        },
        disabledBtn && {backgroundColor: '#E5E6EB'},
        styles,
      ]}
      onPress={onPressBtn}>
      <Text
        style={[
          {
            fontSize: rMS(16),
            // lineHeight: 22,
            fontWeight: '700',
            color: colors.fontLight,
          },
          disabledBtn && {color: colors.fontLight},
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
    // </View>
  );
}

export default CustomButton;
