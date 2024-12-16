import { Request, Response } from 'express';
import { query } from '../config/db';
import { RowDataPacket, OkPacket } from 'mysql2';

// Récupérer toutes les livraisons
export const getAllDeliveries = async (req: Request, res: Response) => {
  try {
    const rows = await query<RowDataPacket[]>('SELECT * FROM deliveries');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des livraisons:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer une livraison par ID
export const getDeliveryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rows = await query<RowDataPacket[]>('SELECT * FROM deliveries WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Livraison non trouvée' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de la livraison:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Créer une nouvelle livraison (ajout de statut)
export const createDelivery = async (req: Request, res: Response) => {
  const { livreur, date, statut } = req.body; // Ajout du champ statut
  try {
    const result = await query<OkPacket>(
      'INSERT INTO deliveries (livreur, date, statut) VALUES (?, ?, ?)',
      [livreur, date, statut]
    );
    res.status(201).json({ message: 'Livraison créée', id: result.insertId });
  } catch (error) {
    console.error('Erreur lors de la création de la livraison:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour une livraison (incluant le statut)
export const updateDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { livreur, date, statut } = req.body; // Ajout du champ statut
  try {
    const result = await query<OkPacket>(
      'UPDATE deliveries SET livreur = ?, date = ?, statut = ? WHERE id = ?',
      [livreur, date, statut, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Livraison non trouvée' });
    }
    res.json({ message: 'Livraison mise à jour' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la livraison:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer une livraison
export const deleteDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await query<OkPacket>('DELETE FROM deliveries WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Livraison non trouvée' });
    }
    res.json({ message: 'Livraison supprimée' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la livraison:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};