import { Request } from 'express';
import { HasPermission, TryCatch } from '../decorators';
import HttpStatus from '../helpers/HttpStatus';
import CustomAPIError from '../exceptions/CustomAPIError';
import Permission, { IPermissionModel } from '../models/Permission';
import datasources from  '../services/dao';
import { appCommonTypes } from '../@types/app-common';

import HttpResponse = appCommonTypes.HttpResponse;
import { $saveRoleSchema, IRoleModel } from '../models/Role';
import Joi from 'joi';
import Generic from '../utils/Generic';
import { appEventEmitter } from '../services/AppEventEmitter';
import { MANAGE_ALL } from '../config/settings';

export default class RoleController {
  @TryCatch
  @HasPermission([MANAGE_ALL])
  public async createRole(req: Request) {

    const role = await this.createRoleAndPermission(req);
    
    // const { permit } = req.body;
    // const role = await datasources.roleDAOService.create({ ...req.body });
  
    // for (const permissionName of permit) {
    //   const permission = await datasources.permissionDAOService.findByAny({ name: permissionName });
    //   if (permission) {
    //     role.permissions.push(permission._id);
    //   } else {
    //     // Handle the case when a permission is not found
    //     throw new Error(`Permission '${permissionName}' not found.`);
    //   }
    // }
    // await role.save();
  
    const response: HttpResponse<IRoleModel> = {
      code: HttpStatus.OK.code,
      message: HttpStatus.OK.value,
      result: role,
    };
  
    return Promise.resolve(response);
  }
  

  private async createRoleAndPermission(req: Request) {

    console.log(req.user, 'user')

    const { error, value } = Joi.object<IRoleModel>($saveRoleSchema).validate(req.body);

    if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

    const exist_role = await datasources.roleDAOService.findByAny({name: value.name});
    if(exist_role) return Promise.reject(CustomAPIError.response('Role name already exist', HttpStatus.BAD_REQUEST.code));

    const roleValues: Partial<IRoleModel> = {
      name: value.name,
      slug: Generic.generateSlug(value.name)
    };

    const role = await datasources.roleDAOService.create(roleValues as IRoleModel);

    //@ts-ignore
    for (const permissionName of value.permit) {
      const permission = await datasources.permissionDAOService.findByAny({ name: permissionName });
      if (permission) {
        role.permissions.push(permission._id);
      } else {
        // Handle the case when a permission is not found
        throw new Error(`Permission '${permissionName}' not found.`);
      }
    }
  
    await role.save();

    return role;
  }

}