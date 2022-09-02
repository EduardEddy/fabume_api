import BaseService from '../base.service';
import { UserRepository } from '../../repositories/user/user.repository';
import { ResponseInterface } from '../../interfaces/response.interface';
import { responses } from '../../helpers/response_error';

export class UserService extends BaseService {
    constructor(private readonly userRepository: UserRepository){
        super(userRepository);
    }

    inactive = async (id:string):Promise<ResponseInterface>  =>{
      try {
        await this.userRepository.inactive(id);
        return {
            status:200,
            message:'success',
        };
      } catch (error) {
        return responses(error, `${this.userRepository.constructor.name} method update`);
      }  
    };
}