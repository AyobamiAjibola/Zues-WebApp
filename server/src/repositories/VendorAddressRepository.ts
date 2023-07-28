import CrudRepository from '../helpers/CrudRepository';
import { Model, Types } from 'mongoose';
import VendorAddress, { IVendorAddressModel } from '../models/VendorAddress';

export default class VendorAddressRepository extends CrudRepository<IVendorAddressModel, Types.ObjectId> {
  constructor() {
    super(VendorAddress as Model<IVendorAddressModel>);
  }
}