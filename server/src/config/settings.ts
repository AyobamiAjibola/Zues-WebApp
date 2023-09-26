import { appCommonTypes } from '../@types/app-common';
import AppSettings = appCommonTypes.AppSettings;

export const MANAGE_ALL = 'manage_all';
export const VENDOR_PERMISSION = 'vendor_permission'

export const CREATE_USER = 'create_user';
export const READ_USER = 'read_user';
export const UPDATE_USER = 'update_user';
export const DELETE_USER = 'delete_user';

export const CREATE_VENDOR = 'create_vendor';
export const READ_VENDOR = 'read_vendor';
export const UPDATE_VENDOR = 'update_vendor';
export const DELETE_VENDOR = 'delete_vendor';

export const READ_TRANSACTION = 'read_transaction';

export const LOGIN_FAILED_URL = `${process.env.CLIENT_URL}/login-failed`;

export const HOME_URL = `${process.env.CLIENT_URL}/home`;

export const SIGN_IN_SUCCESS_URL = `${process.env.CLIENT_URL}/sign-up-success`;

export const LOGIN_TOKEN = 'token';

const settings: AppSettings = {
  twilio: {
    twilioSid: <string>process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: <string>process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: <string>process.env.TWILIO_PHONE_NUMBER
  },
  paystack: {
    apiKey: <string>process.env.PAYMENT_GW_SECRET_KEY
  },
  nodemailer: {
    email: <string>process.env.NODEMAILER_EMAIL_ADDRESS,
    password: <string>process.env.NODEMAILER_EMAIL_PASSWORD,
    service: <string>process.env.NODEMAILER_SERVICE
  },
  googleOAuth: {
    google_client_id: <string>process.env.GOOGLE_CLIENT_ID,
    google_client_secret: <string>process.env.GOOGLE_CLIENT_SECRET,
    google_callbackURL: <string>process.env.GOOGLE_AUTH_CALLBACKURL
  },
  facebookAuth: {
    client_ID: <string>process.env.FACEBOOK_CLIENT_ID,
    client_secret: <string>process.env.FACEBOOK_CLIENT_SECRET,
    facebook_callbackURL: <string>process.env.FACEBOOK_CALLBACKURL
  },
  instagramAuth: {
    client_ID: <string>process.env.FACEBOOK_CLIENT_ID,
    client_secret: <string>process.env.FACEBOOK_CLIENT_SECRET,
    instagram_callbackURL: <string>process.env.FACEBOOK_CALLBACKURL
  },
  permissions: [
    MANAGE_ALL,
    VENDOR_PERMISSION,

    CREATE_USER,
    READ_USER,
    UPDATE_USER,
    DELETE_USER,

    CREATE_VENDOR,
    READ_VENDOR,
    UPDATE_VENDOR,
    DELETE_VENDOR,

    READ_TRANSACTION
  ],
  roles: [
    'SUPER_ADMIN_ROLE',
    'VENDOR_ROLE'
  ],
  queue: {
    development: {
      host: <string>process.env.QUEUE_CONN_URL,
    },
    production: {
      host: <string>process.env.QUEUE_CONN_URL,
    },
    test: {
      host: <string>process.env.QUEUE_CONN_URL,
    },
  },
  jwt: {
    key: <string>process.env.JWT_KEY,
    expiry: <string>process.env.JWT_EXPIRY,
  },
  redis: {
    development: {
      database: <string>process.env.REDIS_DEV_DB_NAME,
      host: <string>process.env.REDIS_HOST,
      username: <string>process.env.REDIS_USERNAME,
      password: <string>process.env.REDIS_PASSWORD,
      port: <string>process.env.REDIS_PORT,
    },
    production: {
      database: <string>process.env.REDIS_PROD_DB_NAME,
      host: <string>process.env.REDIS_HOST,
      username: <string>process.env.REDIS_USERNAME,
      password: <string>process.env.REDIS_PASSWORD,
      port: <string>process.env.REDIS_PORT,
    },
    test: {
      database: <string>process.env.REDIS_TEST_DB_NAME,
      host: <string>process.env.REDIS_HOST,
      username: <string>process.env.REDIS_USERNAME,
      password: <string>process.env.REDIS_PASSWORD,
      port: <string>process.env.REDIS_PORT,
    },
  },
  mongo: {
    development: {
      host: <string>process.env.MONGO_DEV_HOST,
      port: process.env.MONGO_PORT
    },
    production: {
      host: <string>process.env.MONGO_PROD_HOST,
      port: process.env.MONGO_PORT
    },
    test: {
      host: <string>process.env.MONGO_TEST_HOST,
      port: process.env.MONGO_PORT
    },
  },
  service: {
    env: <string>process.env.NODE_ENV,
    port: <string>process.env.PORT,
    apiRoot: <string>process.env.ROOT_API,
  },
};

export default settings;
