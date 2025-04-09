import React from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/AntDesign';
import Pdf from 'react-native-pdf';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchPdfById} from '../../redux/Action/invoiceAction';
import {UI} from '../../components';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {API_URL} from '@env';
import { checkPermissionsDocument } from '../../config/helper';

type PdfInvoiceProp = StackScreenProps<RootStackParamList, 'PdfInvoice'>;

function PdfInvoice({navigation, route}: PdfInvoiceProp) {
  const {invoiceId} = route.params;
  const {data, errorMsg, isError, isLoader} = useAppSelector(
    state => state.Invoice.getPdfById,
  );
  const dispatchPdf = useAppDispatch();
  const [errorMessage, setErrorMessage] = React.useState<any>('');
  const [showError, setShowError] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => downloadPdf()}
          style={styles.iconContainer}>
          <Icon name="download" size={30} color={colors.themePrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const {dirs} = ReactNativeBlobUtil.fs;
  const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir; // iOS uses DocumentDir
  const fileName = 'Invoice.pdf';
  const filePath = `${dirToSave}/${fileName}`;

  const configfb = {
    fileCache: true,
    path: filePath,
    mime: 'application/pdf',
  };
  const androidConfig = {
    ...configfb,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      path: filePath,
    },
  };

  const configOptions = Platform.select({
    ios: configfb,
    android: androidConfig,
  });

  const downloadPdf = async () => {
    const hasPermission = await checkPermissionsDocument();
    if (!hasPermission) return;
    ReactNativeBlobUtil.config(configOptions || {})
      .fetch('GET', `${API_URL}/invoices/pdf/download/${invoiceId}`, {})
      .then(res => {
        if (Platform.OS === 'ios') {
          ReactNativeBlobUtil.ios.previewDocument(res.path());
        } else if (Platform.OS === 'android') {
          ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
            {
              name: fileName,
              parentFolder: '',
              mimeType: 'application/pdf',
            },
            'Download',
            res.path(),
          ).then(dest =>
            ReactNativeBlobUtil.android.actionViewIntent(
              dest,
              'application/pdf',
            ),
          );
        }
      })
      .catch((e: unknown) => {
        Alert.alert(
          'Download Error',
          'Failed to download the invoice. Please try again.',
        );
      });
  };

  React.useEffect(() => {
    if (isError && !showError) {
      setShowError(isError);
      setErrorMessage(errorMsg);
    }
  }, [isLoader]);

  const getPdfDetails = async () => {
    try {
      await dispatchPdf(fetchPdfById({invoiceId})).unwrap();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error);
    }
  };

  React.useEffect(() => {
    getPdfDetails();
  }, []);

  if (isLoader) {
    return <UI.Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fullScreen}>
        <Pdf
          source={{
            uri: `data:application/pdf;base64,${data ? data : ''}`,
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
      </View>
      <UI.Toast
        message={errorMessage}
        visible={showError}
        onDismissSnackBar={() => setShowError(false)}
      />
    </SafeAreaView>
  );
}

export default PdfInvoice;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  fullScreen: {
    flex: 1,
  },
  iconContainer: {
    height: 40,
    width: 40,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '80%',
  },
});
