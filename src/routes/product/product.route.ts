import { Router } from 'express';
import { ProductCtrl } from '../../controllers/product/product.ctrl';
import { validationCreate } from '../../middleware/validations/product/create.middleware';
import { validationUpdate } from '../../middleware/validations/product/update.middleware';

const router = Router();
const productCtrl = new ProductCtrl();

router.get('/', productCtrl.index);
router.get('/:id', productCtrl.show);
router.post('/', validationCreate, productCtrl.store);
router.put('/:id', validationUpdate, productCtrl.update);
router.delete('/:id', productCtrl.delete);

export default router;