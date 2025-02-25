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

  // const downloadPdf = async () => {
  //   if (!data) return;
  //   try {
  //     const {dirs} = ReactNativeBlobUtil.fs;
  //     const dirToSave =
  //       Platform.OS === 'ios' ? dirs.DownloadDir : dirs.DownloadDir;
  // const configfb = {
  //   fileCache: true,
  //   addAndroidDownloads: {
  //     useDownloadManager: true,
  //     notification: true,
  //     mediaScannable: true,
  //     path: `${dirToSave}/Invoice.pdf`,
  //   },
  //   mime: 'application/pdf',
  // };
  //     const configOptions = Platform.select({
  //       ios: configfb,
  //       android: configfb,
  //     });

  //     ReactNativeBlobUtil.config(configOptions || {})
  //       .fetch(
  //         'GET',
  //         `${API_URL}/invoices/pdf/download/${invoiceId}`,
  //         {},
  //       )
  //       .then(res => {
  //         // console.log(res.data, 'res');

  //         // if (Platform.OS === 'ios') {
  //         //   ReactNativeBlobUtil.fs.writeFile(configfb.path, data, 'base64');
  //         //   ReactNativeBlobUtil.ios.previewDocument(configfb.path);
  //         // }
  //         if (Platform.OS === 'android') {
  //           ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
  //             {
  //               name: 'invoice.pdf',
  //               parentFolder: '',
  //               mimeType: 'application/pdf',
  //             },
  //             'Download',
  //             res.path(),
  //           ).then(dest =>
  //             ReactNativeBlobUtil.android.actionViewIntent(
  //               dest,
  //               'application/pdf',
  //             ),
  //           );
  //         }
  //       })
  //       .catch(e => {
  //         console.log('invoice Download==>', e);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const checkPermission = async () => {
  //   // Request write permission on Android
  //   if (Platform.OS === 'android') {
  //     try {
  //       // const granted = await PermissionsAndroid.request(
  //       //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       //   {
  //       //     title: 'Storage Permission Required',
  //       //     message: 'App needs access to your storage to download the file',
  //       //     buttonPositive: 'OK',
  //       //   },
  //       // );
  //       // if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //       //   console.log('Storage Permission Not Granted');
  //       //   return;
  //       // }

  //       // let permission = [
  //       //   PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       // ];

  //       // let status = await PermissionsAndroid.requestMultiple(permission);
  //       // console.log(status, 'status');

  //       const writePermission = await request(
  //         Platform.OS === 'android'
  //           ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
  //           : PERMISSIONS.IOS.STOREKIT,
  //       );
  //       if (
  //         writePermission !== RESULTS.GRANTED
  //         // photoLibraryPermission !== RESULTS.GRANTED
  //       ) {
  //         Alert.alert(
  //           'Permissions required',
  //           'This app needs permission to download PDF.',
  //         );
  //       }
  //       downloadPdf();
  //     } catch (err) {
  //       console.warn(err);
  //       return;
  //     }
  //   }
  // };

  // const requestPermissionToDownloadPDF = async () => {
  //   const permission =
  //     Platform.OS === 'android'
  //       ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
  //       : PERMISSIONS.IOS.MEDIA_LIBRARY; // Updated for broader use in iOS

  //   try {
  //     // Check the current permission status
  //     const currentStatus = await check(permission);

  //     if (currentStatus !== RESULTS.GRANTED) {
  //       // Request the permission if not already granted
  //       const newStatus = await request(permission);

  //       if (newStatus !== RESULTS.GRANTED) {
  //         Alert.alert(
  //           'Permissions required',
  //           'This app needs permission to download PDF. Please grant the necessary permissions.',
  //           [
  //             {
  //               text: 'Cancel',
  //               style: 'cancel',
  //             },
  //             {
  //               text: 'Open Settings',
  //               onPress: () => Linking.openSettings(),
  //             },
  //           ]
  //         );
  //       } else {
  //         Alert.alert('Permission granted', 'You can now download PDFs.');
  //       }
  //     } else {
  //       Alert.alert('Permission already granted', 'You can download PDFs.');
  //     }
  //   } catch (error) {
  //     console.error('Permission check/request failed:', error);
  //     Alert.alert(
  //       'Error',
  //       'An error occurred while checking or requesting permissions. Please try again.'
  //     );
  //   }
  // };

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
