import { Request, Response } from "express";
import PasswordEncoder from "../utils/PasswordEncoder";
import VendorController from "../controller/VendorController";
import authenticateRouteWrapper from "../middleware/authenticateRouteWrapper";

const passwordEncoder = new PasswordEncoder();
const vendorController = new VendorController(passwordEncoder);

export const updateVendorHandler = authenticateRouteWrapper( async (req, res) =>  {
    const response = await vendorController.updateVendor(req);

    res.status(response.code).json(response);
});

export const updateVendorStatusHandler = authenticateRouteWrapper( async (req, res) =>  {
    const response = await vendorController.updateVendorStatus(req);

    res.status(response.code).json(response);
});

export const deleteVendorHandler = authenticateRouteWrapper( async (req, res) =>  {
    const response = await vendorController.deleteVendor(req);

    res.status(response.code).json(response);
});

export const getVendorHandler = authenticateRouteWrapper( async (req, res) =>  {
    const response = await vendorController.vendor(req);

    res.status(response.code).json(response);
});

export const getVendorsHandler = authenticateRouteWrapper( async (req, res) =>  {
    const response = await vendorController.vendors(req);

    res.status(response.code).json(response);
});

export const changeVendorPasswordHandler = authenticateRouteWrapper( async (req, res) =>  {
    const response = await vendorController.changePassword(req);

    res.status(response.code).json(response);
});

export const resetVendorPasswordHandler = async (req: Request, res: Response) =>  {
    const response = await vendorController.resetPassword(req);

    //@ts-ignore
    res.status(response.code).json(response);
};

export const saveVendorPasswordHandler = async (req: Request, res: Response) =>  {
    const response = await vendorController.savePassword(req);

    //@ts-ignore
    res.status(response.code).json(response);
};

export const enterResetCodeHandler = async (req: Request, res: Response) =>  {
    const response = await vendorController.enterPasswordResetCode(req);

    //@ts-ignore
    res.status(response.code).json(response);
};

export const saveVendorAddressHandler = authenticateRouteWrapper(async (req, res) => {
    const response = await vendorController.saveVendorAddress(req);

    res.status(response.code).json(response);
});

export const getSingleVendorAddressHandler = authenticateRouteWrapper(async (req, res) => {
    const response = await vendorController.getSingleAddress(req);

    res.status(response.code).json(response);
});

export const updateVendorAddressHandler = authenticateRouteWrapper(async (req, res) => {
    const response = await vendorController.updateAddress(req);

    res.status(response.code).json(response);
});

export const deleteVendorAddressHandler = authenticateRouteWrapper(async (req, res) => {
    const response = await vendorController.deleteAddress(req);

    res.status(response.code).json(response);
});