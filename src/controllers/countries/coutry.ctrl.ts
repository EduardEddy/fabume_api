import { Request, Response } from 'express';
import { Country } from '../../models/country';
import { CountryRepository } from '../../repositories/country/country.repository';
import { CountryService } from '../../services/country/country.service';

export class CounrtyCtrl {
    private countryService:CountryService;
    constructor() {
        this.countryService = new CountryService( new CountryRepository(Country) );    
    }

    index = async (req:Request, res:Response) => {
        const countries = await this.countryService.get();
        return res.status(countries.status).json(countries.data ?? {message:countries.message});
    };

    show = async (req:Request, res:Response) => {
        const { id } = req.params;
        const country = await this.countryService.show( id );
        return res.status(country.status).json(country.data ?? {message:country.message});
    };
}