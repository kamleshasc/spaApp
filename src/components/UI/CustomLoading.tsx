import {ActivityIndicator, StyleSheet, View} from 'react-native';
import colors from '../../config/colors';

function CustomLoading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={'black'} />
    </View>
  );
}
export default CustomLoading;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
