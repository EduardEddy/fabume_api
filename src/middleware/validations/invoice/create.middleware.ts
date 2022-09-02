import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { ValidateHelper } from '../../../helpers/validate_helper';
import { Address } from '../../../models/address';
import { Store } from '../../../models/store';
import { User } from '../../../models/user';

const validation = new ValidateHelper;

export const validationCreate = [
    body('deilvery_type').optional({checkFalsy:true}),
    body('products').notEmpty().withMessage('it can\'t be empty'),

    body('store').notEmpty().withMessage('it can\'t be emppty').isMongoId().withMessage('Invalid store')
    .custom( value => {
        return Store.findById(value).exec().then( store => {
            if( !store ) return Promise.reject('The store is invalid');
        });
    }),
    body('user').notEmpty().withMessage('it can\'t be emppty').isMongoId().withMessage('Invalid store')
    .custom( value => {
        return User.findById(value).exec().then( user => {
            if( !user ) return Promise.reject('The user is invalid');
        });
    }),
    body('address').notEmpty().withMessage('it can\'t be emppty').isMongoId().withMessage('Invalid store')
    .custom( value => {
        return Address.findById(value).exec().then( address => {
            if( !address ) return Promise.reject('The address is invalid');
        });
    }),
    (req:Request, res:Response, next:NextFunction)=>{
        validation.validateResult(req,res,next);
    }
];