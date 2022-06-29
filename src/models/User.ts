import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({

    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    pin: {
        type: Number
    }

}, { timestamps: true });

export default mongoose.model('User', UserSchema);;