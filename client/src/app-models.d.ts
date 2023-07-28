declare module '@app-models' {
  // import { CheckListType } from '@app-types';
  interface IPermission {
    permission_id: number;
    name: string;
    action: string;
    subject: string;
  }

  interface IUser {
    
  }

  interface IVendor {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    profileImageUrl: string
  }
}
