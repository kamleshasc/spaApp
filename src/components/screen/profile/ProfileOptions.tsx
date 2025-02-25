import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../config/colors';
import useDimensionListener from '../../../hooks/useDimensionListener';
import {rMS} from '../../../config/responsive';

interface ProfileOptionsProps {
  onPress: () => void;
  name: string;
}

const ProfileOptions = ({onPress, name}: ProfileOptionsProps) => {
  const {width: screenWidth} = useDimensionListener().screen;
  return (
    <TouchableOpacity
      style={[styles.root, {width: screenWidth < 450 ? '90%' : '100%'}]}
      onPress={onPress}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/right-arrow-icon.png')}
            tintColor={colors.themePrimary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileOptions;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 8,
    marginBottom: 12,
    ...Platform.select({
      android: {
        elevation: rMS(2),
      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: rMS(2) },
        shadowRadius: rMS(2),
        shadowOpacity: 0.15,
      },
    }),
  },
  nameContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: rMS(13),
    fontWeight: '700',
    color: colors.themePrimary,
  },
  imageContainer: {
    height: rMS(35),
    width: rMS(35),
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
