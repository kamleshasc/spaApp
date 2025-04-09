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
import Icon from 'react-native-vector-icons/AntDesign';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import Pdf from 'react-native-pdf';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchPdfReport} from '../../redux/Action/salesReportAction';
import {UI} from '../../components';
import {clearGetSalesReportPDFErrorMsg} from '../../redux/Reducer/salesReducer/getSalesPdf';
import {checkPermissionsDocument} from '../../config/helper';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {API_URL} from '@env';

type PdfInvoiceProp = StackScreenProps<RootStackParamList, 'SalesReportPdf'>;

const SalesReportPdf = ({navigation, route}: PdfInvoiceProp) => {
  const {startDate, endDate, s_type} = route.params;
  const dispatchSalesReport = useAppDispatch();
  const {data, isLoader, errorMsg, isError} = useAppSelector(
    state => state.sales.getSalePdf,
  );

  const {dirs} = ReactNativeBlobUtil.fs;
  const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir; // iOS uses DocumentDir
  const fileName = 'salesReport.pdf';
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={downloadPdf} style={styles.iconContainer}>
          <Icon name="download" size={30} color={colors.themePrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getPDFReport = () => {
    try {
      dispatchSalesReport(fetchPdfReport({startDate, endDate, s_type}));
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPdf = async () => {
    const hasPermission = await checkPermissionsDocument();

    if (!hasPermission) return;

    ReactNativeBlobUtil.config(configOptions || {})
      .fetch(
        'GET',
        `${API_URL}/report/pdf/download/saleReport/?startDate=${startDate}&endDate=${endDate}&tType=${s_type}`,
        {},
      )
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
    getPDFReport();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
      <View style={{flex: 1}}>
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
          style={{flex: 1, width: '100%', height: '80%'}}
        />
      </View>
      <UI.Toast
        message={errorMsg}
        visible={isError}
        onDismissSnackBar={() => {
          clearGetSalesReportPDFErrorMsg();
        }}
      />
    </SafeAreaView>
  );
};

export default SalesReportPdf;

const styles = StyleSheet.create({
  iconContainer: {
    height: 40,
    width: 40,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
