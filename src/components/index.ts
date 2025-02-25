import CustomButton from './UI/CustomButton';
import CustomDropdown from './UI/CustomDropdown';
import CustomDropdownMultiSelect from './UI/CustomDropdownMultiSelect';
import CustomHeader from './UI/CustomHeader';
import CustomInput from './UI/CustomInput';
import CustomLoading from './UI/CustomLoading';
import CustomModalImagePicker from './UI/CustomModalImagePicker';
import CustomRadio from './UI/CustomRadio';
import DatePickerUI from './UI/DatePickerUI';
import TableHeader from './UI/TableHeader';
import TableItem from './UI/TableItem';
import TableRow from './UI/TableRow';
import ToastMessage from './UI/ToastMessage';
import DropDownWithItemList from './screen/Invoice/DropDownWithItemList';
import ExpertItem from './screen/book/ExpertItem';
import BookingTimeLineList from './screen/booking/BookingTimeLineList';
import BookingItem from './screen/dashboard/BookingItem';
import CategoryList from './screen/dashboard/CategoryList';
import BookedItem from './screen/mybooking/BookedItem';
import PaymentOption from './screen/payment/PaymentOption';
import ServiceList from './screen/payment/ServiceList';
import PrivacyPolicyDetails from './screen/privacyPolicy/PrivacyPolicyDetails';
import PrivacyPolicyLoader from './screen/privacyPolicy/PrivacyPolicyLoader';
import PrivacyPolicyNotFound from './screen/privacyPolicy/PrivacyPolicyNotFound';
import ProfileOptions from './screen/profile/ProfileOptions';
import SalesBtnOptions from './screen/salesReport/SalesBtnOptions';
import SalesDetailsList from './screen/salesReport/SalesDetailsList';
import SalesOverAllDetails from './screen/salesReport/SalesOverAllDetails';
import SubServiceWithList from './screen/service/SubServiceWithList';

const UI = {
  TableH: TableHeader,
  TableI: TableItem,
  TableR: TableRow,
  Toast: ToastMessage,
  DatePick: DatePickerUI,
  Btn: CustomButton,
  DropDown: CustomDropdown,
  DropDownMultiSelect: CustomDropdownMultiSelect,
  Input: CustomInput,
  ImagePickerModal: CustomModalImagePicker,
  Loader: CustomLoading,
  Radio: CustomRadio,
  Header: CustomHeader,
};

const SCREEN = {
  DropDownWithList: DropDownWithItemList,
  ServiceWithList: SubServiceWithList,
  BookingTimeList: BookingTimeLineList,
  ExpertsList: ExpertItem,
  BookedItem: BookedItem,
  DashboardBookingItem: BookingItem,
  CategoryItem: CategoryList,
  PrivacyPolicyDetail: PrivacyPolicyDetails,
  PrivacyPolicyLoader: PrivacyPolicyLoader,
  PrivacyPolicyNotFound: PrivacyPolicyNotFound,
  ProfileOption: ProfileOptions,
  ServiceDetailList: ServiceList,
  PaymentOption: PaymentOption,
  SalesDetailsList: SalesDetailsList,
  SalesReportOption: SalesBtnOptions,
  SalesOverAll: SalesOverAllDetails,
};

export {UI, SCREEN};
