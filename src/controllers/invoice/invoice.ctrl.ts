import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { Invoice } from '../../models/invoice';
import { Product } from '../../models/product';
import { InvoiceRepository } from '../../repositories/invoice/invoice.repository';
import { InvoiceService } from '../../services/invoice/invoice.service';

export class InvoiceCtrl {
    private invoiceService = new InvoiceService( new InvoiceRepository( Invoice));
    private subtotal = 0;

    index = async (req:Request, res:Response) => {
        const invoices = await this.invoiceService.get();
        return res.status(invoices.status).json(invoices.data ?? {message:invoices.message});
    };

    show = async (req:Request, res:Response) => {
        const { id } = req.params;
        const invoice = await this.invoiceService.show(id);
        return res.status(invoice.status).json(invoice.data ?? {message:invoice.message});
    };

    store = async (req:Request, res:Response) => {
        const body = matchedData(req);
        body.products = await this.checkDataToInvoice(body.products);
        body.subtotal = this.subtotal;
        const invoice = await this.invoiceService.create(body);
        return res.status(invoice.status).json(invoice.data ?? {message:invoice.message});
    };

    update = async (req:Request, res:Response ) => {
        const {id} = req.params;
        const body = req.body;
        const invoice = await this.invoiceService.update( body,id );
        return res.status(invoice.status).json(invoice.data ?? {message:invoice.message});
    };

    delete = async (req:Request, res:Response ) => {
        const {id} = req.params;
        const invoice = await this.invoiceService.delete( id );
        return res.status(invoice.status).json(invoice.data ?? {message:invoice.message});
    };

    private checkDataToInvoice = async (products: any[]): Promise<any[]> => {
        const list=[];
        for (const product of products) {
            const prod: any = await Product.findById(product.id);
            prod.cant = product.cant;
            list.push({
                name:prod.name, 
                price:prod.price, 
                image:prod.image, 
                cant:prod.cant, 
                _id:prod._id
            });
            this.subtotal = this.subtotal+(prod.price * product.cant);
        }
        return list;
    };
}