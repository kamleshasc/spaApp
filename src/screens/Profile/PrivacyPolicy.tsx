import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {SCREEN, UI} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchPrivacyPolicy} from '../../redux/Action/privacyPolicyAction';
import {rMS} from '../../config/responsive';

type PrivacyPolicyProps = NativeStackScreenProps<
  RootStackParamList,
  'PrivacyPolicy'
>;

function PrivacyPolicy({navigation}: PrivacyPolicyProps) {
  const dispatchPrivacyPolicy = useAppDispatch();
  const {data, isLoader} = useAppSelector(
    state => state.privacyPolicy.getPrivacyPolicy,
  );
  const [errorStatus, setErrorStatus] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<any>('');

  const fetchPrivacyPolicyDetails = async () => {
    try {
      await dispatchPrivacyPolicy(fetchPrivacyPolicy()).unwrap();
    } catch (error) {
      setErrorStatus(true);
      setErrorMessage(error);
    }
  };

  React.useEffect(() => {
    fetchPrivacyPolicyDetails();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UI.Header
          onPress={() => navigation.goBack()}
          headerName={'Privacy Policy'}
          showHeaderName={false}
        />
        <View style={{paddingHorizontal: rMS(18)}}>
          {isLoader ? (
            <SCREEN.PrivacyPolicyLoader />
          ) : data.length > 0 ? (
            <SCREEN.PrivacyPolicyDetail data={data[0]} />
          ) : (
            <SCREEN.PrivacyPolicyNotFound />
          )}
        </View>
      </ScrollView>
      <UI.Toast
        message={errorMessage}
        visible={errorStatus}
        onDismissSnackBar={() => setErrorStatus(false)}
      />
    </SafeAreaView>
  );
}

export default PrivacyPolicy;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  contentContainer: {
    flex: 1,
    maxWidth: 600,
    alignSelf: 'center',
    paddingHorizontal: rMS(18),
    width: '100%',
  },
});
