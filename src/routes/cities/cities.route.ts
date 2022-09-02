import { Router } from 'express';

import { CityCtrl } from '../../controllers/city/city.ctrl';
import { verifyId } from '../../middleware/auth/veiry_id';

const cityCtrl = new CityCtrl;
const router = Router();

router.get('/',cityCtrl.index);
router.get('/:id', verifyId, cityCtrl.show);
router.get('/country/:id', verifyId, cityCtrl.byCountry);

export default router;