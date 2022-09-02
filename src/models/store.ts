import mongoose, { model, Schema } from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const StoreSchema:Schema = new Schema({
    name:{
        type:String,
        required:true,
    },
    bussiness_id:{
        type:String,
        required:false,
    },
    country:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    /*lat:{
        type:String,
        required:true,
    },
    lng:{
        type:String,
        required:true,
    },*/
    location:{
        type:{
            type:String,
            default:'Point'
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    is_open:{
        type:Boolean,
        required:true,
        default: false,
    },
    status:{
        type: String,
        enum:['active','inactive'],
        default:'active'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'products'
        }
    ]
},{
    timestamps:true
});

StoreSchema.index({location:'2dsphere'});
StoreSchema.plugin( MongooseDelete, {overrideMethods:'all'});
export const Store = model('stores',StoreSchema);