import { Router } from 'express';

import { CounrtyCtrl } from '../../controllers/countries/coutry.ctrl';
import { verifyId } from '../../middleware/auth/veiry_id';

const countryCtrl = new CounrtyCtrl;
const router = Router();

router.get('/', countryCtrl.index);
router.get('/:id', verifyId, countryCtrl.show);

export default router;