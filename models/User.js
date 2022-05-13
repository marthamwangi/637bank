const mongoose = require( 'mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    userName: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    account:{
        type:Schema.Types.ObjectId,
        ref:'Account'
    },
    pin:{
        type: Number
    }

}, {timestamps:true});

module.exports = mongoose.model('User',UserSchema);;