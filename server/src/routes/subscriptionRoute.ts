import { Request, Response } from "express";
import SubscriptionController from "../controller/SubscriptionController";
import authenticateRouteWrapper from "../middleware/authenticateRouteWrapper";

const subscriptionController = new SubscriptionController();

export const getPlansHandler = async (req: Request, res: Response) =>  {
    const response = await subscriptionController.plans(req);

    res.status(response.code).json(response);
};

export const trialPlanHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await subscriptionController.trialPlan(req);

    res.status(response.code).json(response);
});

export const standardPlanHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await subscriptionController.standardPlan(req);

    res.status(response.code).json(response);
});

export const premiumPlanHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await subscriptionController.premiumPlan(req);

    res.status(response.code).json(response);
});

export const initTransactionCallbackHandler = async (req: Request, res: Response) => {
    const response = await subscriptionController.initTransactionCallback(req);
  
    res.status(response.code).json(response);
};
  
export const updateTransactionHandler = authenticateRouteWrapper(async (req, res) => {
    const response = await subscriptionController.updateTransaction(req);

    res.status(response.code).json(response);
});

export const getVendorTransactionsHandler = authenticateRouteWrapper(async (req, res) => {
    const response = await subscriptionController.getVendorTransactions(req);

    res.status(response.code).json(response);
});

export const getTransactionsHandler = authenticateRouteWrapper(async (req, res) => {
    const response = await subscriptionController.getTransactions(req);

    res.status(response.code).json(response);
});

export const getTransactionByRefHandler = authenticateRouteWrapper(async (req, res) => {
    const response = await subscriptionController.getTransactionsByRef(req);

    res.status(response.code).json(response);
});