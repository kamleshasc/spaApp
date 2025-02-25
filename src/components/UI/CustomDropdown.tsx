import React from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import colors from '../../config/colors';
import {View} from 'react-native';
import {HelperText} from 'react-native-paper';
import {rMS} from '../../config/responsive';
import useDeviceType from '../../hooks/useDeviceType';
interface Option {
  label: string;
  value: string;
}

interface Props {
  data: Option[];
  value: string;
  onChange: (value: any) => void;
  placeholder: string;
  isError?: boolean;
  errorMsg?: string;
  styles?: object;
}

const CustomDropdown: React.FC<Props> = ({
  data,
  value,
  onChange,
  placeholder,
  isError,
  errorMsg,
  styles,
}) => {
  const {isTablet} = useDeviceType();
  const height = isTablet ? 70 : 50;
  const renderItem = (item: {label: any}) => {
    return (
      <View style={style.itemContainer}>
        <Text style={style.itemFont}>{item.label}</Text>
      </View>
    );
  };

  return (
    <>
      <Dropdown
        style={[style.dropdown, styles,{height}]}
        placeholderStyle={style.placeholderStyle}
        selectedTextStyle={style.selectedTextStyle}
        itemTextStyle={style.itemTextStyle}
        iconStyle={style.iconStyle}
        data={data}
        maxHeight={150}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        iconColor="black"
        renderItem={renderItem}
      />
      {isError && (
        <View style={style.errorContainer}>
          <HelperText type="error" visible={true} style={style.errorFont}>
            {errorMsg}
          </HelperText>
        </View>
      )}
    </>
  );
};

export default CustomDropdown;

const style = StyleSheet.create({
  dropdown: {
    // paddingHorizontal:rMS(12),
    paddingRight:rMS(12),
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginBottom: rMS(20),
    marginHorizontal: 20,
    
    // paddingLeft:rMS(20)
  },
  placeholderStyle: {
    fontSize: rMS(13),
    fontWeight: '600',
    color:colors.placeholder,
  },
  selectedTextStyle: {
    fontSize: rMS(12),
    fontWeight: '500',
    color: colors.fontDark,
    // color: 'pink',
    // paddingLeft:rMS(0)
  },
  itemTextStyle:{
    // paddingVertical:10,
    fontSize: rMS(14),
    fontWeight: '500',
    color: colors.fontDark,
  },
  iconStyle: {
    width: rMS(30),
    height: rMS(30),
  },
  errorContainer: {
    marginTop: -20,
    marginLeft: 16,
    marginBottom: 4,
  },
  errorFont: {
    fontSize: rMS(10),
    fontWeight: '700',
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomColor: colors.secondaryDark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  itemFont: {
    fontSize: rMS(14),
    color: colors.fontDark,
    fontWeight:'400'
  },
});
