import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {rMS, rV} from '../../config/responsive';
import colors from '../../config/colors';

interface HeaderProp {
  onPress: () => void;
  headerName?: any;
  showHeaderName?: boolean;
}

const CustomHeader = ({onPress, headerName, showHeaderName}: HeaderProp) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.headerSubContainer} onPress={onPress}>
        <Image source={require('../../assets/images/left_arrow_icon.png')} />
      </TouchableOpacity>
      {showHeaderName && (
        <View style={styles.headerNameContainer}>
          <Text style={styles.headerNameText}>{headerName}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomHeader;
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: rV(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSubContainer: {
    height: rMS(40),
    width: rMS(60),
    marginLeft: rMS(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerNameContainer: {
    height: rMS(40),
    justifyContent: 'center',
  },
  headerNameText: {
    fontSize: rMS(15),
    fontWeight: '600',
    color: colors.fontDark,
  },
});
