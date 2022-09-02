import axios from 'axios';
import { Country } from '../../src/models/country';
import dotenv from 'dotenv';
dotenv.config();
import { ConnectionToDB } from '../connection';
import { City } from '../../src/models/city';
import { CountryInterface } from '../../src/interfaces/country.interface';
import mongoose, { ObjectId } from 'mongoose';
import { CityInterface } from '../../src/interfaces/city.interface';



class CountriesSave {
    constructor() {
        new ConnectionToDB;
        this.saveCountries();
    }

    petition = async (endpoint:string) => {
        try {
            const data = await axios.get(`https://api.countrystatecity.in/v1/${endpoint}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSCAPI-KEY': process.env.TOKEN_COUNTRIES || ''
                },
            });
            return data.data;
        } catch (error) {
            console.log('en peticion');
            console.log(error);
        }
    };

    saveCountries = async () => {
        const countries: [] = await this.petition('countries');
        Country.collection.insertMany(countries);
        this.countriesCpmplete(countries);
    };

    countriesCpmplete = async (countries:CountryInterface[]) => {
        countries.forEach( async (element:CountryInterface) => {
            const country:CountryInterface = await this.petition(`countries/${element.iso2}`);
            const countryUpdate = await Country.findOneAndUpdate({'iso2':element.iso2},country) as unknown as CountryInterface;
            
            if( countryUpdate ){
                this.saveCities(element.iso2, countryUpdate._id as string);
            }
        });
        console.log('Finalizó');
    };

    saveCities = async (iso:string, countryId:string) => {
        const cities: [] = await this.petition(`countries/${iso}/cities`);
        cities.forEach( async (city:CityInterface) => {
            city.country = countryId as unknown as ObjectId;
            const country = new mongoose.Types.ObjectId(countryId);
            await City.create({
                name:city['name'],
                country
            });
        });
        await City.collection.insertMany(cities);
    };
}

new CountriesSave;
