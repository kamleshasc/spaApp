import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../config/colors';
import {HelperText} from 'react-native-paper';
import {rMS} from '../../config/responsive';
import useDeviceType from '../../hooks/useDeviceType';

interface Option {
  label: string;
  value: string;
}

interface Props {
  data: Option[];
  selected: string[];
  placeholder: string;
  onChange: (selected: any[]) => void;
  isError: boolean;
  errorMsg: any;
}

const CustomDropdownMultiSelect: React.FC<Props> = ({
  data,
  selected,
  placeholder,
  onChange,
  isError,
  errorMsg,
}) => {
  const {isTablet} = useDeviceType();
  const height = isTablet ? 70 : 50;

  const renderItem = (item: {label: any}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <MultiSelect
          style={[styles.dropdown,{height}]}
          iconColor="black"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={selected}
          maxHeight={150}
          onChange={onChange}
          renderItem={renderItem}
          renderSelectedItem={(item, unSelect) => {
            return (
              <TouchableOpacity
                style={styles.renderContainer}
                onPress={() => unSelect && unSelect(item)}>
                <View style={styles.selectedStyle}>
                  <Text style={styles.textSelectedStyle}>{item.label}</Text>
                  <Icon color="black" name="delete" size={rMS(15)} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {isError && (
        <View style={styles.errorContainer}>
          <HelperText style={styles.errorText} type="error" visible={true}>
            {errorMsg}
          </HelperText>
        </View>
      )}
    </>
  );
};

export default CustomDropdownMultiSelect;

const styles = StyleSheet.create({
  container: {padding: 0, marginHorizontal: 20, marginBottom: 20},
  dropdown: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal:rMS(12)
  },
  placeholderStyle: {
    fontSize: rMS(13),
    fontWeight: '500',
    color: colors.placeholder,
  },
  selectedTextStyle: {
    fontSize: rMS(14),
    fontWeight: '400',
    color: colors.fontDark,
  },
  iconStyle: {
    width: rMS(30),
    height: rMS(30),
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomColor: colors.secondaryDark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSelectedStyle: {
    backgroundColor: 'white',
    marginRight: 5,
    fontSize: rMS(13),
    color:colors.fontDark
  },
  renderContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: rMS(12),
    paddingVertical: rMS(8),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 14,
  },
  errorContainer: {
    marginTop: -20,
    marginLeft: 16,
    marginBottom: 4,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
