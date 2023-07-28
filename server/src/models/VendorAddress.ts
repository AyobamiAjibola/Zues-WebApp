import mongoose, { Document, Schema } from 'mongoose';
import Joi from 'joi';

interface IVendorAddress {
    // address_type: string;
    address: string;
    street: string | null;
    country: string;
    state: string;
    city: string;
    favorite: boolean;
    vendor: mongoose.Types.ObjectId;
}

const vendorAddressSchema = new Schema<IVendorAddress>({
    // address_type: { type: String },
    address: { type: String },
    street: { type: String, allowNull: true },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    favorite: { type: Boolean },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor' }
});

vendorAddressSchema.pre('findOne', function (next) {
    this.populate('vendor');
    next();
});

export interface IVendorAddressModel extends Document, IVendorAddress {}

const VendorAddress = mongoose.model<IVendorAddressModel>('VendorAddress', vendorAddressSchema);

export const $saveVendorAddress: Joi.SchemaMap = {
    address: Joi.string().required().label('address'),
    street: Joi.string().required().label('street'),
    country: Joi.string().required().label('country'),
    state: Joi.string().required().label('state'),
    city: Joi.string().required().label('city'),
};

export const $updateVendorAddress: Joi.SchemaMap = {
    // address_type: Joi.string().label('address type'),
    address: Joi.string().label('address'),
    street: Joi.string().label('street'),
    country: Joi.string().label('country'),
    state: Joi.string().label('state'),
    city: Joi.string().label('city'),
};

export default VendorAddress;