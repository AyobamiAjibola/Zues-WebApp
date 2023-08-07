import React, { createContext, useState } from 'react';

import { AppContextProps } from '@app-interfaces';
import AbilityContext, { ability } from './AbilityContext';
import { IVendor } from '@app-models';
import PrivateLayout from '../components/layouts/PrivateLayout';

export const AppContext = createContext<AppContextProps | null>(null);

export default function AppContextProvider() {
  const [openSideNav, setOpenSideNav] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [planTab, setPlanTab] = useState<number>(0);
  const [displayNav, setDisplayNav] = useState<boolean>(false);
  const [vendor, setVendor] = useState<IVendor | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <AbilityContext.Provider value={ability}>
      <AppContext.Provider
        value={{
          openSideNav,
          setOpenSideNav,
          isSignedIn,
          setIsSignedIn,
          planTab,
          setPlanTab,
          vendor,
          setVendor,
          displayNav,
          setDisplayNav,
          darkMode,
          setDarkMode
        }}>
        <PrivateLayout />
      </AppContext.Provider>
    </AbilityContext.Provider>
  );
}
