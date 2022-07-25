import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
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
        type: ObjectId,
        ref: 'User'
    },
    transactions: [
        {
            type: ObjectId,
            ref: 'Transaction'
        }
    ],
    pin: {
        type: Number,
        default: null
    },
}, { timestamps: true });

export default mongoose.model('Account', AccountSchema);
