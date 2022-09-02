import BaseService from '../base.service';
import { StoreRepository } from '../../repositories/store/store.repository';
import { ResponseInterface } from '../../interfaces/response.interface';
import { responses } from '../../helpers/response_error';

export class StoreService extends BaseService {
    constructor(private readonly storeRepository:StoreRepository ){
        super(storeRepository);
    }

    inactive = async (id:string):Promise<ResponseInterface> => {
        try {
            await this.storeRepository.inactive(id);
            return {
                status:200,
                message:'success',
            };
        } catch (error) {
            return responses(error, `${this.storeRepository.constructor.name} method update`);
        }
    };

    findByUser = async (id:string):Promise<ResponseInterface> => {
        try {
            const data = await this.storeRepository.findByUser(id);
            return {
                status:200,
                message:'success',
                data
            };
        } catch (error) {
            return responses(error, `${this.storeRepository.constructor.name} method findByUser`);
        }
    };
}