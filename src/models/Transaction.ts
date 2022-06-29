import mongoose from 'mongoose';
const { Schema } = mongoose;

const Title = {
    DEPOSIT: 'DEPOSIT',
    WITHDRAWAL: 'WITHDRAWAL',
    TRANSFER: 'TRANSFER'
};

const TransactionSchema = new Schema({
    title: {
        type: String,
        required: true,
        enum: [Title.DEPOSIT, Title.WITHDRAWAL, Title.TRANSFER]
    },
    amount: {
        type: Number,
        required: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    description: {
        type: String
    },
}, { timestamps: true });

export default mongoose.model('Transaction', TransactionSchema);
