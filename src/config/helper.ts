import axios from 'axios';
import {ImagePickerResponse} from 'react-native-image-picker';
import {ImagePickerResponseObject} from '../components/UI/CustomModalImagePicker';
import moment from 'moment-timezone';
import {Alert, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

// const timeZone = 'Asia/Kolkata';
// const timeZone = 'Asia/Calcutta';
const timeZone = 'America/New_York';

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

// export const getCurrentDateZone = () => {
//   const options: any = {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     timeZone: timeZone,
//   };

//   const now = new Date();
//   const formatter = new Intl.DateTimeFormat('en-CA', options); // 'en-CA' formats to YYYY-MM-DD
//   return formatter.format(now);
// };
export const getCurrentDateZone = () => {
  const options: any = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timeZone,
  };

  const now = new Date();

  // Format date and time according to the specified time zone
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const parts = formatter.formatToParts(now);

  // Extract date and time parts
  const year = parts.find(part => part.type === 'year')?.value;
  const month = parts.find(part => part.type === 'month')?.value;
  const day = parts.find(part => part.type === 'day')?.value;
  const hour = parts.find(part => part.type === 'hour')?.value;
  const minute = parts.find(part => part.type === 'minute')?.value;
  const second = parts.find(part => part.type === 'second')?.value;

  // Construct a date string in ISO format
  const isoDateString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;

  // Return a new Date object, which will be in the local time zone of the environment
  return new Date(isoDateString);
};

export const getCurrentTime = () => {
  const options: any = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timeZone,
  };

  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', options); // 'en-US' formats to HH:MM in 24-hour format
  return formatter.format(now);
};

export const getCurrentDateZoneToString = () => {
  const options: any = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timeZone,
  };

  const now = new Date();

  // Format date and time according to the specified time zone
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const parts = formatter.formatToParts(now);

  // Extract date and time parts
  const year = parts.find(part => part.type === 'year')?.value;
  const month = parts.find(part => part.type === 'month')?.value;
  const day = parts.find(part => part.type === 'day')?.value;
  const hour = parts.find(part => part.type === 'hour')?.value;
  const minute = parts.find(part => part.type === 'minute')?.value;
  const second = parts.find(part => part.type === 'second')?.value;

  // Construct a date string in ISO format
  // const isoDateString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  const isoDateString = `${year}-${month}-${day}`;

  // Return a new Date object, which will be in the local time zone of the environment
  return isoDateString;
};

interface TimeSlot {
  label: string;
  value: string;
}

export function generateTimeSlots(
  startTime: string,
  endTime: string,
): TimeSlot[] {
  const timeSlots: TimeSlot[] = [];

  // Parse start and end time
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  // Iterate through each hour and minute from start to end, with 15-minute intervals
  for (let hour = startHour; hour <= endHour - 1; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      // Skip the iteration if the time is out of the given range
      if (hour === startHour && minute < startMinute) continue;
      if (hour === endHour && minute > endMinute) break;

      const timeLabel = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;

      timeSlots.push({
        label: timeLabel,
        value: timeLabel,
      });
    }
  }

  return timeSlots;
}

interface TimeResult {
  originalTime: string;
  updatedTime: string;
}

export function addDurationToTime(time: string, duration: number): TimeResult {
  // Parse the input time
  const [hour, minute] = time.split(':').map(Number);

  // Calculate total minutes from the given time
  const totalMinutes = hour * 60 + minute;

  // Add the duration to the total minutes
  const updatedTotalMinutes = totalMinutes + duration;

  // Calculate the new hour and minute
  const updatedHour = Math.floor(updatedTotalMinutes / 60) % 24; // Use modulus 24 to handle the case when it exceeds 24 hours
  const updatedMinute = updatedTotalMinutes % 60;

  // Format the new time with leading zeros if necessary
  const updatedTime = `${updatedHour
    .toString()
    .padStart(2, '0')}:${updatedMinute.toString().padStart(2, '0')}`;

  return {
    originalTime: time,
    updatedTime: updatedTime,
  };
}

export const convertDateStringToDateWithZone = (dateString: string) => {
  const options: any = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timeZone,
  };

  const inputDate = new Date(dateString);

  // Format the input date according to the specified time zone
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const parts = formatter.formatToParts(inputDate);

  // Extract date and time parts
  const year = parts.find(part => part.type === 'year')?.value;
  const month = parts.find(part => part.type === 'month')?.value;
  const day = parts.find(part => part.type === 'day')?.value;
  const hour = parts.find(part => part.type === 'hour')?.value;
  const minute = parts.find(part => part.type === 'minute')?.value;
  const second = parts.find(part => part.type === 'second')?.value;

  // Construct the date string with time zone info
  const isoDateString = `${year}-${month}-${day}T${hour}:${minute}:${second}`;

  // Return a new Date object with the specified time zone considered
  return new Date(isoDateString);
};

export function getDateInNewYorkTimeZone(date = new Date()) {
  // Convert the given date to ISO string for precise handling
  const isoString: string = date.toISOString();

  // Create a new date in America/New_York time zone using Intl.DateTimeFormat
  const options: Intl.DateTimeFormatOptions = {timeZone: 'America/New_York'};
  const formatter = new Intl.DateTimeFormat('en-US', {
    ...options,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // const parts = formatter.formatToParts(new Date(isoString)).reduce((acc, part) => {
  //   if (part.type !== 'literal') {
  //     acc[part.type] = part.value;
  //   }
  //   return acc;
  // }, {});

  // // Construct the new date object
  // const newYorkDate = new Date(
  //   `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`
  // );

  // return newYorkDate;
  const parts: {[key: string]: string} = formatter
    .formatToParts(new Date(isoString))
    .reduce((acc: {[key: string]: string}, part) => {
      if (part.type !== 'literal') {
        acc[part.type] = part.value;
      }
      return acc;
    }, {});

  // Construct the new date object
  const newYorkDate = new Date(
    `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`,
  );

  return newYorkDate;
}

export const getDateInNewYorkTimeZoneMoment = (date = new Date()) => {
  const newYorkDate = moment().tz('America/New_York');
  return newYorkDate.toDate();
  // return moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
};

export const getItPastDate = (date: string) => {
  const now = moment().tz('America/New_York').startOf('day');
  const bookingDate = moment.tz(date, 'MMMM DD, YYYY', 'America/New_York');
  const isPastDate = now.isAfter(bookingDate);

  return isPastDate;
};

export const checkPermissionsDocument = async (): Promise<any> => {
  if (Platform.OS === 'ios') {
    const permission = await check(PERMISSIONS.IOS.MEDIA_LIBRARY);
    if (permission === RESULTS.DENIED || permission === RESULTS.BLOCKED) {
      const requestResult = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
      if (requestResult !== RESULTS.GRANTED) {
        Alert.alert(
          'Permission Required',
          'The app requires media library permissions to save the document. Please allow it in settings.',
          [{text: 'OK'}],
        );
      }
      return false;
    }
    return true;
  } else if (Platform.OS === 'android') {
    if (Platform.Version < 33) {
      const permission = await check(
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      );
      if (permission === RESULTS.DENIED || permission === RESULTS.BLOCKED) {
        const requestResult = await request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );
        if (requestResult !== RESULTS.GRANTED) {
          Alert.alert(
            'Permission Required',
            'The app requires storage permissions to save the document. Please allow it in settings.',
            [{text: 'OK'}],
          );
          return false;
        }
      }
    }
    return true;
  }
};
