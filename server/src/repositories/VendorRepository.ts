import CrudRepository from '../helpers/CrudRepository';
import { Model, Types } from 'mongoose';
import Vendor, { IVendorModel } from '../models/Vendor';

export default class VendorRepository extends CrudRepository<IVendorModel, Types.ObjectId> {
  constructor() {
    super(Vendor as Model<IVendorModel>);
  }
}