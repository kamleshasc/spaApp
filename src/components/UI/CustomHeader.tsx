import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {rMS, rV} from '../../config/responsive';

interface HeaderProp {
  onPress: () => void;
}

const CustomHeader = ({onPress}: HeaderProp) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.headerSubContainer} onPress={onPress}>
        <Image source={require('../../assets/images/left_arrow_icon.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: rV(20),
  },
  headerSubContainer: {
    height: rMS(40),
    width: rMS(60),
    marginLeft: rMS(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
