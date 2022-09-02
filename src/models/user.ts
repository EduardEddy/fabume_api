import mongoose, { model, Schema } from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const UserSchame: Schema = new Schema({
    name:{
        type: String, 
        required: true
    },
    last_name:{
        type: String, 
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String, 
        required: true,
    },
    phone:{
        type: String, 
        required: false
    },
    account:{
        type: String,
        enum:['active','inactive','suspended'],
        required:false,
        default: 'inactive'
    },
    verify:{
        type: Number,
        required:false
    },
    profile:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    addresses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'addresses'
        }
    ],
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'stores'
    }
},{
    timestamps: true
});

UserSchame.plugin( MongooseDelete, {overrideMethods:'all'});
export const User = model('users', UserSchame);