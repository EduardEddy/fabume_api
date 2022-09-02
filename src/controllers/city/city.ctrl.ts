import { Request, Response } from 'express';
import { City } from '../../models/city';
import { CityRepository } from '../../repositories/city/city.repository';
import { CityService } from '../../services/city/city.service';

export class CityCtrl {
    private readonly cityService:CityService;
    constructor() {
        this.cityService = new CityService( new CityRepository(City) );
    }

    index = async (req:Request, res:Response) => {
        const cities = await this.cityService.get();
        return res.status(cities.status).json( cities.data ?? {message:cities.message});
    };

    show = async (req:Request, res:Response) => {
        const { id } = req.params;
        const city = await this.cityService.show(id);
        return res.status(city.status).json( city.data ?? {message:city.message});
    };

    byCountry = async (req:Request, res:Response) => {
        const { id } = req.params;
        const city = await this.cityService.byCountry(id);
        return res.status(city.status).json( city.data ?? {message:city.message});
    };
}