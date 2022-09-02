import { NextFunction, Response, Request } from 'express';
import { ValidateHelper } from '../../../helpers/validate_helper';
import { body } from 'express-validator';

const validation = new ValidateHelper;
export const validateCreate = [
    body('name').notEmpty().withMessage('name can\'t be empty'),
    body('country').notEmpty().withMessage('country can\'t be empty'),
    body('city').notEmpty().withMessage('city can\'t be empty'),
    body('address').notEmpty().withMessage('address can\'t be empty'),
    body('lat').notEmpty().withMessage('lat can\'t be empty'),
    body('lng').notEmpty().withMessage('lng can\'t be empty'),
    body('location').optional(),
    (req:Request,res:Response,next:NextFunction) => {
        validation.validateResult(req,res,next);
    }
];