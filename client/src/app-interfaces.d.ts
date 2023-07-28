declare module '@app-interfaces' {
  import React from 'react';
  import { AnyObjectType } from '@app-types';
  import {
    IPermission
  } from '@app-models';
  import { JwtPayload } from 'jsonwebtoken';

  interface IModule {
    customers: { name: string; data: AnyObjectType[] };
    // appointments: { name: string; data: AnyObjectType[] };
    vehicles: { name: string; data: AnyObjectType[] };
    transactions: { name: string; data: AnyObjectType[] };
    // sales: { name: string; data: AnyObjectType[] };
    expenses: { name: string; data: AnyObjectType[] };
  }

  interface ITableColumnOptions {
    onView?: (args: any) => void;
    onEdit?: (args: any) => void;
    onDelete?: (args: any) => void;
  }

  type CustomJwtPayload = JwtPayload & {
    permissions: IPermission[];
    userId: string;
    [p: string]: any;
  };

  interface IThunkAPIPayloadError {
    message: string;
  }

  interface ISignInModel {
    email: string;
    password: string;
  }

  interface ISignUpModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  interface HttpResponse<T> {
    message: string;
    code: number;
    timestamp?: string;
    result?: T | null;
    results?: T[];
  }

  interface ITab {
    tag?: string;
    name: string;
    Element: ReturnType<any>; //JSX.Element
    disableTab?: boolean;
  }

  interface AppContextProps {
    openSideNav: boolean;
    setOpenSideNav: React.Dispatch<React.SetStateAction<boolean>>;
    planTab: number;
    setPlanTab: React.Dispatch<React.SetStateAction<number>>;
    mobileDate: boolean;
    setMobileDate: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    vendor: IVendor | null;
    setVendor: React.Dispatch<React.SetStateAction<IVendor | null>>;
  }

  interface PubContextProps {
    forgotPass: boolean,
    setForgotPass: React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface VendorPageContextProps {
    vendor?: IVendor;
    setVendor: React.Dispatch<React.SetStateAction<IVendor | undefined>>;
  }

  export interface IComponentErrorState {
    hasError: boolean;
    errorMessage: string;
  }

  interface ApiResponseSuccess<T> {
    message: string;
    code: number;
    timestamp?: string;
    result?: T;
    results?: T[];
  }

  interface ApiResponseError {
    message: string;
    code: number;
  }

  interface IImageButtonData {
    id: any;
    url: string;
    title: string;
    width: string;
    questionId?: any;
    file?: File;
    partner?: any;
  }

  interface IInitTransaction {
    authorizationUrl: string;
    accessCode?: string;
    invoiceId?: number;
    reference: string;
  }

  interface IChangePasswordModel {
    password: string;
    confirmPassword: string;
  }
}
