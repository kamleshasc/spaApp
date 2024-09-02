import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../config/colors';
import {rMS} from '../../config/responsive';
import React from 'react';

interface CustomRadioTypes {
  firstText: string;
  secondText: string;
  status: boolean;
  firstTextPressed: () => void;
  secondTextPressed: () => void;
  radioTitle: string;
}

const CustomRadio: React.FC<CustomRadioTypes> = ({
  radioTitle,
  firstText,
  secondText,
  status,
  firstTextPressed,
  secondTextPressed,
}) => {
  return (
    <View style={style.container}>
      <Text style={style.containerText}>{radioTitle}</Text>
      <View style={style.radioContainr}>
        <View style={style.radioSubContainer}>
          <TouchableOpacity
            style={[
              status == true ? style.activeContainer : style.deactiveContainer,
            ]}
            onPress={firstTextPressed}>
            <View
              style={[
                status == true
                  ? style.activeinnerContainer
                  : style.deactiveInnerContainer,
              ]}
            />
          </TouchableOpacity>
          <Text style={style.radioText}>{firstText}</Text>
        </View>
        <View style={style.radioSubContainer}>
          <TouchableOpacity
            style={[
              status == false ? style.activeContainer : style.deactiveContainer,
            ]}
            onPress={secondTextPressed}>
            <View
              style={[
                status == false
                  ? style.activeinnerContainer
                  : style.deactiveInnerContainer,
              ]}
            />
          </TouchableOpacity>
          <Text style={style.radioText}>{secondText}</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomRadio;

const style = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 24,
  },
  containerText: {
    flex: 0.5,
    fontSize: rMS(15),
    fontWeight: '600',
    color: colors.fontDarkColor,
  },
  radioContainr: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  radioSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deactiveContainer: {
    height: rMS(25),
    width: rMS(25),
    backgroundColor: colors.borderColor,
    borderRadius: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deactiveInnerContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  radioText: {
    marginLeft: 5,
    fontSize: rMS(12),
    fontWeight: '500',
    color: colors.fontDark,
  },
  activeContainer: {
    height: rMS(25),
    width: rMS(25),
    backgroundColor: colors.themePrimary,
    borderRadius: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeinnerContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
});
