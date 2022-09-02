import BaseRepository from '../base.repository';

export class InvoiceRepository extends BaseRepository {
    constructor(readonly invoice:any) {
        super(invoice);
    }

    show = async (id:number) => await this.model.findById(id)
        .populate('user')
        .populate('store')
        .populate('address');
}