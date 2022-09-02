import { Router } from 'express';
import { StoreCtrl } from '../../controllers/stores/store.ctrl';
import { verifyAuth } from '../../middleware/auth/auth_user';
import { validateCreate } from '../../middleware/validations/store/create.middleware';
import { verifyId } from '../../middleware/auth/veiry_id';

const storeCtrl = new StoreCtrl;
const router = Router();

router.get('/',storeCtrl.index);
router.get('/:id', verifyId,storeCtrl.show);
router.post('/', verifyAuth, validateCreate, storeCtrl.store);
router.put('/:id', verifyAuth, verifyId, validateCreate, storeCtrl.update);
router.delete('/:id', verifyAuth, verifyId, storeCtrl.delete);

export default router;