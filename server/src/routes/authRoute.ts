import { Request, Response } from "express";
import AuthenticationController from "../controller/AuthenticationController";
import PasswordEncoder from "../utils/PasswordEncoder";

const passwordEncoder = new PasswordEncoder();
const authController = new AuthenticationController(passwordEncoder);

export const signupHandler_Vendor = async  (req: Request, res: Response) =>  {
    const response = await authController.signup_vendor(req);

    res.status(response.code).json(response);
};

export const signInHandler_Admin = async (req: Request, res: Response) => {
    const response = await authController.admin_login(req);

    res.status(response.code).json(response)
};

export const signInHandler_Vendor = async (req: Request, res: Response) => {
    const response = await authController.sign_in_vendor(req);

    res.status(response.code).json(response)
};
