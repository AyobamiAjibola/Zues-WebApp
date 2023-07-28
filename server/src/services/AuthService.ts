import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as InstagramStrategy } from 'passport-instagram';
import datasources from '../services/dao';
import CustomAPIError from '../exceptions/CustomAPIError';
import settings from '../config/settings';
import HttpStatus from '../helpers/HttpStatus';
import { IVendorModel } from '../models/Vendor';
import Generic from '../utils/Generic';
import { Request, Response } from 'express';
import { BASIC_PLAN } from '../config/constants';
// import { Strategy as OAuth2Strategy } from 'passport-oauth2';

// class AppleStrategy extends OAuth2Strategy {
//   constructor(options: any, verify: any) {
//     const appleOptions = {
//       authorizationURL: 'https://appleid.apple.com/auth/authorize',
//       tokenURL: 'https://appleid.apple.com/auth/token',
//       ...options,
//     };

//     super(appleOptions, verify);
//     this.name = 'apple';
//   }
// }

class AuthService {
  initialize() {
    // Google Strategy
    passport.use(
      new GoogleStrategy(
        {
          clientID: settings.googleOAuth.google_client_id,
          clientSecret: settings.googleOAuth.google_client_secret,
          callbackURL: settings.googleOAuth.google_callbackURL,
          passReqToCallback: true,
        },
        this.googleAuthHandler
      )
    );

    //Facebook Strategy
    // passport.use(
    //     new AppleStrategy(
    //       {
    //         clientID: settings.appleAuth.client_ID,
    //         authorizationURL: 'https://appleid.apple.com/auth/authorize',
    //         tokenURL: 'https://appleid.apple.com/auth/token',
    //         callbackURL: settings.appleAuth.apple_callbackURL,
    //         keyID: settings.appleAuth.key_ID,
    //         privateKeyLocation: settings.appleAuth.private_key_location,
    //         passReqToCallback: false
    //       },
    //       this.appleAuthHandler
    //     )
    //   );

    // Facebook Strategy
    passport.use(
      new FacebookStrategy(
        {
          clientID: settings.facebookAuth.client_ID,
          clientSecret: settings.facebookAuth.client_secret,
          callbackURL: settings.facebookAuth.facebook_callbackURL,
          passReqToCallback: true,
        },
        this.facebookAuthHandler
      )
    );

    // Instagram Strategy
    passport.use(
      new InstagramStrategy(
        {
          clientID: settings.instagramAuth.client_ID,
          clientSecret: settings.instagramAuth.client_secret,
          callbackURL: settings.instagramAuth.instagram_callbackURL,
          passReqToCallback: true,
        },
        this.instagramAuthHandler
      )
    );

    passport.serializeUser((user: any, done) => {
      // Serialize the user object and store it in the session
      done(null, user._id);
    });

    passport.deserializeUser(async (_id, done) => {
      try {
        const user = await datasources.vendorDAOService.findById(_id);
        done(null, user);
      } catch (error) {
        done(error);
      }
    });
  }

  //vendor
  googleAuthHandler = async (request: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
    // Google authentication logic
    try {
      const vendor = await datasources.vendorDAOService.findByAny({ googleId: profile.id });
      if (vendor) {
        // User already exists, return the vendor
        if(!vendor.active) {
          return done(null, false, { message: 'Account is disabled. Please contact the administrator.' });
        }

        const role = await datasources.roleDAOService.findByIdPopulatePermissions(vendor.role);
        if(!role){
          return done(null, false, { message: 'Role is not found.' });
        }
    
        //generate JWT
        const jwt = Generic.generateJwt({
          userId: vendor._id,
          permissions: role.permissions,
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
    
        await datasources.vendorDAOService.update({vendor}, updateValues);

        return done(null, vendor);
      } else {
        // User does not exist, create a new user
        const role = await datasources.roleDAOService.findByAny({
          slug: settings.roles[1],
        });
        if (!role) {
          return done(null, false, { message: 'Role is not found.' });
        };

        const _vendor = await datasources.vendorDAOService.findByAny({email: profile.email})
        if (_vendor) {
          return done(null, false, {
            message: 'A vendor with the email already exists. Please use a different email.'
          });
        };

        const sub = await datasources.subscriptionDAOService.findByAny({ name: BASIC_PLAN });
        if (!sub) {
          return Promise.reject(CustomAPIError.response('Subscription not found', HttpStatus.BAD_REQUEST.code));
        }

        const vendorValues: Partial<IVendorModel> = {
          googleId: profile.id,
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
    
        //generate JWT
        const jwt = Generic.generateJwt({
          userId: vendor._id,
          permissions: role.permissions,
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
        await datasources.vendorDAOService.update({vendor}, updateValues);

        return done(null, vendor);
      }
    } catch (error: any) {
      return done(error.message);
    }
  };

  facebookAuthHandler = async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
    // Facebook authentication logic
    try {
      console.log(cb(), 'function cb')
      const vendor = await datasources.vendorDAOService.findByAny({ facebookId: profile.id });
      if (vendor) {
        // User already exists, return the vendor
        if(!vendor.active) {
          return cb(null, false, { message: 'Account is disabled. Please contact the administrator.' });
        }

        const role = await datasources.roleDAOService.findByIdPopulatePermissions(vendor.role);
        if(!role){
          return cb(null, false, { message: 'Role is not found.' });
        }
    
        //generate JWT
        const jwt = Generic.generateJwt({
          userId: vendor._id,
          permissions: role.permissions,
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
    
        await datasources.vendorDAOService.update({vendor}, updateValues);

        return cb(null, vendor);
      } else {
        // User does not exist, create a new user
        const role = await datasources.roleDAOService.findByAny({
          slug: settings.roles[1],
        });
        if (!role) {
          // return cb(null, false, { message: 'Role is not found.' });
          return console.log('role not found')
        };

        const _vendor = await datasources.vendorDAOService.findByAny({email: profile.email})
        if (_vendor) {
          // return cb(null, false, {
          //   message: 'A user with the email already exists. Please use a different email.'
          // });
          return console.log('A user exist')
        };

        const sub = await datasources.subscriptionDAOService.findByAny({ name: BASIC_PLAN });
        if (!sub) {
          return Promise.reject(CustomAPIError.response('Subscription not found', HttpStatus.BAD_REQUEST.code));
        }

        const vendorValues: Partial<IVendorModel> = {
          instagramId: profile.id,
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
    
        //generate JWT
        const jwt = Generic.generateJwt({
          userId: vendor._id,
          permissions: role.permissions,
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
        await datasources.vendorDAOService.update({vendor}, updateValues);

        return cb(null, vendor);
      }
    } catch (error: any) {
      return cb(error.message);
    }
  };

  instagramAuthHandler = async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
    // Instagram authentication logic
    try {
        console.log(cb(), 'function cb')
        const user = await datasources.vendorDAOService.findByAny({ instagramId: profile.id });
        if (user) {
          // User already exists, return the user
          if(!user.active) {
            return cb(null, false, { message: 'Account is disabled. Please contact the administrator.' });
          }

          const role = await datasources.roleDAOService.findByIdPopulatePermissions(user.role);
          if(!role){
            return cb(null, false, { message: 'Role is not found.' });
          }

          const permissions = role.permissions;
      
          //generate JWT
          const jwt = Generic.generateJwt({
              userId: user._id,
              permissions
          });
          
          //update user authentication date and authentication token
          const updateValues = {
              loginDate: new Date(),
              loginToken: jwt
          };
      
          await datasources.vendorDAOService.update({_id: user._id}, updateValues);

          return cb(null, user);
        } else {
          // User does not exist, create a new user
          const role = await datasources.roleDAOService.findByAny({
            slug: settings.roles[1],
          });
          if (!role) {
            // return cb(null, false, { message: 'Role is not found.' });
            return console.log('role not found')
          };

          const _vendor = await datasources.vendorDAOService.findByAny({email: profile.email})
          if (_vendor) {
            // return cb(null, false, {
            //   message: 'A user with the email already exists. Please use a different email.'
            // });
            return console.log('A user exist')
          };

          const sub = await datasources.subscriptionDAOService.findByAny({ name: BASIC_PLAN });
          if (!sub) {
            return Promise.reject(CustomAPIError.response('Subscription not found', HttpStatus.BAD_REQUEST.code));
          }

          const vendorValues: Partial<IVendorModel> = {
            instagramId: profile.id,
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
      
          //generate JWT
          const jwt = Generic.generateJwt({
            userId: vendor._id,
            permissions: role.permissions,
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
          await datasources.vendorDAOService.update({vendor}, updateValues);

          return cb(null, vendor);
        }
    } catch (error: any) {
      return cb(error.message);
    }
  };

  authenticateGoogle() {
    return passport.authenticate('google', { scope: ['email', 'profile'] });
  }

  authenticateFacebook() {
    return passport.authenticate('facebook', { scope: ['email'] });
  }

  authenticateInstagram() {
    return passport.authenticate('instagram', { scope: ['email'] });
  }

  handleGoogleCallback() {
    return passport.authenticate('google', {
      successRedirect: '/success',
      failureRedirect: '/api/v1/google/failed',
    });
  }

  handleFacebookCallback() {
    return passport.authenticate('facebook', {
      failureRedirect: '/api/v1/google/failed',
      successRedirect: '/facebook-success',
    });
  }

  handleInstagramCallback() {
    return passport.authenticate('instagram', {
      failureRedirect: '/api/v1/google/failed',
      successRedirect: '/instagram-success',
    });
  }
  
}

const authService = new AuthService();
export default authService;
