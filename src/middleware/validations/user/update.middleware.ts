import { NextFunction, Response, Request } from 'express';
import { body } from 'express-validator'; 
import { ValidateHelper } from '../../../helpers/validate_helper';

const validation = new ValidateHelper;
export const validateUpdate = [
  body('email').isEmail().withMessage('Email cant be empty').notEmpty().withMessage('it cant be empty'),
  body('password').isLength({min:6}).withMessage('must be at least 6 chars long').notEmpty().withMessage('it cant be empty'),
  body('name').notEmpty().withMessage('it cant be empty'),
  body('last_name').notEmpty().withMessage('it cant be empty'),
    (req:Request, res:Response, next:NextFunction)=>{
      validation.validateResult(req,res,next);
    }
];