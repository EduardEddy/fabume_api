import {Request, Response} from 'express';
import { matchedData } from 'express-validator';
import { Store } from '../../models/store';
import { StoreRepository } from '../../repositories/store/store.repository';
import { StoreService } from '../../services/store/store.service';

export class StoreCtrl {

    private _storeService = new StoreService( new StoreRepository( Store ) );
    index = async (req:Request, res:Response ) => {
        const stores = await this._storeService.get();
        return res.status(stores.status).json( stores.data ?? {message:stores.message});
    };

    show = async (req:Request, res:Response ) => {
        const { id } = req.params;
        const store = await this._storeService.show(id);
        return res.status(store.status).json( store.data ?? {message:store.message});
    };

    store = async (req:Request, res:Response ) => {
        const body = req.body;//matchedData( req );
        body.user = req.user.id;
        body.location = {coordinates:[body.lng, body.lat]};
        console.log(body);
        const store = await this._storeService.create( body );
        
        return res.status(store.status).json( store.data ?? {message:store.message});
    };

    update = async (req:Request, res:Response ) => {
        const body = req.body;
        const {id} = req.params;
        const store = await this._storeService.update(body, id);
        return res.status(store.status).json( store.data ?? {message:store.message});
    };
    
    delete = async (req:Request, res:Response ) => {
        const {id} = req.params;
        const store = await this._storeService.delete(id);
        return res.status(store.status).json( store.data ?? {message:store.message});
    };
}