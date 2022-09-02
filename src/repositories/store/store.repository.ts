import BaseRepository from '../base.repository';

export class StoreRepository extends BaseRepository {
    constructor(readonly store:any) {
        super(store);
    }

    inactive = async (id:string) => await this.store.findByIdAndUpdate(id,{'status':'inactive'});
    findByUser = async (id:string) => await this.store.findOne({'user':id});
}