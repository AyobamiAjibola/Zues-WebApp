import moment from 'moment';
import settings from '../config/settings';

export function formatNumberToIntl(amount: number) {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
  }).format(amount);
}

export const filterPhoneNumber = (phone: any) => {
  if (phone.length > 5) {
    let _phone = phone;
    let error = false;
    let message = 'phone number invalid, but fixed';

    // check if phone number was initialize with 234 or +
    if (phone[0] == '+') {
      _phone = (phone.substring(1));
      error = true;
    }

    // check if phone number is 234 instead of 0
    if ((_phone[0] == '2') && (_phone[1] == '3') && (_phone[2] == '4')) {
      _phone = '0' + (_phone.substring(3));
      error = true;
    }

    if ((_phone[0] == '0') && !((_phone[1] == '7') || (_phone[1] == '8') || (_phone[1] == '9'))) {
      // _phone = _phone;
      message = 'Not a Nigerian Number';
      error = true;
    }

    if (_phone.length > 11) {
      message = 'Phone number invalid';
      error = true;
    }

    // filter for white space
    _phone = (_phone.trim());
    _phone = (_phone.replaceAll(" ", ""));
    // _phone = (_phone.replace(/\s+/g, ' ').replace(/^\s/, '').replace(/\s$/, ''));


    return {
      error,
      message: message,
      phone: _phone
    };
  }
  return {
    error: false,
    message: '',
    phone
  };
}

export default function generatePageNumbers(count: number) {
  const pages = [];

  for (let i = 0; i <= count; i++) {
    pages.push(i);
  }

  return pages;
}

export function getImageUrl(imageUrl: any) {
  if (typeof imageUrl === 'object') return URL.createObjectURL(imageUrl);

  return `${settings.api.baseURL}/${imageUrl}`;
}

export function reload() {
  window.location.reload();
}

export function dataURItoBlob(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  //New Code
  return new Blob([ab], { type: mimeString });
}

export function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatDate (value: any) {
  return value ? moment(value).format('LLL') : '-';
}

export function nextServiceDate(lastDate: string, serviceIntervalUnit: string, serviceInterval: any ) {
  const serviceDate = new Date(lastDate);

  if (serviceIntervalUnit === 'month') {
    serviceDate.setMonth(serviceDate.getMonth() + parseInt(serviceInterval));
  } else if (serviceIntervalUnit === 'day') {
    serviceDate.setDate(serviceDate.getDate() + parseInt(serviceInterval));
  } else if (serviceIntervalUnit === 'week') {
    serviceDate.setDate(serviceDate.getDate() + (parseInt(serviceInterval) * 7));
  } else if (serviceIntervalUnit === 'year') {
    serviceDate.setFullYear(serviceDate.getFullYear() + parseInt(serviceInterval));
  } else {
    return console.log('Wrong date')
  }

  // Adjust for leap year if necessary
  const originalYear = serviceDate.getFullYear();
  const isLeapYear = (year: any) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const isServiceDateLeapYear = isLeapYear(originalYear);

  if (isServiceDateLeapYear) {
    if (!isLeapYear(serviceDate.getFullYear())) {
      // Adjust for day when moving from a leap year to a non-leap year
      serviceDate.setDate(serviceDate.getDate() - 1);
    }
  } else {
    if (isLeapYear(serviceDate.getFullYear())) {
      // Adjust for day when moving from a non-leap year to a leap year
      serviceDate.setDate(serviceDate.getDate() + 1);
    }
  }
  // serviceDate.setDate(serviceDate.getDate() + 1);
  const result: any = serviceDate.toISOString().slice(0, 10);
  return result;
}

export function reminderStatus(startDate: string, endDate: any, serviceIntervalUnit: string, serviceInterval: any ) {
  const currentDate = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  const currYear = currentDate.getFullYear();
  const currMonth = currentDate.getMonth();
  const currDay = currentDate.getDate()

  const startYear = start.getFullYear();
  const startMonth = start.getMonth();
  const startDay = start.getDate()

  const endYear = end.getFullYear();
  const endMonth = end.getMonth();
  const endDay = end.getDate()

  if(currYear < startYear && currMonth < startMonth && currDay < startDay) {
    return 'Date is not within range';
  }
  if(currYear > endYear && currMonth > endMonth && currDay > endDay) {
    return 'Date is not within range';
  }
  // if (currentDate < start || currentDate > end) {
  //   return 'Date is not within range';
  // }

  const futureDateLimit = new Date() === start ? new Date() : start;
  const interval = serviceInterval;

  if (serviceIntervalUnit === 'month') {
    futureDateLimit.setMonth(futureDateLimit.getMonth() + parseInt(interval));
  } else if (serviceIntervalUnit === 'week') {
    futureDateLimit.setDate(futureDateLimit.getDate() + (7 * parseInt(interval)));
  } else if (serviceIntervalUnit === 'day') {
    futureDateLimit.setDate(futureDateLimit.getDate() + parseInt(interval));
  }

  if (currentDate <= futureDateLimit) {
    const milliseconds = futureDateLimit.getTime() - currentDate.getTime();
    if (milliseconds > 2678400000) {
      const diffMonths = Math.floor(milliseconds / (30 * 24 * 60 * 60 * 1000));
      return `Due in [${diffMonths}] month(s)`;
    } else if (milliseconds > 604800000) {
      const diffWeeks = Math.floor(milliseconds / (7 * 24 * 60 * 60 * 1000));
      return `Due in [${diffWeeks}] week(s)`;
    } else {
      const diffDays = Math.round(milliseconds / (24 * 60 * 60 * 1000));
      if(diffDays >= 1){
        return `Due in [${diffDays}] day(s)`;
      } else if(diffDays < 1){
        return `Due today`
      }
    }
  } else {
    const currentDateYear = currentDate.getFullYear();
    const currentDateMonth = currentDate.getMonth();
    const currentDateDay = currentDate.getDate();

    const futureDateLimitYear = futureDateLimit.getFullYear();
    const futureDateLimitMonth = futureDateLimit.getMonth();
    const futureDateLimitDay = futureDateLimit.getDate();

    if (
      currentDateYear === futureDateLimitYear &&
      currentDateMonth === futureDateLimitMonth &&
      currentDateDay === futureDateLimitDay
    ) {
      return `Due today`;
    } else {
      const milliseconds = currentDate.getTime() - futureDateLimit.getTime();
      if (milliseconds > 2678400000) {
        const diffMonths = Math.floor(milliseconds / (30 * 24 * 60 * 60 * 1000));
        return `Overdue by [${diffMonths}] month(s)`;
      } else if (milliseconds > 604800000) {
        const diffWeeks = Math.floor(milliseconds / (7 * 24 * 60 * 60 * 1000));
        return `Overdue by [${diffWeeks}] week(s)`;
      } else {
        const diffDays = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
        return `Overdue by [${diffDays}] day(s)`;
      }
    }
  }
}

export function marked(serviceDate: any, currentDate: any) {
  const service_date = new Date(serviceDate);
  const currentDateObj = new Date(currentDate);
  const milliseconds = currentDateObj.getTime() - service_date.getTime();

  const diffDays = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
  const diffWeeks = Math.floor(milliseconds / (7 * 24 * 60 * 60 * 1000));
  const diffMonths = Math.floor(milliseconds / (30 * 24 * 60 * 60 * 1000));

  if (diffDays === 0) {
    return `today`;
  } else if (diffDays === 1) {
    return `yesterday`;
  } else if (diffMonths > 1) {
    return `${diffMonths} month(s) ago`;
  } else if (diffWeeks > 1) {
    return `${diffWeeks} week(s) ago`;
  } else {
    return `${diffDays} day(s) ago`;
  }
}