import mongoose, { ObjectId } from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const { Schema } = mongoose;
//Document interface
export interface User {
    username: string;
    password: string;
    account: ObjectId;
    pin: number;
}
const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    account: {
        type: ObjectId,
        ref: 'Account'
    },
    pin: {
        type: Number
    }


}, { timestamps: true });

export default mongoose.model('User', UserSchema);