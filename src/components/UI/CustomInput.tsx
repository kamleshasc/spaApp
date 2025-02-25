import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {HelperText} from 'react-native-paper';
import colors from '../../config/colors';
import {rMS} from '../../config/responsive';
import useDeviceType from '../../hooks/useDeviceType';

interface CustomInputUIProps {
  showIcon?: boolean;
  textInputConfig: TextInputProps;
  disableInput?: boolean;
  isError?: boolean;
  errorMsg?: string;
  iconPressed?: () => void;
  children?: React.ReactNode;
  stylesInput?: object;
  showText?: boolean;
  disableText?: boolean;
  childrenStyle?: TouchableOpacityProps;
}

function CustomInput({
  showIcon,
  textInputConfig,
  disableInput,
  isError,
  errorMsg,
  iconPressed,
  children,
  stylesInput,
  showText,
  disableText,
  childrenStyle,
}: CustomInputUIProps) {
  const {isTablet} = useDeviceType();
  const containerHeight = isTablet ? 70 : 50;

  return (
    <>
      <View
        style={[
          styles.container,
          stylesInput,
          showText && styles.iosShowText,
          {height: containerHeight},
        ]}>
        <View
          style={{
            width: showIcon ? '85%' : showText ? '72%' : '95%',
          }}>
          <TextInput
            style={styles.fontStyle}
            editable={!disableInput}
            {...textInputConfig}
            placeholderTextColor={colors.placeholder}
          />
        </View>
        {showIcon && (
          <TouchableOpacity
            style={styles.childrenContainer}
            {...childrenStyle}
            onPress={iconPressed}>
            {children}
          </TouchableOpacity>
        )}
        {showText && (
          <TouchableOpacity
            style={{
              height: rMS(30),
              width: rMS(70),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={disableText}
            onPress={iconPressed}>
            <Text
              style={[
                {
                  fontSize: rMS(14),
                  fontWeight: 'bold',
                  color: colors.themePrimary,
                },
                disableText && {color: colors.fontLightGrey},
              ]}>
              Send OTP
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {isError && (
        <View style={styles.errorContainer}>
          <HelperText type="error" visible={true} style={styles.errorText}>
            {errorMsg}
          </HelperText>
        </View>
      )}
    </>
  );
}

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.primary,
    borderRadius: Platform.OS === 'ios' ? 10 : 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rMS(20),
    marginHorizontal: 20,
    // height: rMS(50),
    // paddingVertical: Platform.OS === 'ios' ? rMS(14) : rMS(4),
    paddingHorizontal: rMS(12),
    justifyContent: 'space-between',
  },
  fontStyle: {
    fontSize: Platform.OS === 'ios' ? rMS(13) : rMS(14),
    color: colors.fontDark,
    fontWeight: '500',
  },
  childrenContainer: {
    height: rMS(30),
    width: rMS(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  errorContainer: {
    marginTop: -20,
    marginLeft: 16,
    marginBottom: 4,
  },
  errorText: {
    fontSize: rMS(10),
    fontWeight: '700',
  },
  iosShowText: {
    paddingVertical: Platform.OS === 'ios' ? rMS(6) : rMS(4),
  },
});
