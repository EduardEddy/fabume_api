import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { uploadToCloudinary } from '../../helpers/handle_cloudinary_upload';
import { Product } from '../../models/product';
import { ProductRepository } from '../../repositories/product/product.repository';
import { ProductService } from '../../services/product/product.service';

export class ProductCtrl {
    private productService = new ProductService( new ProductRepository(Product) );
    
    index = async (req:Request, res:Response ) => {
        const products = await this.productService.get();
        return res.status(products.status).json(products.data ?? {message:products.message});
    };

    show = async (req:Request, res:Response ) =>{
        const {id} = req.params;
        const product = await this.productService.show(id);
        return res.status(product.status).json(product.data ?? {message:product.message});
    };

    store = async (req:Request, res:Response ) => {
        const body = matchedData(req, { includeOptionals: true });
        if( req.files !== null  && req.files !== undefined) {
            const upload = await uploadToCloudinary(req.files?.image);
            if( upload.name == 'Error' ){ return res.status(400).json({message:'Error to upload image'}); }
            body.image = upload.secure_url;
        }       
        const product = await this.productService.create(body);
        return res.status(product.status).json(product.data ?? {message:product.message});
        
    };

    update = async (req:Request, res:Response ) => {
        const {id} = req.params;
        const body = matchedData(req);
        const product = await this.productService.update( body,id );
        return res.status(product.status).json(product.data ?? {message:product.message});
    };

    delete = async (req:Request, res:Response ) => {
        const {id} = req.params;
        const product = await this.productService.delete( id );
        return res.status(product.status).json(product.data ?? {message:product.message});
    };
}