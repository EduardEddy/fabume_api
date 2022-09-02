import mongoose, { model, Schema } from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const CitySchema: Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    country:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'countries'
    }
});

CitySchema.plugin( MongooseDelete, {overrideMethods:'all'});
export const City = model('cities',CitySchema);