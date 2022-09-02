import { NextFunction, Response, Request } from 'express';
import { validationResult } from 'express-validator';

export class ValidateHelper {
    validateResult = (req:Request, res:Response, next:NextFunction) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (error:any) {
            return res.status(422).json({
                errors:error.errors
            });
        }
    };
}