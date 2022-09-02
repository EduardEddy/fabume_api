import BaseRepository from '../base.repository';

export class CountryRepository extends BaseRepository {
    constructor(readonly model:any) {
        super(model);
    }
}