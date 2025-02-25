import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {rMS} from '../../../config/responsive';
import colors from '../../../config/colors';
import {Image} from 'react-native';
import {IMAGE_URL} from '@env';

interface CategoryList {
  userImage: string;
  name: string;
  onPress: () => void;
}

const CategoryList = ({userImage, name, onPress}: CategoryList) => {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            userImage.length > 0
              ? {uri: IMAGE_URL + userImage}
              : require('../../../assets/images/no_user.png')
          }
        />
      </View>
      <Text style={styles.nameText} numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  root: {
    height: rMS(150),
    backgroundColor: colors.primary,
    flex: 0.5,
    borderRadius: 10,
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
  imageContainer: {
    height: rMS(90),
    width: rMS(90),
    backgroundColor: colors.primary,
    borderRadius: rMS(50),
    alignSelf: 'center',
    marginTop: rMS(10),
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  nameText: {
    fontSize: rMS(15),
    fontWeight: '700',
    color: colors.fontDark,
    textAlign: 'center',
    marginTop: rMS(12),
  },
});
