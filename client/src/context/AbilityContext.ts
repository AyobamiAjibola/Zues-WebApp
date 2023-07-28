import { createContext } from 'react';

import { Ability, AbilityBuilder } from '@casl/ability';

import store from '../store';
import { LOCAL_STORAGE } from '../config/constants';
import { createContextualCan } from '@casl/react';
//@ts-ignore
import { IPermission } from '../@app-types';

const ability = new Ability();

store.subscribe(() => {
  //@ts-ignore
  const { authenticationReducer } = store.getState();

  let permissions: IPermission[];

  const localPermissions = JSON.parse(sessionStorage.getItem(LOCAL_STORAGE.permissions) as string);

  if(localPermissions) {
    if (null !== localPermissions) {
      permissions = localPermissions as IPermission[];
  
      ability.update(defineRulesFor(permissions));
    } else {
      permissions = authenticationReducer.permissions;
  
      if (permissions.length) {
        ability.update(defineRulesFor(permissions));
      }
    }
  }
  
});

export const defineRulesFor = (permissions: IPermission[]) => {
  const { can, rules } = new AbilityBuilder(Ability);

  permissions.forEach((permission: IPermission) => {
    const { action, subject } = permission;

    can(action, subject);
  });

  return rules;
};

const AbilityContext = createContext(ability);
const AppCan = createContextualCan(AbilityContext.Consumer);

export { ability, AppCan };

export default AbilityContext;
