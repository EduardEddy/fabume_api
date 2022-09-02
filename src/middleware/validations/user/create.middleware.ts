import { NextFunction, Response, Request } from 'express';
import { body } from 'express-validator'; 
import { ValidateHelper } from '../../../helpers/validate_helper';
import { User } from '../../../models/user';

const validation = new ValidateHelper;
export const validateCreate = [
  body('email').isEmail().withMessage('Email cant be empty')
  .notEmpty().withMessage('it cant be empty')
    .custom(value => {
      if( value !== undefined ){
        return User.findOne({'email':value}).exec().then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
      }
    }),
  body('password').isLength({min:6}).withMessage('must be at least 6 chars long').notEmpty().withMessage('it cant be empty'),
  body('name').notEmpty().withMessage('it cant be empty'),
  body('last_name').notEmpty().withMessage('it cant be empty'),
    (req:Request, res:Response, next:NextFunction)=>{
      validation.validateResult(req,res,next);
    }
];