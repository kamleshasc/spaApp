import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import {HelperText} from 'react-native-paper';
import colors from '../../config/colors';
import {rMS} from '../../config/responsive';

interface CustomInputUIProps {
  showIcon?: boolean;
  textInputConfig: TextInputProps;
  disableInput?: boolean;
  isError?: boolean;
  errorMsg?: string;
  iconPressed?: () => void;
  children?: React.ReactNode;
  stylesInput?: object;
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
}: CustomInputUIProps) {
  return (
    <>
      <View style={[styles.container, stylesInput]}>
        <View style={{width: showIcon ? '85%' : '95%'}}>
          <TextInput
            style={styles.fontStyle}
            editable={!disableInput}
            {...textInputConfig}
            placeholderTextColor={'#73777B'}
          />
        </View>
        {showIcon && (
          <TouchableOpacity
            style={styles.childrenContainer}
            onPress={iconPressed}>
            {children}
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
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rMS(20),
    marginHorizontal: 20,
    paddingVertical: rMS(4),
    paddingHorizontal: rMS(12),
    justifyContent: 'space-between',
  },
  fontStyle: {
    fontSize: rMS(14),
    lineHeight: 22,
    color: colors.fontDark,
    fontWeight: '500',
  },
  childrenContainer: {
    height: 30,
    width: 30,
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
});
