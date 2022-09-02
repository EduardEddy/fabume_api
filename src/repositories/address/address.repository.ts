import BaseRepository from '../base.repository';

export class AddressRepository extends BaseRepository {
    constructor(readonly address:any) {
      super(address);  
    }
}