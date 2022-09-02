import { Router } from 'express';

import UserCtrl from '../../controllers/users/user.ctrl';
import { verifyAuth } from '../../middleware/auth/auth_user';
import { validateCreate } from '../../middleware/validations/user/create.middleware';
import { validateUpdate } from '../../middleware/validations/user/update.middleware';
import { verifyId } from '../../middleware/auth/veiry_id';

const userCtrl = new UserCtrl();
const router = Router();

router.get('/', userCtrl.index);
router.post('/', validateCreate ,userCtrl.store);
router.get('/:id', verifyId, userCtrl.show);
router.put('/:id', verifyAuth, verifyId, validateUpdate, userCtrl.update);
router.delete('/:id', verifyAuth, verifyId, userCtrl.delete);

export default router;