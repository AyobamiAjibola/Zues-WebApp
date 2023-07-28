import { Request } from 'express';
import { HasPermission, TryCatch } from '../decorators';
import HttpStatus from '../helpers/HttpStatus';
import CustomAPIError from '../exceptions/CustomAPIError';
import datasources from  '../services/dao';
import { appCommonTypes } from '../@types/app-common';
import HttpResponse = appCommonTypes.HttpResponse;
import { MANAGE_ALL, READ_TRANSACTION, VENDOR_PERMISSION } from '../config/settings';
import axiosClient from '../services/api/axiosClient';
import { BASIC_PLAN, PAYMENT_CHANNELS, PREMIUM_PLAN, STANDARD_PLAN } from '../config/constants';
import { ITransactionModel } from '../models/Transaction';
import RedisService from '../services/RedisService';

const redisService = new RedisService();

export default class SubscriptionController {

    @TryCatch
    public async plans(req: Request) {

        const options = {
            name: {$ne: BASIC_PLAN}
        }

        const plans = await datasources.subscriptionDAOService.findAll( options );

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: HttpStatus.OK.value,
            results: plans
          };
      
        return Promise.resolve(response);
    }

    @TryCatch
    @HasPermission([VENDOR_PERMISSION])
    public async trialPlan(req: Request) {

        const planId = req.params.planId;
        //@ts-ignore
        const vendorId = req.user._id;

        const plan = await datasources.subscriptionDAOService.findById(planId);
        if(!plan)
            return Promise.reject(CustomAPIError.response("Plan not found", HttpStatus.NOT_FOUND.code));

        const vendor = await datasources.vendorDAOService.findById(vendorId);
        if(!vendor)
            return Promise.reject(CustomAPIError.response("You have already used your trial plan", HttpStatus.BAD_REQUEST.code));
        
        const currentDate = new Date();
            
        const updateValue = {
            subscription: {
                plan: plan.name,
                startDate: new Date(),
                endDate: currentDate.setDate(currentDate.getDate() + 5)
            },
            isExpired: false,
            isTrial: true
        }

        await datasources.vendorDAOService.update({ vendor }, updateValue);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: "Successfully activated trial plan"
          };
      
        return Promise.resolve(response);
    }

    @TryCatch
    @HasPermission([VENDOR_PERMISSION])
    public async standardPlan(req: Request) {

        const planId = req.params.planId;
        //@ts-ignore
        const vendorId = req.user._id;

        const plan = await datasources.subscriptionDAOService.findById(planId);
        if(!plan)
            return Promise.reject(CustomAPIError.response("Plan not found", HttpStatus.NOT_FOUND.code));

        const actualData = JSON.stringify(plan);
        redisService.saveToken(STANDARD_PLAN, actualData, 3600);

        const vendor = await datasources.vendorDAOService.findById(vendorId);
        if(!vendor)
            return Promise.reject(CustomAPIError.response("You have already used your trial plan", HttpStatus.BAD_REQUEST.code));
        if(!vendor.isExpired)
            return Promise.reject(CustomAPIError.response("You are still on a plan", HttpStatus.BAD_REQUEST.code));

        //initialize payment
        const metadata = {
            cancel_action: `${process.env.PAYMENT_GW_CB_URL}/transactions?status=cancelled`,
        };

        axiosClient.defaults.baseURL = `${process.env.PAYMENT_GW_BASE_URL}`;
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${process.env.PAYMENT_GW_SECRET_KEY}`;
    
        let endpoint = '/balance';

        const balanceResponse = await axiosClient.get(endpoint);
        if (balanceResponse.data.data.balance === 0)
        return Promise.reject(
            CustomAPIError.response('Insufficient Balance. Please contact support.', HttpStatus.BAD_REQUEST.code),
        );

        endpoint = '/transaction/initialize';

        const callbackUrl = `${process.env.PAYMENT_GW_CB_URL}/`;
        const amount = plan.price as number;
        let serviceCharge = 0.015 * amount;

        if (amount >= 2500) {
            serviceCharge = 0.015 * amount + 100;
        }

        if (serviceCharge >= 2000) serviceCharge = 2000;

        const _amount = Math.round((serviceCharge + amount) * 100);

        const initResponse = await axiosClient.post(`${endpoint}`, {
            email: vendor.email,
            amount: _amount,
            callback_url: callbackUrl,
            metadata,
            channels: PAYMENT_CHANNELS,
        });

        const data = initResponse.data.data;

        const txnValues: Partial<ITransactionModel> = {
            reference: data.reference,
            authorizationUrl: data.authorization_url,
            type: 'Payment',
            status: initResponse.data.message,
            amount: plan.price as number,
            vendor: vendor._id
        };

        const transaction = await datasources.transactionDAOService.create(txnValues as ITransactionModel);

        const response: HttpResponse<ITransactionModel> = {
            code: HttpStatus.OK.code,
            message: HttpStatus.OK.value,
            result: transaction,
          };
      
        return Promise.resolve(response);
    }

    @TryCatch
    @HasPermission([VENDOR_PERMISSION])
    public async premiumPlan(req: Request) {

        const planId = req.params.planId;
        //@ts-ignore
        const vendorId = req.user._id;

        const plan = await datasources.subscriptionDAOService.findById(planId);
        if(!plan)
            return Promise.reject(CustomAPIError.response("Plan not found", HttpStatus.NOT_FOUND.code));

        const actualData = JSON.stringify(plan);
        redisService.saveToken(PREMIUM_PLAN, actualData, 3600);

        const vendor = await datasources.vendorDAOService.findById(vendorId);
        if(!vendor)
            return Promise.reject(CustomAPIError.response("You have already used your trial plan", HttpStatus.BAD_REQUEST.code));
        if(!vendor.isExpired)
            return Promise.reject(CustomAPIError.response("You are still on a plan", HttpStatus.BAD_REQUEST.code));

        //initialize payment
        const metadata = {
            cancel_action: `${process.env.PAYMENT_GW_CB_URL}/transactions?status=cancelled`,
        };

        axiosClient.defaults.baseURL = `${process.env.PAYMENT_GW_BASE_URL}`;
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${process.env.PAYMENT_GW_SECRET_KEY}`;
    
        let endpoint = '/balance';

        const balanceResponse = await axiosClient.get(endpoint);
        if (balanceResponse.data.data.balance === 0)
        return Promise.reject(
            CustomAPIError.response('Insufficient Balance. Please contact support.', HttpStatus.BAD_REQUEST.code),
        );

        endpoint = '/transaction/initialize';

        const callbackUrl = `${process.env.PAYMENT_GW_CB_URL}/`;
        const amount = plan.price as number;
        let serviceCharge = 0.015 * amount;

        if (amount >= 2500) {
            serviceCharge = 0.015 * amount + 100;
        }

        if (serviceCharge >= 2000) serviceCharge = 2000;

        const _amount = Math.round((serviceCharge + amount) * 100);

        const initResponse = await axiosClient.post(`${endpoint}`, {
            email: vendor.email,
            amount: _amount,
            callback_url: callbackUrl,
            metadata,
            channels: PAYMENT_CHANNELS,
        });

        const data = initResponse.data.data;

        const txnValues: Partial<ITransactionModel> = {
            reference: data.reference,
            authorizationUrl: data.authorization_url,
            type: 'Payment',
            status: initResponse.data.message,
            amount: plan.price as number,
            vendor: vendor._id
        };

        const transaction = await datasources.transactionDAOService.create(txnValues as ITransactionModel);

        const response: HttpResponse<ITransactionModel> = {
            code: HttpStatus.OK.code,
            message: HttpStatus.OK.value,
            result: transaction,
          };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async initTransactionCallback(req: Request) {
        const { reference } = req.query as unknown as { reference: string };

        const transaction = await datasources.transactionDAOService.findByAny({
           reference: reference
        });
        
        if (!transaction) {
            return Promise.reject(CustomAPIError.response('Transaction Does not exist.', HttpStatus.NOT_FOUND.code));
        }

        const vendor = transaction.vendor;
        if (!vendor) {
            return Promise.reject(CustomAPIError.response('Vendor Does not exist.', HttpStatus.NOT_FOUND.code));
        }
        
        //verify payment
        axiosClient.defaults.baseURL = `${process.env.PAYMENT_GW_BASE_URL}`;
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${process.env.PAYMENT_GW_SECRET_KEY}`;

        const endpoint = `/transaction/verify/${reference}`;

        const axiosResponse = await axiosClient.get(endpoint);

        const data = axiosResponse.data.data;

        const redisDataStandard = await redisService.getToken(STANDARD_PLAN);
        const redisDataPremium = await redisService.getToken(PREMIUM_PLAN);

        let planData;
        if(redisDataStandard) planData = redisDataStandard;
        if(redisDataPremium) planData = redisDataPremium;

        const { name, duration }: any = planData;
        const currentDate = new Date();
        const futureDate = new Date(currentDate);
            
        const updateValue = {
            subscription: {
                plan: name,
                startDate: new Date(),
                endDate: futureDate.setMonth(futureDate.getMonth() + duration)
            },
            isExpired: false
        }

        await datasources.vendorDAOService.update({ _id: vendor }, updateValue);
        
        const $transaction = {
            reference: data.reference,
            channel: data.authorization.channel,
            cardType: data.authorization.card_type,
            bank: data.authorization.bank,
            last4: data.authorization.last4,
            expMonth: data.authorization.exp_month,
            expYear: data.authorization.exp_year,
            countryCode: data.authorization.country_code,
            brand: data.authorization.brand,
            currency: data.currency,
            status: data.status,
            paidAt: data.paid_at,
            type: transaction.type,
        };

        await datasources.transactionDAOService.update(
            {_id: transaction._id},
            $transaction
        );

        await redisService.deleteRedisKey(STANDARD_PLAN);
        await redisService.deleteRedisKey(PREMIUM_PLAN);

        const response: HttpResponse<void> = {
            code: HttpStatus.OK.code,
            message: HttpStatus.OK.value,
        };

        return Promise.resolve(response);
    };

    @TryCatch
    public async updateTransaction(req: Request) {
        const value = req.body;

        const transaction = await datasources.transactionDAOService.findByAny({
            reference: value.reference,
        });

        if (!transaction) {
            return Promise.reject(CustomAPIError.response('Transaction Does not exist.', HttpStatus.NOT_FOUND.code));
        }

        const transactionValues = {
            channel: value.channel,
            cardType: value.cardType,
            bank: value.bank,
            last4: value.last4,
            expMonth: value.expMonth,
            expYear: value.expYear,
            countryCode: value.countryCode,
            brand: value.brand,
            currency: value.currency,
            status: value.status,
            paidAt: value.paidAt,
        };

        await datasources.transactionDAOService.update(
            {_id: transaction._id},
            transactionValues
        );

        return Promise.resolve({
            code: HttpStatus.OK.code,
            message: 'Transaction updated successfully',
            result: transaction,
        } as HttpResponse<ITransactionModel>);
    }

    @TryCatch
    @HasPermission([VENDOR_PERMISSION])
    public async getTransactionsByRef(req: Request) {
        const { reference } = req.body;
        const transaction = await datasources.transactionDAOService.findByAny({
            reference: reference
        });

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: HttpStatus.OK.value,
            result: transaction
        };

        return Promise.resolve(response);
    }

    @TryCatch
    @HasPermission([VENDOR_PERMISSION])
    public async getVendorTransactions(req: Request) {

        //@ts-ignore
        const vendorId = req.user._id;

        const transactions = await datasources.transactionDAOService.findAll({ vendor: vendorId });

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: HttpStatus.OK.value,
            results: transactions 
        };

        return Promise.resolve(response);
    }

    @TryCatch
    @HasPermission([MANAGE_ALL, READ_TRANSACTION])
    public async getTransactions(req: Request) {

        const transactions = await datasources.transactionDAOService.findAll({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: HttpStatus.OK.value,
            results: transactions 
        };

        return Promise.resolve(response);
    }

}
