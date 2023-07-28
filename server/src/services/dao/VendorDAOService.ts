import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import {IVendorModel} from '../../models/Vendor';
import VendorRepository from '../../repositories/VendorRepository';

import { appModelTypes } from '../../@types/app-model';
import ICrudDAO = appModelTypes.ICrudDAO;

export default class VendorDAOService implements ICrudDAO<IVendorModel> {
  private vendorRepository: VendorRepository;

  constructor(vendorRepository: VendorRepository) {
    this.vendorRepository = vendorRepository
  }

  //@ts-ignore
  insertMany(records: ReadonlyArray<IVendorModel>): Promise<IVendorModel[]> {
    return this.vendorRepository.bulkCreate(records)
  }

  create(values: IVendorModel): Promise<IVendorModel> {
    return this.vendorRepository.save(values);
  }

  findAll(filter?: FilterQuery<IVendorModel>, options?: QueryOptions): Promise<IVendorModel[]> {
    return this.vendorRepository.findAll(filter, options);
  }

  findById(id: any, options?: QueryOptions): Promise<IVendorModel | null> {
    return this.vendorRepository.findById(id, options);
  }

  findByAny(filter: FilterQuery<IVendorModel>, options?: QueryOptions): Promise<IVendorModel | null> {
    return this.vendorRepository.findOne(filter, options);
  }

  update(update: UpdateQuery<IVendorModel>, options: QueryOptions): Promise<IVendorModel | null> {
    return this.vendorRepository.update(update, { new: true, ...options });
  }

  updateByAny(
    filter: FilterQuery<IVendorModel>,
    update: UpdateQuery<IVendorModel>,
    options?: QueryOptions
  ): Promise<IVendorModel | null> {
    return this.vendorRepository.updateByAny(filter, update, options)
  }

  deleteByAny(filter: FilterQuery<IVendorModel>, options?: QueryOptions): Promise<void> {
    return this.vendorRepository.deleteByAny(filter, options);
  }

  deleteAll(options?: QueryOptions): Promise<void> {
    return this.vendorRepository.deleteAll(options);
  }

  deleteById(id: any, options?: QueryOptions): Promise<void> {
    return this.vendorRepository.deleteById(id, options);
  }

  exist(filter: FilterQuery<IVendorModel>, options?: QueryOptions): Promise<boolean> {
    return this.vendorRepository.exist(filter, options);
  }

}
