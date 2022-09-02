import mongoose, { model, Schema } from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const ProductSchema:Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    components:{
        type:String,
        required:false
    },
    cant:{
        type:Number,
        required:false,
        default:1
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:false,
        default:null
    },
    ref_image:{
        type:Boolean,
        default:false
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'stores'
    }

},{
    timestamps:true
});

ProductSchema.plugin( MongooseDelete, {overrideMethods:'all'});
export const Product = model('products',ProductSchema);