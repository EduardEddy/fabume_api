import { responses } from '../../helpers/response_error';
import { CityRepository } from '../../repositories/city/city.repository';
import BaseService from '../base.service';

export class CityService extends BaseService {
    constructor(private readonly cityRepository:CityRepository) {
        super(cityRepository);
    }

    byCountry = async (id :any) => {
        try {
            const data = await this.cityRepository.byCountry(id);
            return {
                status:200,
                message:'success',
                data
            };
        } catch (error) {
            return responses(error, `${this.cityRepository.constructor.name} method update`);
        }
    };
}