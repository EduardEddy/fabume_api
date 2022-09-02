import { CountryRepository } from '../../repositories/country/country.repository';
import BaseService from '../base.service';

export class CountryService extends BaseService{
    constructor(private readonly countryRepository:CountryRepository ) {
        super(countryRepository);
    }
}