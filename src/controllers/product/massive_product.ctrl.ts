import { Request, Response } from 'express';
import XLSX from 'xlsx';
import { ProductInterface } from '../../interfaces/product.interface';
import { imageExists } from '../../helpers/validate_remote_image';
import { ProductService } from '../../services/product/product.service';
import { ProductRepository } from '../../repositories/product/product.repository';
import { Product } from '../../models/product';

export class MassiveProductCtrl {
    private productService = new ProductService( new ProductRepository(Product) );
    /*constructor() {
        
    }*/
    load = async (req:Request, res:Response) => {
        
        const info:any = req.files?.products;
        
        if( info != null ){
            const file = XLSX.readFile(info.tempFilePath);
            const sheetMax = file.SheetNames[0]; // get name of the Sheet
            const datas:any  = XLSX.utils.sheet_to_json(file.Sheets[sheetMax]);
            const products: ProductInterface[]=[];
            for (const data of datas ) {
                let ref = true;
                if( data.image !== undefined && data.image !== '' ){
                    const exist = await imageExists(data.image);
                    data.image = exist ? data.image : null;
                    ref = exist;
                }else{
                    data.image = null;
                    ref = false;
                }

                const product: ProductInterface = this.getObjetToSave(data, req.body.store, ref);
                if( product.name != '' && product.name !=  undefined && product.price > 0 && product.price != undefined){
                    products.push(product);
                }
            }
            if( products.length > 0 ) {
                this.productService.massive(products);
            }
        }
        return res.json({message:'termino'});
    };

    private getObjetToSave( data:any, store:string, ref:boolean ): ProductInterface {
        const product: ProductInterface = {
            name: data.nombre,
            description: data.descripcion,
            components: data.componente,
            cant: data.cantidad,
            price: data.precio,
            image: data.image,
            store: store,
            ref_image: ref,
        };
        return product;
    }
}