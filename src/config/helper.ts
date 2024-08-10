import axios from 'axios';
import {ImagePickerResponse} from 'react-native-image-picker';
import {ImagePickerResponseObject} from '../components/UI/CustomModalImagePicker';

export const DateFormateMMMMDDYYY = (value: any) => {
  const date = new Date(value);
  const month = date.toLocaleString('en-GB', {month: 'long'});
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};

type ErrorResponseData = {
  data: any;
  errors: string[];
  message: string;
  statusCode: number;
  success: boolean;
};

export const errorMsgWrap = (error: any) => {
  let errorMessage = 'Unknown error occurred';
  if (axios.isAxiosError(error) && error.response) {
    console.log(error.response.data.message, 'error.response');
    const responseData = error.response.data as ErrorResponseData;

    errorMessage =
      'message' in responseData
        ? responseData.message
        : 'Unknown error occurred';

    // errorMessage =
    //   'data' in error.response
    //     ? (error.response.data as {error: string}).error
    //     : error.message;
    // (errorMessage =
    //   error.response.data.message || 'Error occurred while fetching data');
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  return errorMessage;
};

export const formatMobileNumber = (mobileNumber: any) => {
  const area = String(mobileNumber.area).padStart(3, '0');
  const exchange = String(mobileNumber.exchange).padStart(3, '0');
  const subscriber = String(mobileNumber.subscriber).padStart(4, '0');
  return area + exchange + subscriber;
};

export const deformatMobileNumber = (formattedNumber: string) => {
  const mobileStr = String(formattedNumber).padStart(10, '0');

  const area = mobileStr.slice(0, 3);
  const exchange = mobileStr.slice(3, 6);
  const subscriber = mobileStr.slice(6, 10);

  return {
    area,
    exchange,
    subscriber,
  };
};

export const ImageResponseCheck = (
  response: ImagePickerResponse,
): ImagePickerResponseObject => {
  let errorStatus: boolean;
  let errorMsg: any;
  let data: any;
  if (response.didCancel) {
    errorStatus = true;
    errorMsg = 'Image Not Selected';
    data = null;
    return {errorStatus, errorMsg, data};
  } else if (response.errorCode == 'camera_unavailable') {
    errorStatus = true;
    errorMsg = 'Camera Not Avaliable';
    data = null;
    return {errorStatus, errorMsg, data};
  } else if (response.errorCode == 'permission') {
    errorStatus = true;
    errorMsg = 'This application needs camera permission';
    data = null;
    return {errorStatus, errorMsg, data};
  } else if (response.errorCode == 'others') {
    errorStatus = true;
    errorMsg = response.errorMessage;
    data = null;
    return {errorStatus, errorMsg, data};
  } else {
    const responseResult = response.assets;

    if (!responseResult) {
      errorStatus = true;
      errorMsg = 'Image is not supported.';
      data = null;
      return {errorStatus, errorMsg, data};
    }

    const file = responseResult['0'];

    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/png'
    ) {
      errorStatus = true;
      errorMsg = 'Only .jpeg,.jpg and .png Format Are Supported.';
      data = null;
      return {errorStatus, errorMsg, data};
    }
    errorStatus = false;
    errorMsg = '';
    data = file;
    return {errorStatus, errorMsg, data};
  }
};

export const DateToYYYYMMDD = (value: Date) => {
  const date = new Date(value);
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate;
};

export const converTo24HoursTime = (value: Date) => {
  const date = new Date(value);
  const format24Hr = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  return format24Hr;
};

export const formatAndAddMinutes = (dateString: Date, minutesToAdd: string) => {
  const date = new Date(dateString);
  const originalDateFormatted = converTo24HoursTime(date);
  date.setUTCMinutes(date.getUTCMinutes() + Number(minutesToAdd));
  const newDateFormatted = converTo24HoursTime(date);
  return {
    originalDateFormatted,
    newDateFormatted,
  };
};
