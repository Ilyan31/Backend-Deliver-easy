import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db'; // Assurez-vous que db est configuré correctement
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { email, mot_de_passe } = req.body;
console.log(email,mot_de_passe);
  try {
    // Vérifiez si l'email et le mot de passe sont fournis
    if (!email || !mot_de_passe) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    // Recherchez le client dans la base de données
    const [rows] = await db.query('SELECT * FROM Clients WHERE email = ?', [email]);
    const client = (rows as any)[0];

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }
    console.log(client);
    // Vérifiez le mot de passe
    // const validPassword = await bcrypt.compare(mot_de_passe, client.mot_de_passe);
    const validPassword = client.mot_de_passe === mot_de_passe;
    if (!validPassword) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { id: client.id, email: client.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
};