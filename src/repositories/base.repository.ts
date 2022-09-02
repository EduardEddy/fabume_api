export default abstract class BaseRepository {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(readonly model:any){
        this.model = model;
    }

    get = async() => await this.model.find();
    
    show = async (id:number) => await this.model.findById(id);
    
    create = async (entity:unknown) => await this.model.create(entity);
    
    update = async (entity:unknown, id:number) => await this.model.findByIdAndUpdate(id,entity);

    delete = async ( id:number) => await this.model.deleteById(id);
}