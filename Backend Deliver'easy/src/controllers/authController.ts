import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const validPassword = await bcrypt.compare(password, (user as any).password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: (user as any).id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.json({ token });
};