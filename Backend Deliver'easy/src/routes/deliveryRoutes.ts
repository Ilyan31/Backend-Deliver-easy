import { Router } from 'express';
import { getAllDeliveries, createDelivery } from '../controllers/deliveryController';

const router = Router();

router.get('/', getAllDeliveries);
router.post('/', createDelivery);

export default router;