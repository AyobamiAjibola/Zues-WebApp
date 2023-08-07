import { Request } from "express";
import { HasPermission, TryCatch } from "../decorators";
import HttpStatus from "../helpers/HttpStatus";
import CustomAPIError from "../exceptions/CustomAPIError";
import datasources from  '../services/dao';
import { appCommonTypes } from '../@types/app-common';
import Joi from 'joi';
import HttpResponse = appCommonTypes.HttpResponse;
import {
    ALLOWED_FILE_TYPES,
    MAX_SIZE_IN_BYTE,
    MESSAGES,
    UPLOAD_BASE_PATH
} from "../config/constants";
import settings, {
    MANAGE_ALL,
    VENDOR_PERMISSION,
    READ_VENDOR,
    UPDATE_VENDOR,
    DELETE_VENDOR
} from "../config/settings";
import BcryptPasswordEncoder = appCommonTypes.BcryptPasswordEncoder;
import RedisService from "../services/RedisService";
import SendMailService from "../services/SendMailService";
import Generic from "../utils/Generic";
import formidable, { File } from 'formidable';
import { $saveVendorAddress, $updateVendorAddress, IVendorAddressModel } from "../models/VendorAddress";
import {
    $updateVendorSchema,
    IVendorModel,
    $changePassword,
    $resetPassword,
    $savePasswordAfterReset
} from "../models/Vendor";

const redisService = new RedisService();
const sendMailService = new SendMailService();
const form = formidable({ uploadDir: UPLOAD_BASE_PATH });

export default class CustomerController {
    private declare readonly passwordEncoder: BcryptPasswordEncoder;

    constructor(passwordEncoder: BcryptPasswordEncoder) {
        this.passwordEncoder = passwordEncoder
    }

    /**
     * @name updateCustomer
     * @param req
     * @desc Updates the vendor
     * only users with vendor or update_vendor permission
     * can do this 
     */
    @TryCatch
    @HasPermission([VENDOR_PERMISSION, UPDATE_VENDOR])
    public async updateVendor (req: Request) {
        const vendor = await this.doUpdateVendor(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated',
            result: vendor
        };
      
        return Promise.resolve(response);
    };

    /**
     * @name updateCustomerStatus
     * @param req
     * @desc Updates the vendor status
     * only user with super admin manage all and update vendor
     * permission can do this 
     */
    @TryCatch
    @HasPermission([MANAGE_ALL, UPDATE_VENDOR])
    public  async updateVendorStatus (req: Request) {
        await this.doUpdateVendorStatus(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated status'
        };
      
        return Promise.resolve(response);
    };

    /**
     * @name deleteCustomer
     * @param req
     * @desc deletes the vendor
     * only user with super admin manage all and delete vendor
     * permission can do this 
     */
    @TryCatch
    @HasPermission([MANAGE_ALL, DELETE_VENDOR])
    public  async deleteVendor (req: Request) {
        await this.doDeleteVendor(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted'
        };
      
        return Promise.resolve(response);
    };

    /**
     * @name vendor
     * @param req
     * @desc Gets a single vendor
     * only user with super admin manage all and read vendor
     * permission can do this 
     */
    @TryCatch
    @HasPermission([MANAGE_ALL, VENDOR_PERMISSION, READ_VENDOR])
    public  async vendor (req: Request) {
        const vendorId = req.params.vendorId;
        
        const vendor = await datasources.vendorDAOService.findById(vendorId);
        if(!vendor) return Promise.reject(CustomAPIError.response(`Vendor with Id: ${vendorId} does not exist`, HttpStatus.BAD_REQUEST.code));

        const response: HttpResponse<IVendorModel> = {
            code: HttpStatus.OK.code,
            message: HttpStatus.OK.value,
            result: vendor,
        };
      
        return Promise.resolve(response);
    };

    /**
     * @name vendors
     * @param req
     * @desc Gets all vendors, its also search and retrieves 
     * vendors according to vendor first name, last name and status
     * only users with super admin manage all and read vendor
     * permission can do this 
     */
    @TryCatch
    @HasPermission([MANAGE_ALL, READ_VENDOR])
    public  async vendors (req: Request) {

        let activeFilter = false;
        let _filter = '';

        if (req.query.active === 'true') {
            activeFilter = true;
            _filter = 't'
        } else if (req.query.active === 'false') {
            activeFilter = false;
            _filter = 't'
        }
    
        const filter = _filter === ''
                        ? {} 
                        : activeFilter ? { active: true } : { active: false };
        
        const options = {
            search: req.query.search,
            searchFields: ['firstName', 'lastName', 'gender']
        };

        const vendors = await datasources.vendorDAOService.findAll(filter, options);

        if(!vendors) return Promise.reject(CustomAPIError.response('No vendor is available at this time', HttpStatus.BAD_REQUEST.code));

        const response: HttpResponse<IVendorModel> = {
            code: HttpStatus.OK.code,
            message: HttpStatus.OK.value,
            results: vendors,
        };
      
        return Promise.resolve(response);
    };

    /**
     * @name changePassword
     * @param req
     * @desc Changes vendor password
     * only users with vendor permission and update vendor
     * permission can do this 
     */
    @TryCatch
    @HasPermission([VENDOR_PERMISSION, UPDATE_VENDOR])
    public  async changePassword (req: Request) {
        const vendor = await this.doChangePassword(req);

        const response: HttpResponse<IVendorModel> = {
            code: HttpStatus.OK.code,
            message: "Successfully changed password",
            result: vendor,
        };
      
        return Promise.resolve(response);
    };

    /**
     * @name resetPassword
     * @param req
     * @desc
     * Sends password reset link to vendor email
     * and also cached the reset token, email and
     * vendor id
     * to redis for 3 minutes
     * 
     */
    public async resetPassword (req: Request) {
        try {
            const { error, value } = Joi.object<IVendorModel>($resetPassword).validate(req.body);
            if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));
            
            const vendor = await datasources.vendorDAOService.findByAny({
                email: value.email
            });
            if(!vendor) return Promise.reject(CustomAPIError.response('Email not found', HttpStatus.BAD_REQUEST.code));

            const token = Generic.generatePasswordResetCode(4);
            const data = {
                token: token
            };
            const actualData = JSON.stringify(data);

            redisService.saveToken(`zues_app_${value.email}`, actualData, 3600);

            await datasources.vendorDAOService.update(
                {_id: vendor._id},
                {passwordResetCode: token}
            )

            sendMailService.sendMail({
                from: settings.nodemailer.email,
                to: value.email,
                subject: 'Password Reset',
                text: `Your password reset code is: ${token}`,
            });

            const response: HttpResponse<any> = {
                code: HttpStatus.OK.code,
                message: `If your email is registered with us, you will receive a password reset code.`
            };
  
            return Promise.resolve(response);
        
        } catch (error) {
            console.error(error, 'token error when setting');
            Promise.reject(CustomAPIError.response('Failed to send the password reset token. Please try again later.', HttpStatus.BAD_REQUEST.code));
        }
        
    };

    @TryCatch
    public async enterPasswordResetCode (req: Request) {

        const { email, passwordResetCode } = req.body;

        const vendor = await datasources.vendorDAOService.findByAny({
            email: email
        });

        if(!vendor)
            return Promise.reject(CustomAPIError.response('User not found, restart the password reset process.', HttpStatus.BAD_REQUEST.code));

        if(vendor.passwordResetCode !== passwordResetCode)
            return Promise.reject(CustomAPIError.response('Password reset code do not match', HttpStatus.BAD_REQUEST.code));


        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: HttpStatus.OK.value
        };

        return Promise.resolve(response);

    }

    /**
     * @name savePassword
     * @param req
     * @desc
     * checks if data exist with the provided key in redis
     * fetch the token in redis and compare with  
     * the token vendor id and the req.params if true it
     * Saves the new password for the vendor
     * else it returns an error
     */
    @TryCatch
    public async savePassword (req: Request) {
        try {
    
            const { error, value } = Joi.object<IVendorModel>($savePasswordAfterReset).validate(req.body);
            if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));
        
            const vendor = await datasources.vendorDAOService.findByAny({
                email: value.email
            });
            if(!vendor)
                return Promise.reject(CustomAPIError.response('Customer not found', HttpStatus.BAD_REQUEST.code));

            const keys = `zues_app_${value.email}`;
            const redisData = await redisService.getToken(keys);
    
            if (redisData) {
                const { token }: any = redisData;
                
                if(token !== vendor.passwordResetCode)
                    return Promise.reject(CustomAPIError.response('Failed to save password, please try resetting password again', HttpStatus.BAD_REQUEST.code));
            
                const password = await this.passwordEncoder.encode(value.password as string);
                const vendorValues = {
                    password: password,
                    confirm_password: password
                };
                
                await datasources.vendorDAOService.update(
                    { _id: vendor._id },
                    vendorValues
                );

                const response: HttpResponse<any> = {
                    code: HttpStatus.OK.code,
                    message: 'Password reset was successful.',
                };

                redisService.deleteRedisKey(keys)
                return Promise.resolve(response);

            } else {
                // Token not found in Redis
                return Promise.reject(CustomAPIError.response('Token has expired', HttpStatus.BAD_REQUEST.code))
            }
        
        } catch (error) {
            console.error(error, 'token error when getting');
            return Promise.reject(CustomAPIError.response('Failed to retrieve token please try again later', HttpStatus.BAD_REQUEST.code))
        }
    }

    /***
     * @name checkRedisKey
     * checks if key is available in redis
     */
    public async checkRedisKey(req: Request) {
        const vendorId = req.params.vendorId;

        const vendor = await datasources.vendorDAOService.findById(vendorId);

        const keys = `zues_webapp_${vendor?.email}`;
        const redis = await redisService.checkRedisKey(keys);

        if(redis === '1') {
            const response: HttpResponse<any> = {
                code: HttpStatus.OK.code,
                message: 'Redis data is available.'
            }
            return Promise.resolve(response);
        } else {
            const response: HttpResponse<any> = {
                code: HttpStatus.OK.code,
                message: 'No redis data is available.',
            };
            return Promise.resolve(response);
        }
        
    };

    @TryCatch
    @HasPermission([VENDOR_PERMISSION])
    public async saveVendorAddress(req: Request) {

        //@ts-ignore
        const vendorId = req.user._id

        const { error, value } = Joi.object<IVendorAddressModel>($saveVendorAddress).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));
                    
        const vendor = await datasources.vendorDAOService.findById(vendorId);
        if(!vendor)
            return Promise.reject(CustomAPIError.response('Vendor not found', HttpStatus.NOT_FOUND.code));

        const vendorAddress = await datasources.vendorAddressDAOService.findByAny({ vendor: vendorId });
        if(vendorAddress)
            return Promise.reject(CustomAPIError.response('Address already exists for this vendor', HttpStatus.NOT_FOUND.code));

        // //find address with type home
        // const homeAddress = await datasources.vendorAddressDAOService.findByAny(
        //     {address_type: HOME_ADDRESS}
        // )
        // if(homeAddress && value.address_type === HOME_ADDRESS)
        //     return Promise.reject(CustomAPIError.response('Address of type home already exist', HttpStatus.BAD_REQUEST.code));

        // //find address with type office
        // const officeAddress = await datasources.vendorAddressDAOService.findByAny(
        //     {address_type: OFFICE_ADDRESS}
        // )
        // if(officeAddress && value.address_type === OFFICE_ADDRESS)
        //     return Promise.reject(CustomAPIError.response('Address of type office already exist', HttpStatus.BAD_REQUEST.code));
    
        const addressValues: Partial<IVendorAddressModel> ={
            ...value,
            vendor: vendorId
        };

        const address = await datasources.vendorAddressDAOService.create(addressValues as IVendorAddressModel);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Address created successfully',
            result: address
        };

        return Promise.resolve(response);
    };

    @TryCatch
    @HasPermission([VENDOR_PERMISSION, MANAGE_ALL, READ_VENDOR])
    public async getSingleAddress(req: Request) {

        const vendorAddressId = req.params.vendorAddressId;
        
        const address = await datasources.vendorAddressDAOService.findById(vendorAddressId);
        if(!address)
            return Promise.reject(CustomAPIError.response('Address not found', HttpStatus.NOT_FOUND.code));

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful',
            result: address
        };

        return Promise.resolve(response);
    };

    @TryCatch
    @HasPermission([VENDOR_PERMISSION])
    public async updateAddress(req: Request) {

        const vendorAddressId = req.params.vendorAddressId;

        const { error, value } = Joi.object<IVendorAddressModel>($updateVendorAddress).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));
         

        const address = await datasources.vendorAddressDAOService.findById(vendorAddressId);
        if(!address)
            return Promise.reject(CustomAPIError.response('Address not found', HttpStatus.NOT_FOUND.code));

        const values = {
            ...value,
            address: value.address
        }

        await datasources.vendorAddressDAOService.update(
            {_id: vendorAddressId},
            values
        );
        
        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated'
        };

        return Promise.resolve(response);
    };

    @TryCatch
    @HasPermission([VENDOR_PERMISSION])
    public async deleteAddress(req: Request) {

        const vendorAddressId = req.params.vendorAddressId;

        const address = await datasources.vendorAddressDAOService.findById(vendorAddressId);
        if(!address)
            return Promise.reject(CustomAPIError.response('Address not found', HttpStatus.NOT_FOUND.code));

        await datasources.vendorAddressDAOService.deleteById(address._id)

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted'
        };

        return Promise.resolve(response);
    };

    private async doUpdateVendor(req: Request): Promise<HttpResponse<IVendorModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const vendorId = req.params.vendorId;

                const { error, value } = Joi.object<IVendorModel>($updateVendorSchema).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));
                
                const vendor = await datasources.vendorDAOService.findById(vendorId);
                if(!vendor) return reject(CustomAPIError.response('Vendor not found', HttpStatus.NOT_FOUND.code));

                const vendor_email = await datasources.vendorDAOService.findByAny({
                    email: value.email
                });

                if(value.email && vendor.email !== value.email){
                    if(vendor_email) {
                        return reject(CustomAPIError.response('Vendor with this email already exists', HttpStatus.NOT_FOUND.code))
                    }
                };

                const vendor_phone = await datasources.vendorDAOService.findByAny({
                    phone: value.phone
                });

                //@ts-ignore
                if(value.phone && vendor_phone !== value.phone){
                    if(vendor_phone) {
                        return reject(CustomAPIError.response('Vendor with this phone number already exists', HttpStatus.NOT_FOUND.code))
                    }
                };

                let _email = ''
                if(!vendor.googleId || !vendor.facebookId || !vendor.instagramId) {
                    _email = value.email as string
                };

                let _phone = ''
                if(vendor.googleId || vendor.facebookId || vendor.instagramId) {
                    _phone = value.phone
                };

                const profile_image = files.profileImageUrl as File;
                const basePath = `${UPLOAD_BASE_PATH}/vendor`;

                let _profileImageUrl = ''
                if(profile_image) {
                    // File size validation
                    const maxSizeInBytes = MAX_SIZE_IN_BYTE
                    if (profile_image.size > maxSizeInBytes) {
                        return reject(CustomAPIError.response(MESSAGES.image_size_error, HttpStatus.BAD_REQUEST.code));
                    }
            
                    // File type validation
                    const allowedFileTypes = ALLOWED_FILE_TYPES;
                    if (!allowedFileTypes.includes(profile_image.mimetype as string)) {
                        return reject(CustomAPIError.response(MESSAGES.image_type_error, HttpStatus.BAD_REQUEST.code));
                    }
            
                    _profileImageUrl = await Generic.getImagePath({
                        tempPath: profile_image.filepath,
                        filename: profile_image.originalFilename as string,
                        basePath,
                    });
                };

                const vendorValues = {
                    ...value,
                    email: _email ? _email : vendor.email,
                    profileImageUrl: profile_image && _profileImageUrl,
                    phone: _phone ? _phone : vendor.phone
                };

                const updatedVendor = await datasources.vendorDAOService.updateByAny(
                    {_id: vendorId},
                    vendorValues
                );
                
                //@ts-ignore
                return resolve(updatedVendor);
            })
        })
    }

    private async doUpdateVendorStatus(req: Request) {
        const vendorId = req.params.vendorId;

        const vendor = await datasources.vendorDAOService.findById(vendorId);
        if(!vendor) return Promise.reject(CustomAPIError.response('Vendor not found', HttpStatus.BAD_REQUEST.code));

        const updatedVendor = await datasources.vendorDAOService.update(
            {_id: vendorId},
            {active: !vendor.active}
        );

        return updatedVendor;

    };

    private async doDeleteVendor(req: Request) {
        const vendorId = req.params.vendorId;

        return await datasources.vendorDAOService.deleteById(vendorId);

    };

    private async doChangePassword(req: Request) {
        const vendorId = req.params.vendorId;
        
        const { error, value } = Joi.object<IVendorModel>($changePassword).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));
      
        const vendor = await datasources.vendorDAOService.findById(vendorId);
        if(!vendor) return Promise.reject(CustomAPIError.response('Vendor not found', HttpStatus.BAD_REQUEST.code));
    
        const hash = vendor.password as string;
        const password = value.previousPassword;

        const isMatch = await this.passwordEncoder.match(password.trim(), hash.trim());
        if(!isMatch) return Promise.reject(CustomAPIError.response('Password in the database differ from the password entered as current  password', HttpStatus.UNAUTHORIZED.code));

        const _password = await this.passwordEncoder.encode(value.password as string);

        const vendorValues = {
            password: _password
        };

        const updated = await datasources.vendorDAOService.updateByAny(
            {_id: vendorId},
            vendorValues
        );

        return updated;

    };

}