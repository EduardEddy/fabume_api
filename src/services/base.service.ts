import { responses } from '../helpers/response_error';
import { ResponseInterface } from '../interfaces/response.interface';

export default abstract class BaseService {
    constructor(private readonly repository:any){}

    get = async ():Promise<ResponseInterface>  => {
        try {
            const data =  await this.repository.get();
            return {
                status: 200,
                message:'success',
                data

            };
        } catch (error) {
            return responses(error, `${this.repository.constructor.name} method update`);
        }
    };

    show = async(id:string):Promise<ResponseInterface> => {
        let status = 200;
        let message = 'success';
        try {
            const data = await this.repository.show(id);
            if( !data ) {
                status = 404;
                message = 'not found';
            }
            return { status, message, data };
        } catch (error) {
            return responses(error, `${this.repository.constructor.name} method update`);
        }
    };

    create = async (entity:any):Promise<ResponseInterface> => {
        try {
            await this.repository.create(entity);
            return {
                status:201,
                message: 'success'
            };
        } catch (error) {
            return responses(error, `${this.repository.constructor.name} method create`);
        }
    };

    update = async (entity:any, id:string ):Promise<ResponseInterface> =>{
        try {
            await this.repository.update(entity, id);
            return {
                status:200,
                message: 'success'
            };
        } catch (error) {
            return responses(error, `${this.repository.constructor.name} method update`);
        }
    };

    delete = async (id:string ):Promise<ResponseInterface> =>{
        try {
            await this.repository.delete(id);
            return {
                status:200,
                message: 'success'
            };
        } catch (error) {
            return responses(error, `${this.repository.constructor.name} method delete`);
        }
    };
}