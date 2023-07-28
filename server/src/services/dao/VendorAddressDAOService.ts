import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import { IVendorAddressModel } from '../../models/VendorAddress';
import VendorAddressRepository from '../../repositories/VendorAddressRepository';

import { appModelTypes } from '../../@types/app-model';
import ICrudDAO = appModelTypes.ICrudDAO;

export default class VendorAddressDAOService implements ICrudDAO<IVendorAddressModel> {
  private vendorAddressRepository: VendorAddressRepository;

  constructor(vendorAddressRepository: VendorAddressRepository) {
    this.vendorAddressRepository = vendorAddressRepository
  }

  //@ts-ignore
  insertMany(records: ReadonlyArray<IVendorAddressModel>): Promise<IVendorAddressModel[]> {
    return this.vendorAddressRepository.bulkCreate(records)
  }

  create(values: IVendorAddressModel): Promise<IVendorAddressModel> {
    return this.vendorAddressRepository.save(values);
  }

  findAll(filter?: FilterQuery<IVendorAddressModel>, options?: QueryOptions): Promise<IVendorAddressModel[]> {
    return this.vendorAddressRepository.findAll(filter, options);
  }

  findById(id: any, options?: QueryOptions): Promise<IVendorAddressModel | null> {
    return this.vendorAddressRepository.findById(id, options);
  }

  findByAny(filter: FilterQuery<IVendorAddressModel>, options?: QueryOptions): Promise<IVendorAddressModel | null> {
    return this.vendorAddressRepository.findOne(filter, options);
  }

  update(update: UpdateQuery<IVendorAddressModel>, options: QueryOptions): Promise<IVendorAddressModel | null> {
    return this.vendorAddressRepository.update(update, { new: true, ...options });
  }

  updateByAny(
    filter: FilterQuery<IVendorAddressModel>,
    update: UpdateQuery<IVendorAddressModel>,
    options?: QueryOptions
  ): Promise<IVendorAddressModel | null> {
    return this.vendorAddressRepository.updateByAny(filter, update, options)
  }

  deleteByAny(filter: FilterQuery<IVendorAddressModel>, options?: QueryOptions): Promise<void> {
    return this.vendorAddressRepository.deleteByAny(filter, options);
  }

  deleteAll(options?: QueryOptions): Promise<void> {
    return this.vendorAddressRepository.deleteAll(options);
  }

  deleteById(id: any, options?: QueryOptions): Promise<void> {
    return this.vendorAddressRepository.deleteById(id, options);
  }

  exist(filter: FilterQuery<IVendorAddressModel>, options?: QueryOptions): Promise<boolean> {
    return this.vendorAddressRepository.exist(filter, options);
  }

}
