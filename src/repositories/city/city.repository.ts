import BaseRepository from '../base.repository';

export class CityRepository extends BaseRepository {
    constructor(readonly model:any) {
        super(model);
    }

    byCountry = async (country:any) => await this.model.find({country});
}