import mongoose, { model, Schema } from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const InvoiceSchema:Schema = new Schema({
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'stores'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    subtotal:{
        type:Number,
        default:0
    },
    deilvery_type:{
        type:String,
        enum:['domicilio','local'],
        default:'domicilio'
    },
    status:{
        type:String,
        enum:['solicitado','aceptado','cancelado tienda','cancelado usuario','enviado','entregado'],
        default:'solicitado'
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'addresses'
    },
    products:[
        {
            _id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products'
            },
            name:{
                type:String,
                required:true
            },
            price:{
                type:String,
                required:true
            },
            image:{
                type:String,
                default:null
            },
            cant:{
                type:Number,
                required:true
            },
        }
    ],
    delivery_change:{
        type:String,
        required:false,
        enum:['solicitud','aceptado','rechazado',null],
        default:null
    },
    user_comment:{
        type:String,
        required:false,
        default:null
    },
    store_comment:{
        type:String,
        required:false,
        default:null
    }
},{
    timestamps:true
});

InvoiceSchema.plugin( MongooseDelete, {overrideMethods:'all'});
export const Invoice = model('invoices',InvoiceSchema);