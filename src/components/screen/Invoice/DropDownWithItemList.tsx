import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import colors from '../../../config/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {HelperText} from 'react-native-paper';
import {rMS} from '../../../config/responsive';
import useDeviceType from '../../../hooks/useDeviceType';
type Service = {
  name: string;
  duration: string;
  price: number;
};

type DataItem = {
  label: string;
  value: string;
};

type DropDownWithItemListProps = {
  addValue: (value: string) => void;
  selectedServices: Service[];
  data: DataItem[];
  deleteItem: (index: number) => void;
  isError: boolean;
  errorMsg: any;
};

function DropDownWithItemList({
  addValue,
  selectedServices,
  data,
  deleteItem,
  isError,
  errorMsg,
}: DropDownWithItemListProps) {
  const [dropDownValue, setDropDownValue] = React.useState<string>('');
  const {isTablet} = useDeviceType();
  const height = isTablet ? 70 : 50;

  const renderItem = (item: DataItem) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemFont}>{item.label}</Text>
      </View>
    );
  };

  const SelectedDropDownList = ({
    serviceValue,
    selectedIndex,
  }: {
    serviceValue: Service;
    selectedIndex: number;
  }) => {
    return (
      <View style={styles.tableListContainer}>
        <View style={styles.tableListSubContainer}>
          <View style={styles.tableItemContainer}>
            <View style={styles.tableItemSubContainer}>
              <Text style={styles.tableItemQuestionText}>Service:</Text>
              <Text style={styles.tableItemValueText} numberOfLines={2}>
                {serviceValue?.name}
              </Text>
            </View>
            <View style={styles.tableItemQuestionSecondType}>
              <Text style={styles.tableItemQuestionText}>Duration:</Text>
              <Text style={styles.tableItemValueText} numberOfLines={1}>
                {serviceValue?.duration}
              </Text>
            </View>
            <View style={styles.tableItemQuestionSecondType}>
              <Text style={styles.tableItemQuestionText}>Price:</Text>
              <Text style={styles.tableItemValueText} numberOfLines={1}>
                {`$ ${serviceValue?.price.toFixed(2)}`}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => deleteItem(selectedIndex)}>
            <Icon name="delete" size={rMS(22)} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onChangeValue = (item: DataItem) => {
    setDropDownValue(item.value);
  };

  const onAddPress = () => {
    if (dropDownValue) {
      addValue(dropDownValue);
      setDropDownValue('');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown,{height}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={150}
          labelField="label"
          valueField="value"
          placeholder={'Select'}
          value={dropDownValue}
          onChange={onChangeValue}
          iconColor="black"
          renderItem={renderItem}
        />
        <View style={{flex: 0.2}}>
          <TouchableOpacity style={styles.btnContainer} onPress={onAddPress}>
            <Text style={styles.btnText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isError && (
        <View style={styles.errorContainer}>
          <HelperText type="error" visible={true} style={styles.errorText}>
            {errorMsg}
          </HelperText>
        </View>
      )}
      {selectedServices &&
        selectedServices?.length > 0 &&
        selectedServices.map((value, _index) => (
          <SelectedDropDownList
            serviceValue={value}
            selectedIndex={_index}
            key={_index}
          />
        ))}
    </>
  );
}

export default DropDownWithItemList;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 22,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dropdown: {
    paddingRight: 8,
    paddingLeft: 14,
    borderWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 10,
    flex: 0.7,
  },
  placeholderStyle: {
    fontSize: rMS(13),
    fontWeight: '500',
    color:colors.placeholder
  },
  selectedTextStyle: {
    fontSize: rMS(14),
    fontWeight: '500',
    color: colors.fontDark,
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
  btnContainer: {
    paddingVertical: rMS(15),
    borderRadius: rMS(10),
    backgroundColor: colors.themePrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: rMS(13),
    fontWeight:'bold',
    color: colors.fontLight,
  },
  tableListContainer: {
    marginBottom: 20,
    marginHorizontal: 22,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: 'black',
    padding: 10,
    flex: 1,
    ...Platform.select({
      android: {
        elevation: rMS(3),
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: rMS(2) },
        shadowRadius: rMS(4),
        shadowOpacity: 0.15,
      },
    }),
  },
  tableListSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableItemContainer: {
    width: '85%',
  },
  tableItemSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  tableItemQuestionText: {
    fontSize: rMS(13),
    fontWeight: '600',
    color: colors.fontDark,
    marginRight: 2,
  },
  tableItemValueText: {
    fontSize: rMS(12),
    fontWeight: '500',
    color: colors.fontDark,
  },
  tableItemQuestionSecondType: {
    flexDirection: 'row',
    alignItems: 'center',
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
