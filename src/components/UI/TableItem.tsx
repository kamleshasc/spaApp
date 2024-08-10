import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {rMS, rS} from '../../config/responsive';
import colors from '../../config/colors';

interface TableItemProps {
  name?: string | number;
  ImgUrl?: string;
  bunchData?: any[];
  link?: string;
  onLinkPress?: () => void;
}

const TableItem: React.FC<TableItemProps> = ({
  name,
  ImgUrl,
  bunchData,
  link,
  onLinkPress,
}) => {
  const {width, height} = useWindowDimensions();
  return (
    <View
      style={[
        styles.container,
        {width: width > 820 || height > 820 ? rS(83) : rS(100)},
      ]}>
      {ImgUrl ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `http://192.168.1.70:3200/images/${ImgUrl}`,
            }}
          />
        </View>
      ) : bunchData && bunchData?.length > 0 ? (
        <Text style={styles.text}>{bunchData?.toString()}</Text>
      ) : link && link?.length > 0 ? (
        <TouchableOpacity style={styles.linkContainer} onPress={onLinkPress}>
          <Text style={styles.textLink}>{link}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.text}>{name}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rMS(8),
    backgroundColor: colors.primary,
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 60,
  },
  imageContainer: {
    height: 50,
    width: 55,
    backgroundColor: 'gray',
    borderRadius: 40,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    color: '#000',
    fontSize: rMS(13),
    fontWeight: '500',
  },
  linkContainer: {
    width: '100%',
    // height: '45%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textLink: {
    color: 'blue',
    fontSize: rMS(13),
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default TableItem;
