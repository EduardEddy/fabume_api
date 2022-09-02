import { ResponseInterface } from '../interfaces/response.interface';

export const responses = async (error:any, text:string):Promise<ResponseInterface> => {
    console.log(text);
    console.log(error);
    return {
        status:500,
        message:'Internal error'
    };
};