import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { ValidateHelper } from '../../../helpers/validate_helper';

const validation = new ValidateHelper;

export const validationCreate = [
    body('country').notEmpty().withMessage('it can\'t be emppty'),
    body('city').notEmpty().withMessage('it can\'t be emppty'),
    body('address').notEmpty().withMessage('it can\'t be emppty'),
    body('lat').notEmpty().withMessage('it can\'t be emppty'),
    body('lng').notEmpty().withMessage('it can\'t be emppty'),
    body('principal').notEmpty().withMessage('it can\'t be emppty').isBoolean(),
    (req:Request, res:Response, next:NextFunction)=>{
        validation.validateResult(req,res,next);
    }
];