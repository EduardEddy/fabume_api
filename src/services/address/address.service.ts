import BaseService from '../base.service';
import { AddressRepository } from '../../repositories/address/address.repository';

export class AddressService extends BaseService {
    constructor(readonly addressRepository:AddressRepository) {
        super( addressRepository );
    }
}