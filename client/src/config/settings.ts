// @ts-nocheck
const settings = {
  api: {
    rest: import.meta.env.VITE_REST_ROOT,
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  },
  auth: {
    admin: import.meta.env.VITE_ADMIN_AUTH,
  },
  env: process.env.NODE_ENV,
  primary_color: import.meta.env.VITE_ZUES_PRIMARY_COLOR,
  roles: [
    'SUPER_ADMIN_ROLE',
    'VENDOR_ROLE'
  ],
  permissions: [
    'manage_all',

    'create_user',
    'read_user',
    'update_user',
    'delete_user',

    'create_vendor',
    'read_vendor',
    'update_vendor',
    'delete_vendor',

    'create_role',
    'read_role',
    'update_role',
    'delete_role',

    'read_transaction',
  ],
  error: {
    message: 'Something went wrong. Please try again or contact support',
  }
};

export default settings;
