import {Pressable, StyleSheet, Text, View} from 'react-native';
import {rMS} from '../../../config/responsive';
import colors from '../../../config/colors';

interface SalesBtnOptionsProps {
  selectionType: number;
  onPressValue: (value: number) => void;
}

const SalesBtnOptions = ({
  selectionType,
  onPressValue,
}: SalesBtnOptionsProps) => {
  const handleOnpress = (value: number) => {
    onPressValue(value);
  };

  return (
    <View style={styles.root}>
      <Pressable
        onPress={() => handleOnpress(0)}
        style={[
          styles.listContainer,
          selectionType == 0
            ? styles.listSelectedContainer
            : styles.unSelectedContainer,
        ]}>
        <Text
          style={[
            selectionType == 0 ? styles.selectedText : styles.unselectedText,
          ]}>
          List
        </Text>
      </Pressable>
      <Pressable
        onPress={() => handleOnpress(1)}
        style={[
          styles.overAllContainer,
          selectionType == 1
            ? styles.selectedOverAllContainer
            : styles.unSelectedContainer,
        ]}>
        <Text
          style={[
            selectionType == 1 ? styles.selectedText : styles.unselectedText,
          ]}>
          Over all
        </Text>
      </Pressable>
    </View>
  );
};

export default SalesBtnOptions;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginTop: rMS(15),
    marginHorizontal: rMS(12),
    marginBottom: rMS(15),
  },
  listContainer: {
    flex: 1,
    paddingVertical: rMS(10),
    alignItems: 'center',
  },
  listSelectedContainer: {
    // borderTopLeftRadius: rMS(8),
    borderTopRightRadius: rMS(8),
    borderTopWidth: 2,
    // borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.themePrimary,
  },
  unSelectedContainer: {
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  selectedText: {
    fontSize: rMS(17),
    fontWeight: '500',
    color: colors.themePrimary,
  },
  unselectedText: {
    fontSize: rMS(17),
    fontWeight: '400',
    color: colors.borderColor,
  },
  overAllContainer: {
    flex: 1,
    paddingVertical: rMS(10),
    alignItems: 'center',
  },
  selectedOverAllContainer: {
    borderTopLeftRadius: rMS(8),
    borderLeftWidth: 2,
    borderColor: colors.themePrimary,
    borderTopWidth: 2,
  },
});
