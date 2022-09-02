import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { ValidateHelper } from '../../../helpers/validate_helper';

const validation = new ValidateHelper;

export const validationUpdate = [
    body('deilvery_type').optional({checkFalsy:true}),
    body('status').optional({checkFalsy:true}),
    body('delivery_change').optional({checkFalsy:true}),
    body('user_comment').optional({checkFalsy:true}),
    body('store_comment').optional({checkFalsy:true}),
    (req:Request, res:Response, next:NextFunction)=>{
        validation.validateResult(req,res,next);
    }
];