import { Response, Request } from 'express';
import mongoose from 'mongoose';
import { Address } from '../../models/address';
import { AddressRepository } from '../../repositories/address/address.repository';
import { AddressService } from '../../services/address/address.service';

export class AddressCtrl {
    private readonly addressService: AddressService;
    constructor() { this.addressService = new AddressService( new AddressRepository(Address) ); }

    create = async (req:Request, res:Response) => {
        const body = req.body;
        body.user = new mongoose.Types.ObjectId(req.user.id);
        const address =  await this.addressService.create(body);
        return res.status(address.status).json({message:address.message});
    };

    show = async (req:Request, res:Response) => {
        const { id } = req.params;
        const address = await this.addressService.show( id );
        return res.status(address.status).json(address.data??{});
    };

    delete = async (req:Request, res:Response) => {
        const { id } = req.params;
        const address = await this.addressService.delete(id);
        return res.status(address.status).json({message:address.message});
    };
}