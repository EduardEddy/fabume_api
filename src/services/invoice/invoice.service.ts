import BaseService from '../base.service';

export class InvoiceService extends BaseService {
    constructor(private readonly invoiceRepository: any) {
        super(invoiceRepository);
    }
}