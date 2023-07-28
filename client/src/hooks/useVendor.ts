import { CustomJwtPayload } from '@app-interfaces';
import { IPermission, IVendor } from '@app-models';
import jwt_decode from 'jwt-decode';
import { useEffect, useMemo, useState } from 'react';

import { LOCAL_STORAGE } from '../config/constants';
import settings from '../config/settings';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import { getVendorAction } from '../store/actions/vendorActions';

export default function useVendor() {
  const [isVendor, setIsVendor] = useState<boolean>(false);
  const [vendor, setVendor] = useState<IVendor | null>(null);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  const vendorReducer = useAppSelector(state => state.vendorReducer);
  const dispatch = useAppDispatch();

  const token = useMemo(() => sessionStorage.getItem(settings.auth.admin), []);
  const localPermissions = JSON.parse(sessionStorage.getItem(LOCAL_STORAGE.permissions) as string);

  useEffect(() => {
    // const localPermissions = JSON.parse(sessionStorage.getItem(LOCAL_STORAGE.permissions) as string);

    if(localPermissions){
    if (null !== localPermissions) {
      const permissions = localPermissions as IPermission[];

      permissions.forEach(permission => {
        if (permission.action === 'vendor' && permission.subject === 'permission') setIsVendor(true);
        // else setIsTechAdmin(true);
      });
    } else throw new Error('You are not authorized to access this resource');
    }
  }, [localPermissions]);

  useEffect(() => {
    if (token) {
      const payload = jwt_decode(token) as CustomJwtPayload;

      dispatch(getVendorAction(payload.userId));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if(token) {
      const payload = jwt_decode(token) as CustomJwtPayload;
      if(payload.isExpired) setIsExpired(true) 
    }
  }, [token])

  useEffect(() => {
    if (vendorReducer.getVendorStatus === 'completed') {
      setVendor(vendorReducer.vendor);
    }
  }, [vendorReducer.getVendorStatus, vendorReducer.vendor]);

  return {
    isVendor,
    vendor,
    isExpired
  };
}
