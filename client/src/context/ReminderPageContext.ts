import { createContext } from 'react';
import { VendorPageContextProps } from '@app-interfaces';

const VendorPageContext = createContext<VendorPageContextProps | null>(null);

export default VendorPageContext;