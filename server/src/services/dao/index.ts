import UserRepository from "../../repositories/UserRepository";
import PermissionRepository from "../../repositories/PermissionRepository";
import RoleRepository from "../../repositories/RoleRepository";
import VendorRepository from "../../repositories/VendorRepository";
import SubscriptionRepository from "../../repositories/SubscriptionRepository";
import VendorAddressRepository from "../../repositories/VendorAddressRepository";
import TransactionRepository from "../../repositories/TransactionRepository";

import PermissionDAOService from "./PermissionDAOService";
import RoleDAOService from "./RoleDAOService";
import UserDAOService from "./UserDAOService";
import VendorDAOService from "./VendorDAOService";
import SubscriptionDAOService from "./SubscriptionDAOService";
import VendorAddressDAOService from "./VendorAddressDAOService";
import TransactionDAOService from "./TransactionDAOService";

const permissionRepository = new PermissionRepository();
const roleRepository = new RoleRepository();
const userRepository = new UserRepository();
const vendorRepository = new VendorRepository();
const subscriptionRepository = new SubscriptionRepository();
const vendorAddressRepository = new VendorAddressRepository();
const transactionRepository = new TransactionRepository();

const permissionDAOService = new PermissionDAOService(permissionRepository);
const roleDAOService = new RoleDAOService(roleRepository);
const userDAOService = new UserDAOService(userRepository);
const vendorDAOService = new VendorDAOService(vendorRepository);
const subscriptionDAOService = new SubscriptionDAOService(subscriptionRepository);
const vendorAddressDAOService = new VendorAddressDAOService(vendorAddressRepository);
const transactionDAOService = new TransactionDAOService(transactionRepository);


export default {
    permissionDAOService,
    roleDAOService,
    userDAOService,
    vendorDAOService,
    subscriptionDAOService,
    vendorAddressDAOService,
    transactionDAOService
}