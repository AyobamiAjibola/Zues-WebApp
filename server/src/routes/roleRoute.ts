import { Request, Response } from "express";
import PermissionController from "../controller/RoleController";
import authenticateRouteWrapper from "../middleware/authenticateRouteWrapper";

const roleController = new PermissionController();

export const createRole = authenticateRouteWrapper(async (req, res) => {
    const response = await roleController.createRole(req);
    res.status(response.code).json(response);
});