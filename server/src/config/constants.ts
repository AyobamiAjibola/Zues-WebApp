import { appCommonTypes } from '../@types/app-common';
import QueueEvents = appCommonTypes.QueueEvents;

  export const MESSAGES = {
    http: {
      200: 'Ok',
      201: 'Accepted',
      202: 'Created',
      400: 'Bad Request. Please Contact Support.',
      401: 'You Are Not Authenticated. Please Contact Support.',
      403: 'You Are Forbidden From Accessing This Resource.',
      404: 'Not Found. Please Contact Support.',
      500: 'Something Went Wrong. Please Contact Support.',
    },
    image_size_error: 'Image size exceeds the allowed limit',
    image_type_error: 'Invalid image format. Only JPEG, PNG, and JPG images are allowed'
  };

  export const LOG_LEVEL_COLORS = {
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red',
  };

  export const QUEUE_EVENTS: QueueEvents = {
    name: 'DEFAULT',
  };

  export const AGENDA_COLLECTION_NAME = 'plan_expire';

  export const UPLOAD_BASE_PATH = 'uploads';
  export const HOME_ADDRESS = 'HOME';
  export const OFFICE_ADDRESS = 'OFFICE';

  export const BASIC_PLAN = 'basic';
  export const STANDARD_PLAN = 'standard';
  export const TRIAL_PLAN = 'trial';
  export const PREMIUM_PLAN = 'premium';

  export const MAX_SIZE_IN_BYTE = 1000 * 1024; // 1MB
  export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

  export const PAYMENT_CHANNELS = ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer', 'eft'];