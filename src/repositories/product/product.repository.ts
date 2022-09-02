import { ProductInterface } from '../../interfaces/product.interface';
import BaseRepository from '../base.repository';

export class ProductRepository extends BaseRepository {
    constructor(readonly product:any) {
        super(product);
    }

    massive = async (data: ProductInterface[]) => await this.product.insertMany(data);
}