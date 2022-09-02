import { NextFunction, Request, Response } from 'express';

export const verifyId = (req:Request,res:Response,next:NextFunction) => {
    const { id } = req.params;
    if ( id.length != 24 ) {
        return res.status(400).json({message:'invalid id'});
    }
    next();
};