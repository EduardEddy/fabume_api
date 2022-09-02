import { Router } from 'express';

import { AddressCtrl } from '../../controllers/address/address.ctrl';
import { verifyAuth } from '../../middleware/auth/auth_user';
import { validationCreate } from '../../middleware/validations/address/create.middleware';
import { verifyId } from '../../middleware/auth/veiry_id';

const addressCtrl = new AddressCtrl;
const router = Router();

router.post('/', verifyAuth, validationCreate, addressCtrl.create);
router.get('/:id', verifyAuth, verifyId, addressCtrl.show);
router.delete('/:id', verifyAuth, verifyId, addressCtrl.delete);

export default router;