// @ts-nocheck
import { 
  ContactPage,
  Dashboard,
  FormatListBulleted,
  Home,
  Info,
  Inventory,
  Payments,
  Person,
  ShoppingCart,
  Storage,
  Storefront,
  TextSnippet,
  Tune
} from '@mui/icons-material';
import React from 'react';

export interface ISideNav {
  tag: string;
  name: string;
  path: string;
  Icon: SvgIconComponent;
}

const SignInPage = React.lazy(() => import('../pages/authentication/SignInPage'));
const SignUpPage = React.lazy(() => import('../pages/authentication/SignUpPage'));
const ForgotPasswordPage = React.lazy(() => import('../pages/authentication/ForgotPasswordPage'));
const VerificationPage = React.lazy(() => import('../pages/authentication/VerificationPage'));
const NewPasswordPage = React.lazy(() => import('../pages/authentication/NewPasswordPage'));
const SignUpSuccessPage = React.lazy(() => import('../pages/authentication/SignUpSuccessPage'));
const HomePage = React.lazy(() => import('../context/AppContextProvider'));

export const sideNavs: ISideNav[] = [
  { tag: 'all', name: 'Home', path: '/home', Icon: Home },
  { tag: 'all', name: 'About', path: '/about-us', Icon: Info },
  { tag: 'all', name: 'Packages', path: '/packages', Icon: Inventory },
  { tag: 'all', name: 'Features', path: '/features', Icon: FormatListBulleted },
  { tag: 'all', name: 'Contact us', path: '/contact-us', Icon: ContactPage},
  { tag: 'all', name: 'Overview', path: '/overview', Icon: TextSnippet },
  { tag: 'vendor', name: 'User Profile', path: '/profile', Icon: Person },
  { tag: 'vendor', name: 'Payment', path: '/payment', Icon: Payments },
  { tag: 'vendor', name: 'Volume', path: '/volume', Icon: Tune },
  { tag: 'vendor', name: 'Best selling item', path: '/best-selling-item', Icon: Storefront },
  { tag: 'vendor', name: 'Fast selling item', path: '/fast-selling-item', Icon: ShoppingCart },
  { tag: 'vendor', name: 'Niche selection', path: '/niche-selection', Icon: Storage },
  // { tag: 'all', name: 'Sign-in', path: '/sign-in', Icon: Dashboard },
  
];

export const topNavs: ISideNav[] = [
  { tag: 'all', name: 'Home', path: '/home', Icon: Home },
  { tag: 'all', name: 'About', path: '/about-us', Icon: Info },
  { tag: 'all', name: 'Packages', path: '/packages', Icon: Inventory },
  { tag: 'all', name: 'Features', path: '/features', Icon: FormatListBulleted },
  { tag: 'all', name: 'Contact us', path: '/contact-us', Icon: ContactPage},
];

export const routes = [
  { name: 'Sign in', path: '/sign-in', Element: SignInPage, isPublic: true },
  { name: 'Sign up', path: '/sign-up', Element: SignUpPage, isPublic: true },
  { name: 'Forgot password', path: '/forgot-password', Element: ForgotPasswordPage, isPublic: true },
  { name: 'Verification', path: '/verification', Element: VerificationPage, isPublic: true },
  { name: 'New Password', path: '/change-password', Element: NewPasswordPage, isPublic: true },
  { name: 'Congratulations', path: '/sign-up-success', Element: SignUpSuccessPage, isPublic: true },
  {
    name: 'Home',
    path: '*',
    Element: HomePage,
    isPublic: false,
  },
];
