import { Response,Request } from 'express';
import { Store } from '../../models/store';
import { User } from '../../models/user';
import LoginRepository from '../../repositories/auth/login.respository';
import { StoreRepository } from '../../repositories/store/store.repository';
import LoginService from '../../services/auth/login.service';
import { StoreService } from '../../services/store/store.service';

export class LoginCtrl {
    private readonly loginService:LoginService = new LoginService( new LoginRepository(User) );
    private readonly storeService:StoreService = new StoreService( new StoreRepository(Store) );
    
    login = async (req:Request, res:Response)=>{

        const {body} = req;
        const dataUser = await this.loginService.login(body.email, body.password);
        
        if(dataUser.data == null){ return res.status(dataUser.status).json({message:dataUser.message}); }

        const user = dataUser.data.user;
        const store = await this.storeService.findByUser(user.id);
        
        return res.status(dataUser.status).json({
            user,
            token:dataUser.data.token,
            store:store.data?true:false
        });
    };
}