import BaseRepository from '../base.repository';

export class UserRepository extends BaseRepository {
    private _model:any;
    constructor(model:any){
        super(model);
        this._model = model;
    }

    inactive = async (id:string) => await this._model.findByIdAndUpdate(id,{'account':'inactive'});
}