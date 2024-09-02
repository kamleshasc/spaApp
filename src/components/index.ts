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
import BookingTimeLineList from './screen/booking/BookingTimeLineList';
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
};

export {UI, SCREEN};
