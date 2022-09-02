import { Request, Response} from 'express'; 
import { UserService } from '../../services/user/user.service';
import { UserRepository } from '../../repositories/user/user.repository';
import { User } from '../../models/user';
import bcrypt from 'bcrypt';
import randomFunction from '../../helpers/random_functions';
import { matchedData } from 'express-validator';

export default class UserCtrl {
    private _userService = new UserService(new UserRepository( User ));
    index = async (req:Request, res:Response) => {
        const user = await this._userService.get();
        return res.status(user.status).json(user.data ?? {message:user.message});
    };

    show = async (req:Request, res:Response) => {
        const { id } = req.params;
        const user = await this._userService.show(id);
        return res.status(user.status).json(user.data ?? {message:user.message});
    };

    store = async (req:Request, res:Response) => {
        const body = (req.body);
        body.password = await bcrypt.hash(body.password, 10);
        body.verify = randomFunction.numberRandom();
        const user = await this._userService.create(body);
        return res.status(user.status).json({'message':user.message});
    };

    update = async (req:Request, res:Response) => {
        const { id } = req.params;
        const user = await this._userService.update(req.body,id);
        return res.status(user.status).json({'message':user.message});
    };

    delete = async (req:Request, res:Response) =>  {
        const { id } = req.params;
        const user = await this._userService.delete(id);
        return res.status(user.status).json({'message':user.message});
    };
}