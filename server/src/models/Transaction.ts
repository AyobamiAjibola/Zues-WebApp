import mongoose, { Document, Schema } from 'mongoose';

interface ITransactions {
    reference: string,
    amount: number,
    status: string,
    type: string,
    serviceStatus: string,
    authorizationUrl: string,
    last4: string,
    expMonth: string,
    expYear: string,
    channel: string,
    cardType: string,
    bank: string,
    countryCode: string,
    brand: string,
    currency: string,
    paidAt: Date,
    vendor: mongoose.Types.ObjectId;
};

const transactionSchema = new Schema<ITransactions>({
    reference: { type: String },
    amount: { type: Number },
    status: { type: String },
    type: { type: String },
    serviceStatus: { type: String },
    authorizationUrl: { type: String },
    last4: { type: String },
    expMonth: { type: String },
    expYear: { type: String },
    channel: { type: String },
    cardType: { type: String },
    bank: { type: String },
    countryCode: { type: String },
    brand: { type: String },
    currency: { type: String },
    paidAt: { type: Date },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor' }
});

transactionSchema.pre('findOne', function (next) {
    this.populate('vendor');
    next();
});
  
export interface ITransactionModel extends Document, ITransactions {}
  
const Transaction = mongoose.model<ITransactionModel>('Transaction', transactionSchema as any);

export default Transaction