import { model, Schema  } from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const CountrySchema: Schema = new Schema({
    //"id": 239,
    name: {
        type:String, 
        required:true
    },
    iso3: {
        type:String, 
        required:false
    },
    numeric_code: String,
    iso2: {
        type:String, 
        required:true
    },
    phonecode: String,
    capital:String,
    currency:String,
    currency_name:String,
    currency_symbol:String,
    tld:String,
    native:String,
    region:String,
    subregion:String,
    timezones:String,
    latitude:String,
    longitude:String,
    emoji:String,
    emojiU:String,
});
CountrySchema.plugin( MongooseDelete, {overrideMethods:'all'});
export const Country = model('countries',CountrySchema);