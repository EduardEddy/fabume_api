import mongoose, { model, Schema} from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const AddressSchema:Schema = new Schema({
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    lat:{
        type:String,
        required:true
    },
    lng:{
        type:String,
        required:true
    },
    principal:{
        type:Boolean,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});
AddressSchema.plugin( MongooseDelete, {overrideMethods:'all'});
export const Address = model('addresses',AddressSchema);