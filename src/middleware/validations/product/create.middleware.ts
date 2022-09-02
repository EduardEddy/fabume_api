import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { ValidateHelper } from '../../../helpers/validate_helper';
import { Store } from '../../../models/store';

const validation = new ValidateHelper;

export const validationCreate = [
    body('name').notEmpty().withMessage('it can\'t be emppty'),
    body('description').optional({checkFalsy:true}),
    body('components').optional({checkFalsy:true}),
    body('cant').optional({checkFalsy:true}).isNumeric().withMessage('the cant is invalid'),
    body('price').notEmpty().withMessage('it can\'t be empty').isNumeric().withMessage('The price is invalid'),
    body('image')
    /*.custom( (value,{req}) => {
        if( req.files !== null && req.files !== undefined ){
            const extension = req.files.image.name.split('.').pop();
            if(extension !== 'png' && extension !== 'jpg'){ 
                console.log(extension !== 'jpg');
                return Promise.reject('The image is invalid');
            }
        }
    })*//*.optional({checkFalsy: true})*/,
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