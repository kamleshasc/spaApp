import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../config/colors';
import {rMS} from '../../../config/responsive';

type PayOptionProps = {
  onPress: () => void;
  imageUrl: any;
  name: string;
  selected: boolean;
};

const PayOption = ({imageUrl, name, onPress, selected}: PayOptionProps) => {
  const selectedColor = selected ? colors.themePrimary : colors.black;
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.subContainer} onPress={onPress}>
          <View style={styles.imageContainer}>
            <Image
              tintColor={selected ? colors.themePrimary : colors.black}
              style={styles.imageStyle}
              source={imageUrl}
            />
          </View>
          <Text style={[styles.text, {color: selectedColor}]}>{name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PayOption;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginHorizontal: rMS(25),
  },
  container: {
    backgroundColor: colors.primary,
    marginBottom: rMS(10),
    flex: 1,
  },
  subContainer: {
    backgroundColor: colors.primary,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: rMS(2)},
    shadowRadius: rMS(4),
    shadowOpacity: 0.15,
    borderRadius: rMS(10),
    flexDirection: 'row',
    paddingVertical: rMS(10),
    paddingHorizontal: rMS(20),
    alignItems: 'center',
  },
  imageContainer: {
    height: rMS(35),
    width: rMS(35),
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: rMS(13),
    fontWeight: '500',
    marginLeft: rMS(20),
  },
});
