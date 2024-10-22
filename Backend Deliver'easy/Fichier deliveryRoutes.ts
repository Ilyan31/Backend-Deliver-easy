import express from 'express';
import { getDeliveries, createDelivery, updateDelivery, deleteDelivery } from '../controllers/deliveryController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getDeliveries);
router.post('/', authMiddleware, createDelivery);
router.put('/:id', authMiddleware, updateDelivery);
router.delete('/:id', authMiddleware, deleteDelivery);

export default router;