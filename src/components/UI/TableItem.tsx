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
import {IMAGE_URL} from '@env';

interface TableItemProps {
  name?: string | number;
  ImgUrl?: string;
  bunchData?: any[];
  link?: string;
  onLinkPress?: () => void;
  showImg?: boolean;
}

const TableItem: React.FC<TableItemProps> = ({
  name,
  ImgUrl,
  bunchData,
  link,
  showImg,
  onLinkPress,
}) => {
  const {width, height} = useWindowDimensions();
  return (
    <View
      style={[
        styles.container,
        {width: width > 820 || height > 820 ? rS(83) : rS(100)},
      ]}>
      {showImg && (
        <View style={[styles.imageContainer]}>
          <Image
            style={styles.image}
            source={
              ImgUrl
                ? {uri: `${IMAGE_URL}${ImgUrl}`}
                : require('../../assets/images/no_user.png')
            }
          />
        </View>
      )}
      {bunchData && bunchData?.length > 1 ? (
        bunchData.map((value, index) => (
          <View style={styles.textListContainer}>
            <Text style={[styles.text, styles.textListItem]} key={index}>
              {`${value}`}
            </Text>
          </View>
        ))
      ) : bunchData && bunchData?.length > 0 ? (
        <View style={styles.textListContainer} key={bunchData.toString()}>
          <Text style={[styles.text, styles.textListItem]}>
            {bunchData?.toString()}
          </Text>
        </View>
      ) : (
        <></>
      )}
      {link && link?.length > 0 && (
        <TouchableOpacity style={styles.linkContainer} onPress={onLinkPress}>
          <Text style={styles.textLink}>{link}</Text>
        </TouchableOpacity>
      )}
      {name && <Text style={styles.text}>{name}</Text>}
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
    paddingVertical: rMS(4),
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
  textListContainer: {
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginVertical: 2,
  },
  textListItem: {
    fontSize: rMS(11),
  },
});

export default TableItem;
