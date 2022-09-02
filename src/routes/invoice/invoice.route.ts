import { Router } from 'express';
import { InvoiceCtrl } from '../../controllers/invoice/invoice.ctrl';
import { validationCreate } from '../../middleware/validations/invoice/create.middleware';
import { validationUpdate } from '../../middleware/validations/invoice/update.middleware';

const router = Router();
const invoiceCtrl = new InvoiceCtrl();

router.get('/', invoiceCtrl.index);
router.get('/:id', invoiceCtrl.show);
router.post('/',  validationCreate, invoiceCtrl.store);
router.put('/:id', validationUpdate, invoiceCtrl.update);
router.delete('/:id', invoiceCtrl.delete);

export default router;