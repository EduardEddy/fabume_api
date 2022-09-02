import BaseService from '../base.service';
import { ProductRepository } from '../../repositories/product/product.repository';
import { ResponseInterface } from '../../interfaces/response.interface';
import { responses } from '../../helpers/response_error';
import { ProductInterface } from '../../interfaces/product.interface';

export class ProductService extends BaseService {
    
    constructor(private readonly productRepository:ProductRepository ) {
        super(productRepository);
    }

    massive = async (data: ProductInterface[]):Promise<ResponseInterface> => {
        try {
            await this.productRepository.massive(data);
            return {
                status:200,
                message:'success',
            };
        } catch (error) {
            return responses(error, `${this.productRepository.constructor.name} method update`);
        }
    };
}