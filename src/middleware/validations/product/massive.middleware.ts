import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
//import { isEmptyBindingElement } from 'typescript';
import { ValidateHelper } from '../../../helpers/validate_helper';
import { Store } from '../../../models/store';
//import { Store } from '../../../models/store';

const validation = new ValidateHelper;

export const validationMassive = [
    /*body('products')//.notEmpty().withMessage('it can\'t be empty')
    .custom( (value,{req}) => {
        if( req.files !== null && req.files !== undefined ){
            const extension = req.files.products.name.split('.').pop();
            if( extension !== 'xlsx' ){ 
                return Promise.reject('The file must be an xlsx');
            }
        }else {
            return Promise.reject('it can\'t be empty');
        }
    }),*/
    body('store').notEmpty().withMessage('it can\'t be emppty').isMongoId().withMessage('Invalid store')
    .custom( value => {
        return Store.findById(value).exec().then( store => {
            if( !store ){
                return Promise.reject('The store is invalid');
            }
        });
    }),
    (req:Request, res:Response, next:NextFunction)=>{
        validation.validateResult(req,res,next);
    }
];