import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';

interface IVendor {
  firstName: string;
  lastName: string;
  password: string | null;
  email: string;
  phone: string;
  gender: string;
  profileImageUrl: string | null;
  active: boolean | null;
  loginToken: string | null;
  loginDate: Date | null;
  role: mongoose.Types.ObjectId;
  passwordResetCode: string;
  createdAt: Date;
  previousPassword: string;
  googleId: string | null;
  instagramId: string | null;
  facebookId: string | null;
  isTrial: boolean;
  isExpired: boolean;
  subscription: {
    plan: string,
    startDate: Date | null,
    endDate: Date | null
  },
  confirmPassword: string
}

const vendorSchema = new Schema<IVendor>({
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, allowNull: true },
  email: { type: String },
  phone: { type: String },
  gender: { type: String },
  profileImageUrl: { type: String, allowNull: true },
  active: { type: Boolean, allowNull: true },
  loginToken: { type: String, allowNull: true },
  loginDate: { type: Date, allowNull: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  passwordResetCode: { type: String, allowNull: true },
  createdAt: { type: Date, default: Date.now },
  googleId: { type: String, allowNull: true },
  instagramId: { type: String, allowNull: true },
  facebookId: { type: String, allowNull: true },
  isTrial: { type: Boolean },
  isExpired: { type: Boolean, default: true },
  subscription: {
    plan: { type: String },
    startDate: { type: Date, allowNull: true },
    endDate: { type: Date, allowNull: true }
  }
});

export interface IVendorModel extends Document, IVendor {}

const Vendor = mongoose.model<IVendorModel>('Vendor', vendorSchema);

export const $changePassword: Joi.SchemaMap = {
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/)
    .messages({
      'string.pattern.base': `Password does not meet requirements.`,
    })
    .required()
    .label('password'),
  confirmPassword: Joi.ref("password"),
  previousPassword: Joi.string().required().label('previous password')
};

export const $resetPassword: Joi.SchemaMap = {
  email: Joi.string().required().label('email')
};

export const $savePasswordAfterReset: Joi.SchemaMap = {
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/)
    .messages({
      'string.pattern.base': `Password does not meet requirements.`,
    })
    .required()
    .label('password'),
  confirmPassword: Joi.ref("password"),
  email: Joi.string().required().label('email')
};

export const $savePassword: Joi.SchemaMap = {
  email: Joi.string().required().label('email'),
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/)
    .messages({
      'string.pattern.base': `Password does not meet requirements.`,
    })
    .required()
    .label('password'),
  confirm_password: Joi.ref("password"),
  token: Joi.string().required().label("token")
};

export const $saveVendorSchema: Joi.SchemaMap = {
  firstName: Joi.string().required().label('first name'),
  lastName: Joi.string().required().label('last name'),
  email: Joi.string().required().label('email'),
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/)
    .messages({
      'string.pattern.base': `Password does not meet requirements.`,
    })
    .required()
    .label('password'),
};

export const $updateVendorSchema: Joi.SchemaMap = {
  firstName: Joi.string().label('first name'),
  lastName: Joi.string().label('last name'),
  email: Joi.string().label('email'),
  otherName: Joi.string().label('other names'),
  gender: Joi.string().label('gender'),
  profileImageUrl: Joi.string().label('profile image'),
  phone: Joi.string().label('phone')
};

export const $loginSchema: Joi.SchemaMap = {
    email: Joi.string().required().label('email'),
    password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/)
    .messages({
      'string.pattern.base': `Password does not meet requirements.`,
    })
    .required()
    .label('password'),
}

export default Vendor;
