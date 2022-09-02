import { Router } from 'express';
import { MassiveProductCtrl } from '../../controllers/product/massive_product.ctrl';
import { validationMassive } from '../../middleware/validations/product/massive.middleware';

const router = Router();
const massiveCtrl = new MassiveProductCtrl();

router.post('/', validationMassive, massiveCtrl.load);

export default router;