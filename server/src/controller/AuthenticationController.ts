import { appCommonTypes } from "../@types/app-common";
import HttpResponse = appCommonTypes.HttpResponse;
import BcryptPasswordEncoder = appCommonTypes.BcryptPasswordEncoder;
import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../decorators";
import Joi from "joi";
import { $loginSchema, $saveVendorSchema, IVendorModel } from "../models/Vendor";
import CustomAPIError from "../exceptions/CustomAPIError";
import HttpStatus from "../helpers/HttpStatus";
import datasources from '../services/dao';
import settings from "../config/settings";
import Generic from "../utils/Generic";
import { IUserModel } from "../models/User";
import { BASIC_PLAN } from "../config/constants";
// import authService from "../services/AuthService";

export default class AuthenticationController {
    private declare readonly passwordEncoder: BcryptPasswordEncoder;

    constructor(passwordEncoder: BcryptPasswordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

        /**
     * 
     * @name customer_signup
     * @param req
     * customer signup
     */
    @TryCatch
    public async admin_login(req: Request) {
      const { error, value } = Joi.object<IUserModel>($loginSchema).validate(req.body);

      if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

      const user = await datasources.userDAOService.findByAny({email: value.email});
      if(!user) return Promise.reject(CustomAPIError.response(HttpStatus.UNAUTHORIZED.value, HttpStatus.BAD_REQUEST.code));

      const hash = user.password;
      const password = value.password;

      const isMatch = await this.passwordEncoder.match(password.trim(), hash.trim());
      if(!isMatch) return Promise.reject(CustomAPIError.response(HttpStatus.UNAUTHORIZED.value, HttpStatus.UNAUTHORIZED.code));

      if(!user.active)
      return Promise.reject(
          CustomAPIError.response('Account is disabled. Please contact administrator', HttpStatus.UNAUTHORIZED.code)
      );

      const role = await datasources.roleDAOService.findByIdPopulatePermissions(user.role);

      if(!role) return Promise.reject(CustomAPIError.response('Role is not found', HttpStatus.UNAUTHORIZED.code));

      const permissions: any = [];
      
      for (const _permission of role.permissions) {
        permissions.push(_permission)
      }

      //generate JWT
      const jwt = Generic.generateJwt({
        userId: user.id,
        permissions
      });

      //update user authentication date and authentication token
      const updateValues = {
        loginDate: new Date(),
        loginToken: jwt
      };

      await datasources.userDAOService.updateByAny({user}, updateValues);

      const response: HttpResponse<string> = {
        code: HttpStatus.OK.code,
        message: 'Login successful',
        result: jwt
      };

      return Promise.resolve(response);
    }

    /**
     * 
     * @name customer_signup
     * @param req
     * customer signup
     */
    @TryCatch
    public async signup_vendor(req: Request) {
      const { error, value } = Joi.object<IVendorModel>($saveVendorSchema).validate(req.body);

      if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

      const email = await datasources.vendorDAOService.findByAny({email: value.email});
      if(email) return Promise.reject(CustomAPIError.response('Email already in use', HttpStatus.BAD_REQUEST.code));

      const role = await datasources.roleDAOService.findByAny({
        slug: settings.roles[1]
      });
      if(!role) return Promise.reject(CustomAPIError.response('Role not found', HttpStatus.BAD_REQUEST.code));

      const sub = await datasources.subscriptionDAOService.findByAny({ name: BASIC_PLAN });
      if (!sub) {
        return Promise.reject(CustomAPIError.response('Subscription not found', HttpStatus.BAD_REQUEST.code));
      }
      const password = await this.passwordEncoder.encode(value.password as string);

      const vendorValues: Partial<IVendorModel> = {
        role: role._id,
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        active: true,
        password: password,
        subscription: {
          plan: sub?.name as string,
          startDate: null,
          endDate: null
        }
      };

      const vendor = await datasources.vendorDAOService.create(vendorValues as IVendorModel);

      role.users.push(vendor._id);
      await role.save();

      // const _role = await datasources.roleDAOService.findByIdPopulatePermissions(vendor.role);
      // if(!_role) return Promise.reject(CustomAPIError.response('Role is not found', HttpStatus.UNAUTHORIZED.code));

      // //generate JWT
      // const jwt = Generic.generateJwt({
      //   userId: vendor.id,
      //   permissions: _role.permissions,
      //   subscription: {
      //     plan: vendor.subscription.plan,
      //     startDate: vendor.subscription.startDate,
      //     endDate: vendor.subscription.endDate
      //   }
      // });

      // //update user authentication date and authentication token
      // const updateValues = {
      //   loginDate: new Date(),
      //   loginToken: jwt
      // };

      // await datasources.vendorDAOService.updateByAny({_id: vendor._id}, updateValues);
      
      const response: HttpResponse<IVendorModel> = {
        code: HttpStatus.OK.code,
        message: 'Account created successfully',
        result: vendor,
      };
  
      return Promise.resolve(response);

    };

    @TryCatch
    public async sign_in_vendor(req: Request) {
      const { error, value } = Joi.object<IVendorModel>($loginSchema).validate(req.body);

      if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

      const vendor = await datasources.vendorDAOService.findByAny({email: value.email});
      if(!vendor) return Promise.reject(CustomAPIError.response(HttpStatus.UNAUTHORIZED.value, HttpStatus.BAD_REQUEST.code));

      if(vendor.googleId || vendor.facebookId || vendor.instagramId) {
        return Promise.reject(
          CustomAPIError
          .response(`You tried signing in as ${value.email} using a password, which is not the authentication method you used during sign up. Try again using the authentication method you used during sign up.`, HttpStatus.BAD_REQUEST.code))
      };
      
      const hash = vendor.password as string;
      const password = value.password as string;

      const isMatch = await this.passwordEncoder.match(password.trim(), hash ? hash.trim() : '');
      if(!isMatch) return Promise.reject(CustomAPIError.response(HttpStatus.UNAUTHORIZED.value, HttpStatus.UNAUTHORIZED.code));

      if(!vendor.active)
        return Promise.reject(
          CustomAPIError.response('Account is disabled. Please contact administrator', HttpStatus.UNAUTHORIZED.code)
        );

      const role = await datasources.roleDAOService.findByIdPopulatePermissions(vendor.role);
      if(!role) return Promise.reject(CustomAPIError.response('Role is not found', HttpStatus.UNAUTHORIZED.code));

      const permissions: any = [];
      
      for (const _permission of role.permissions) {
        permissions.push(_permission)
      }

      //generate JWT
      const jwt = Generic.generateJwt({
        userId: vendor.id,
        isExpired: vendor.isExpired,
        permissions,
        subscription: {
          plan: vendor.subscription.plan,
          startDate: vendor.subscription.startDate,
          endDate: vendor.subscription.endDate
        }
      });

      //update user authentication date and authentication token
      const updateValues = {
        loginDate: new Date(),
        loginToken: jwt
      };

      await datasources.vendorDAOService.updateByAny({vendor}, updateValues);

      const response: HttpResponse<string> = {
        code: HttpStatus.OK.code,
        message: 'Login successful',
        result: jwt
      };

      return Promise.resolve(response);
    }

    public async loginFailed(req: Request, res:Response) {
      console.log(res, 'error')
      const response: HttpResponse<string> = {
        code: HttpStatus.OK.code,
        message: 'Login successful',
        // result: jwt
      };

      return Promise.resolve(response);
    };

    public googleOAuthFailed(req: Request, res: Response) {
      try {
        res.send('error page')
      } catch (error) {
        return Promise.reject(error)
      }
    }
}