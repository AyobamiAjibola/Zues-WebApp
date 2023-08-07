import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as InstagramStrategy } from 'passport-instagram';
import settings from '../config/settings';
import datasources from './dao';
import Vendor, { IVendorModel } from '../models/Vendor';
import CustomAPIError from '../exceptions/CustomAPIError';
import HttpStatus from '../helpers/HttpStatus';
import { BASIC_PLAN } from '../config/constants';

//Google Strategy
passport.use(
    new GoogleStrategy(
    {
        clientID: settings.googleOAuth.google_client_id,
        clientSecret: settings.googleOAuth.google_client_secret,
        callbackURL: settings.googleOAuth.google_callbackURL,
        passReqToCallback: true,
    },
    function(request: any, accessToken: any, refreshToken: any, profile: any, cb: any) {
        datasources.vendorDAOService.findByAny({ googleId: profile.id })
        .then (async (vendor: IVendorModel | null) => {
            if (vendor) {
        
                const role = await datasources.roleDAOService.findByIdPopulatePermissions(vendor.role);
                if(!role){
                    return cb(null, false, { message: 'Role is not found.' });
                }
        
                return cb(null, vendor._id, {newReg: false});
            } else {
                // User does not exist, create a new user
                const role = await datasources.roleDAOService.findByAnyPopulatePermissions({
                    slug: settings.roles[1]
                });

                if (!role) {
                    return cb(null, false, { message: 'Role is not found.' });
                };
        
                // const _vendor = await datasources.vendorDAOService.findByAny({email: profile.email})
                // if (_vendor) {
                //     return cb(null, false, {
                //         message: 'A vendor with the email already exists. Please use a different email.'
                //     });
                // };
        
                const sub = await datasources.subscriptionDAOService.findByAny({ name: BASIC_PLAN });
                if (!sub) {
                    return Promise.reject(CustomAPIError.response('Subscription not found', HttpStatus.BAD_REQUEST.code));
                }
        
                const vendorValues: Partial<IVendorModel> = {
                    googleId: profile.id,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    role: role._id,
                    active: true,
                    email: profile.email,
                    subscription: {
                    plan: sub?.name as string,
                    startDate: null,
                    endDate: null
                    }
                };
        
                const vendor = await datasources.vendorDAOService.create(
                    vendorValues as IVendorModel
                );
        
                role.users.push(vendor._id);
                await role.save();

                return cb(null, vendor._id, {newReg: true});
            }
        })
        .catch((error: any) => {
            return cb(error.message);
        });
    }
));

// Facebook Strategy
passport.use(
    new FacebookStrategy(
    {
        clientID: settings.facebookAuth.client_ID,
        clientSecret: settings.facebookAuth.client_secret,
        callbackURL: settings.facebookAuth.facebook_callbackURL,
        passReqToCallback: true,
    },
    function(request: any, accessToken: any, refreshToken: any, profile: any, cb: any) {
        datasources.vendorDAOService.findByAny({ facebookId: profile.id })
        .then (async (vendor: IVendorModel | null) => {
            if (vendor) {
        
                const role = await datasources.roleDAOService.findByIdPopulatePermissions(vendor.role);
                if(!role){
                    return cb(null, false, { message: 'Role is not found.' });
                }
        
                return cb(null, vendor._id, {newReg: false});
            } else {
                // User does not exist, create a new user
                const role = await datasources.roleDAOService.findByAnyPopulatePermissions({
                    slug: settings.roles[1]
                });

                if (!role) {
                    return cb(null, false, { message: 'Role is not found.' });
                };
        
                const sub = await datasources.subscriptionDAOService.findByAny({ name: BASIC_PLAN });
                if (!sub) {
                    return Promise.reject(CustomAPIError.response('Subscription not found', HttpStatus.BAD_REQUEST.code));
                }
        
                const vendorValues: Partial<IVendorModel> = {
                    googleId: profile.id,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    role: role._id,
                    active: true,
                    email: profile.email ? profile.email : '',
                    subscription: {
                    plan: sub?.name as string,
                    startDate: null,
                    endDate: null
                    }
                };
        
                const vendor = await datasources.vendorDAOService.create(
                    vendorValues as IVendorModel
                );
        
                role.users.push(vendor._id);
                await role.save();

                return cb(null, vendor._id, {newReg: true});
            }
        })
        .catch((error: any) => {
            return cb(error.message);
        });
    }
));

// Instagram Strategy
passport.use(
    new InstagramStrategy(
    {
        clientID: settings.instagramAuth.client_ID,
        clientSecret: settings.instagramAuth.client_secret,
        callbackURL: settings.instagramAuth.instagram_callbackURL,
        passReqToCallback: true,
    },
    function(request: any, accessToken: any, refreshToken: any, profile: any, cb: any) {
        datasources.vendorDAOService.findByAny({ instagramId: profile.id })
        .then (async (vendor: IVendorModel | null) => {
            if (vendor) {
        
                const role = await datasources.roleDAOService.findByIdPopulatePermissions(vendor.role);
                if(!role){
                    return cb(null, false, { message: 'Role is not found.' });
                }
        
                return cb(null, vendor._id, {newReg: false});
            } else {
                // User does not exist, create a new user
                const role = await datasources.roleDAOService.findByAnyPopulatePermissions({
                    slug: settings.roles[1]
                });

                if (!role) {
                    return cb(null, false, { message: 'Role is not found.' });
                };
        
                const sub = await datasources.subscriptionDAOService.findByAny({ name: BASIC_PLAN });
                if (!sub) {
                    return Promise.reject(CustomAPIError.response('Subscription not found', HttpStatus.BAD_REQUEST.code));
                }
        
                const vendorValues: Partial<IVendorModel> = {
                    googleId: profile.id,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    role: role._id,
                    active: true,
                    email: profile.email ? profile.email : '',
                    subscription: {
                    plan: sub?.name as string,
                    startDate: null,
                    endDate: null
                    }
                };
        
                const vendor = await datasources.vendorDAOService.create(
                    vendorValues as IVendorModel
                );
        
                role.users.push(vendor._id);
                await role.save();

                return cb(null, vendor._id, {newReg: true});
            }
        })
        .catch((error: any) => {
            return cb(error.message);
        });
    }
));

passport.serializeUser(function(vendorId, done) {
    done(null, vendorId)
});

passport.deserializeUser((vendorId: any, done) => {
    Vendor.findById(vendorId)
        .then((response) => {
            if (response) {
                done(null, response);
            } else {
                done(new Error('Vendor not found'), null);
            }
        })
        .catch((err) => {
            done(err, null);
        });
});
