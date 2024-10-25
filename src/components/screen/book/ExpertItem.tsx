import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {rMS, rV} from '../../../config/responsive';
import colors from '../../../config/colors';
import {IMAGE_URL} from '@env';

interface ExpertItemProps {
  onPress: () => void;
  selectedExpert?: boolean;
  imgUrl: string;
  name: string;
}

const ExpertItem: React.FC<ExpertItemProps> = ({
  onPress,
  selectedExpert,
  imgUrl,
  name,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, selectedExpert && styles.selectedExpert]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            imgUrl
              ? {uri: `${IMAGE_URL}${imgUrl}`}
              : require('../../../assets/images/no_user.png')
          }
          resizeMode="cover"
        />
      </View>
      <Text style={styles.text} numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: rMS(17),
    paddingHorizontal: rMS(20),
    borderRadius: rMS(18),
    width: rMS(140),
    alignItems: 'center',
    marginHorizontal: rMS(10),
    elevation: 4,
    marginVertical: rMS(10),
    justifyContent: 'center',
  },
  imageContainer: {
    height: rMS(70),
    width: rMS(70),
    backgroundColor: 'white',
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: rMS(15),
    marginTop: rV(12),
    textAlign: 'center',
    fontWeight: '500',
    color: colors.fontDark,
  },
  selectedExpert: {
    borderWidth: 2,
    borderColor: colors.themePrimary,
  },
});

export default ExpertItem;
