import mongoose from 'mongoose';
const { Schema } = mongoose;

const AccountSchema = new Schema({
    number: {
        type: Number,
        unique: true
    },
    balance: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Transaction'
        }
    ],
    pin: {
        type: Number,
        default: null
    },
}, { timestamps: true });

export default mongoose.model('Account', AccountSchema);
