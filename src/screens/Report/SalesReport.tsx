import React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';
import {SCREEN, UI} from '../../components';
import {rMS} from '../../config/responsive';
import Icon from 'react-native-vector-icons/AntDesign';
import useDeviceType from '../../hooks/useDeviceType';
import {HelperText} from 'react-native-paper';
import {
  DateToYYYYMMDD,
  getDateInNewYorkTimeZoneMoment,
} from '../../config/helper';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHook';
import {fetchSalesReport} from '../../redux/Action/salesReportAction';
import {clearGetSalesReportErrorMsg} from '../../redux/Reducer/salesReducer/getSalesReport';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerNavigationParamList} from '../../navigation/DrawerNavigation';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';

interface showModalType {
  showModal: boolean;
  inputType: string;
}

const initalShowModal: showModalType = {
  showModal: false,
  inputType: '',
};

interface inputObjString {
  value: any;
  isValid: boolean;
  message: string;
}

interface salesReportInputs {
  from: inputObjString;
  to: inputObjString;
}

const initalInputs: salesReportInputs = {
  from: {value: '', isValid: true, message: ''},
  to: {value: '', isValid: true, message: ''},
};

const paymentTypeData = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Cash',
    value: 'cash',
  },
  {
    label: 'Zelle',
    value: 'zelle',
  },
  {
    label: 'Credit Card',
    value: 'credit_card',
  },
];

type SalesReportProps = CompositeScreenProps<
  DrawerScreenProps<DrawerNavigationParamList, 'SalesReport'>,
  StackScreenProps<RootStackParamList>
>;

type SelectedType = {
  label: any;
  value: any;
};

const initalSelectedType: SelectedType = {
  label: '',
  value: '',
};

function SalesReport({navigation}: SalesReportProps) {
  const {isTablet} = useDeviceType();
  const [selectionType, setSelectionType] = React.useState<number>(0);
  const [showModal, setShowModal] =
    React.useState<showModalType>(initalShowModal);
  const [inputs, setInputs] = React.useState<salesReportInputs>(initalInputs);
  const initialSelectedDate = getDateInNewYorkTimeZoneMoment();
  const [showError, setShowError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const salesReportDispatch = useAppDispatch();
  const {
    data: salesData,
    isError,
    errorMsg,
    isLoader,
  } = useAppSelector(state => state.sales.getSalesReport);
  const [selectedType, setSelectedType] =
    React.useState<SelectedType>(initalSelectedType);

  const overAllDetails = salesData?.length > 0 ? salesData[0]?.overAll : false;
  const disableBtn = inputs.from.value && inputs.to.value ? false : true;
  const isData = salesData.length > 0 ? true : false;

  const inputsHandler = (inputIdentifier: string, enteredValue: any) => {
    try {
      setInputs(curInputs => {
        return {
          ...curInputs,
          [inputIdentifier]: {value: enteredValue, isValid: true},
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <SCREEN.SalesDetailsList
        salesDate={item?.month}
        salesData={item?.monthList}
      />
    );
  };

  const handleChangeOption = (e: number) => {
    setSelectionType(e);
  };

  const handleShowDatePick = (value: string) => {
    setShowModal(state => {
      return {
        ...state,
        showModal: !state.showModal,
        inputType: value,
      };
    });
    if (showError) {
      setShowError(false);
      setErrorMessage('');
    }
  };

  const handleDateChange = (value: Date) => {
    inputsHandler(showModal.inputType, value);
    setShowModal(initalShowModal);
  };

  const handleCancelChange = () => {
    setShowModal(initalShowModal);
  };

  const handleShowButton = () => {
    let showMessage = '';
    let showErrorStatus = false;

    if (
      String(inputs.from.value).length <= 0 &&
      String(inputs.to.value).length <= 0
    ) {
      showErrorStatus = true;
      showMessage = 'Please Select Date';
    } else if (String(inputs.from.value).length <= 0) {
      showErrorStatus = true;
      showMessage = 'Please Select From Date';
    } else if (String(inputs.to.value).length <= 0) {
      showErrorStatus = true;
      showMessage = 'Please Select To Date';
    } else {
      showErrorStatus = false;
      showMessage = '';
    }

    if (showErrorStatus) {
      setShowError(true);
      setErrorMessage(showMessage);
    } else {
      salesReport();
    }
  };

  const salesReport = () => {
    let startDate = DateToYYYYMMDD(inputs?.from?.value);
    let endDate = DateToYYYYMMDD(inputs?.to?.value);

    salesReportDispatch(fetchSalesReport({startDate, endDate})).unwrap();
  };

  const onRefresh = () => {
    if (inputs.from.value.length <= 0 || inputs.to.value.length <= 0) {
      setErrorMessage('Please Select Date');
      setShowError(true);
    } else {
      salesReport();
    }
  };

  const onSelectType = (value: any) => {
    setSelectedType(value);
  };

  const handleProcessedBtn = () => {
    let paramsValue = {
      startDate: DateToYYYYMMDD(inputs?.from?.value),
      endDate: DateToYYYYMMDD(inputs?.to?.value),
      s_type: selectedType?.value,
    };
    navigation.navigate('SalesReportPdf', paramsValue);
  };

  return (
    <SafeAreaView style={styles.root}>
      {showModal.showModal && (
        <UI.DatePick
          options={{
            minimumDate:
              showModal?.inputType == 'from'
                ? ''
                : inputs?.from?.value
                ? inputs?.from?.value
                : '',
          }}
          dateValue={
            inputs?.from?.value ? inputs?.from?.value : initialSelectedDate
          }
          handleCancelPressed={handleCancelChange}
          handleOkayPressed={(value: Date) => handleDateChange(value)}
        />
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={isLoader}
        renderItem={() => (
          <>
            <View style={styles.dateRangeContainer}>
              <Text style={styles.dateRangeText}>Date Range</Text>
            </View>
            <View style={styles.rowContainer}>
              <UI.Input
                iconPressed={() => handleShowDatePick('from')}
                stylesInput={styles.inputContainer}
                disableText={true}
                textInputConfig={{
                  placeholder: 'Select From',
                  editable: false,
                  value: inputs?.from?.value
                    ? DateToYYYYMMDD(inputs?.from?.value)
                    : '',
                }}
                childrenStyle={{
                  style: {
                    marginRight: isTablet ? 0 : 8,
                  },
                }}
                showIcon={true}>
                <Icon name="calendar" size={rMS(25)} color="black" />
              </UI.Input>
              <UI.Input
                iconPressed={() => handleShowDatePick('to')}
                stylesInput={styles.inputContainer}
                disableText={true}
                textInputConfig={{
                  placeholder: 'Select To',
                  editable: false,
                  value: inputs?.to?.value
                    ? DateToYYYYMMDD(inputs?.to?.value)
                    : '',
                }}
                childrenStyle={{
                  style: {
                    marginRight: isTablet ? 0 : 8,
                  },
                }}
                showIcon={true}>
                <Icon name="calendar" size={rMS(25)} color="black" />
              </UI.Input>
            </View>
            {showError && (
              <View style={styles.inputErrorContainer}>
                <HelperText
                  type="error"
                  visible={true}
                  style={styles.errorText}>
                  {errorMessage}
                </HelperText>
              </View>
            )}
            <View style={styles.showContainer}>
              <UI.Btn
                disabledBtn={disableBtn || isLoader}
                onPressBtn={handleShowButton}>
                Show
              </UI.Btn>
            </View>
            <SCREEN.SalesReportOption
              onPressValue={handleChangeOption}
              selectionType={selectionType}
            />
            {selectionType == 0 && (
              <FlatList
                data={salesData?.length > 0 ? salesData[0]?.reportList : []}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
              />
            )}

            {selectionType == 1 && (
              <>
                <SCREEN.SalesOverAll
                  totalCash={overAllDetails ? overAllDetails?.cash : 0}
                  totalCreditCard={
                    overAllDetails ? overAllDetails?.credit_card : 0
                  }
                  totalZelle={overAllDetails ? overAllDetails?.zelle : 0}
                />
                {isData && (
                  <>
                    <View style={styles.downloadOptionContainer}>
                      <Text style={styles.downloadOptionText}>
                        Download Options
                      </Text>
                    </View>
                    <View style={styles.typeContainer}>
                      <Text style={styles.typeText}>Type :</Text>
                      <View style={styles.dropDownParentContainer}>
                        <UI.DropDown
                          styles={styles.dropDownContainer}
                          data={paymentTypeData}
                          onChange={onSelectType}
                          placeholder={'Select Type'}
                          value={selectedType.value}
                        />
                      </View>
                    </View>
                    <UI.Btn
                      onPressBtn={handleProcessedBtn}
                      styles={styles.btnContainer}>
                      Processed
                    </UI.Btn>
                  </>
                )}
              </>
            )}
          </>
        )}
        data={new Array(1)}
        keyExtractor={(_, index) => index.toString()}
      />
      <UI.Toast
        message={errorMsg}
        visible={isError}
        onDismissSnackBar={() =>
          salesReportDispatch(clearGetSalesReportErrorMsg())
        }
      />
    </SafeAreaView>
  );
}

export default SalesReport;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    marginLeft: rMS(12),
    marginVertical: rMS(15),
  },
  dateRangeText: {
    fontSize: rMS(20),
    fontWeight: '600',
    color: colors.fontDark,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    marginBottom: 0,
    flex: 1,
    marginHorizontal: rMS(10),
  },
  inputErrorContainer: {
    alignSelf: 'center',
    marginTop: rMS(15),
    marginBottom: rMS(-15),
  },
  errorText: {
    fontSize: rMS(13),
    fontWeight: '700',
  },
  showContainer: {
    width: '40%',
    marginTop: rMS(25),
    alignSelf: 'center',
  },
  downloadOptionContainer: {
    marginTop: rMS(15),
    paddingLeft: rMS(20),
    borderBottomWidth: 1,
    borderColor: colors.themePrimary,
    paddingBottom: rMS(12),
  },
  downloadOptionText: {
    fontSize: rMS(15),
    fontWeight: '600',
    color: colors.themePrimary,
  },
  typeContainer: {
    flexDirection: 'row',
    marginTop: rMS(20),
    paddingHorizontal: rMS(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeText: {
    fontSize: rMS(16),
    fontWeight: '500',
    color: colors.fontDark,
    marginRight: rMS(20),
  },
  dropDownContainer: {
    paddingLeft: rMS(13),
    marginHorizontal: 0,
    marginBottom: 0,
  },
  btnContainer: {
    marginVertical: rMS(20),
    width: '35%',
    alignSelf: 'center',
  },
  dropDownParentContainer: {
    flex: 1,
  },
});
