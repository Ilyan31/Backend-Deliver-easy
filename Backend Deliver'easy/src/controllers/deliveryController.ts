import { Request, Response } from 'express';
import db from '../config/db';

export const getAllDeliveries = async (req: Request, res: Response) => {
  const [deliveries] = await db.query('SELECT * FROM deliveries');
  res.json(deliveries);
};

export const createDelivery = async (req: Request, res: Response) => {
  const { address, deliveryDate } = req.body;
  const [result] = await db.query('INSERT INTO deliveries (address, delivery_date) VALUES (?, ?)', [address, deliveryDate]);
  res.json({ id: (result as any).insertId, address, deliveryDate });
};