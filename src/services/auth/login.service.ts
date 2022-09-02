/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseService from '../base.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { responses } from '../../helpers/response_error';
import { loginRespInterface } from '../../interfaces/response.interface';
import LoginRepository from '../../repositories/auth/login.respository';
import { UserInterface } from '../../interfaces/user.interface';

class LoginService extends BaseService {
    constructor(readonly loginRepository:LoginRepository) {
        super(loginRepository);
    }

    login = async(email:string, password:string):Promise<loginRespInterface> => {
        try {
            const user = await this.loginRepository.login(email);
            if(user) {
                const info = await bcrypt.compare(password, user.password);
                if( info ) {
                    const token = await this.generateToken(user);
                    return {
                        status:200,
                        data:{user, token}
                    };
                }
            }
            return { message:'Invalid credentials', status:401 };
        } catch (error) {
            return responses(error, `${this.constructor.name} method login`);
        }
    };

    private generateToken = async (user:UserInterface): Promise<string> => {
        return await jwt.sign(
            {
                'id':user.id,
                'name':user.name,
                'last_name':user.last_name
            },
            process.env.PRIVATE_KEY||'TRY-TO-TEST'
        );
    };
}

export default LoginService;