import {Text, View} from 'react-native';
import useDimensionListener from '../../../hooks/useDimensionListener';
import {rMS} from '../../../config/responsive';
import colors from '../../../config/colors';

const PrivacyPolicyLoader = () => {
  const {height} = useDimensionListener().screen;

  return (
    <View
      style={{
        height: height - rMS(150),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: rMS(15),
          fontWeight: '500',
          color: colors.fontLightGrey,
        }}>
        Loading...
      </Text>
    </View>
  );
};

export default PrivacyPolicyLoader;
