import React from 'react';
import {
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
import { clearGetSalesReportPDFErrorMsg } from '../../redux/Reducer/salesReducer/getSalesPdf';

type PdfInvoiceProp = StackScreenProps<RootStackParamList, 'SalesReportPdf'>;

const SalesReportPdf = ({navigation, route}: PdfInvoiceProp) => {
  const {startDate, endDate, s_type} = route.params;
  const dispatchSalesReport = useAppDispatch();
  const {data, isLoader, errorMsg, isError} = useAppSelector(
    state => state.sales.getSalePdf,
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}>
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
