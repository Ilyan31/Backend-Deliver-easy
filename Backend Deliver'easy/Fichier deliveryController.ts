import { Request, Response } from 'express';
import db from '../models/db';

export const getDeliveries = async (req: Request, res: Response) => {
    const [rows] = await db.query('SELECT * FROM deliveries');
    res.json(rows);
};

export const createDelivery = async (req: Request, res: Response) => {
    const { client_id, address, status } = req.body;
    await db.query('INSERT INTO deliveries (client_id, address, status) VALUES (?, ?, ?)', [client_id, address, status]);
    res.status(201).json({ message: 'Delivery created' });
};

export const updateDelivery = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    await db.query('UPDATE deliveries SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Delivery updated' });
};

export const deleteDelivery = async (req: Request, res: Response) => {
    const { id } = req.params;
    await db.query('DELETE FROM deliveries WHERE id = ?', [id]);
    res.json({ message: 'Delivery deleted' });
};