import { Request, Response } from 'express';
import { query } from '../config/db'; // Import de la configuration de la base de données
import { RowDataPacket, OkPacket } from 'mysql2';

// Récupérer tous les clients
export const getAllClients = async (req: Request, res: Response) => {
  try {
    const rows = await query<RowDataPacket[]>('SELECT * FROM Clients'); // Suppression de la destructuration inutile
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des clients:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer un client par ID
export const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rows = await query<RowDataPacket[]>('SELECT * FROM Clients WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du client:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Créer un client
export const createClient = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await query<OkPacket>(
      'INSERT INTO Clients (name, email) VALUES (?, ?)',
      [name, email]
    );

    res.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    console.error('Erreur lors de la création du client:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour un client
export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const result = await query<OkPacket>(
      'UPDATE Clients SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }

    res.json({ message: 'Client mis à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du client:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un client
export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await query<OkPacket>('DELETE FROM Clients WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }

    res.json({ message: 'Client supprimé' });
  } catch (error) {
    console.error('Erreur lors de la suppression du client:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};