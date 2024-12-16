import { Request, Response } from "express";
import { query } from "../config/db";
import { RowDataPacket, OkPacket } from "mysql2";

// Récupérer tous les employés
export const getAllEmployes = async (req: Request, res: Response) => {
  try {
    const rows = await query<RowDataPacket[]>("SELECT * FROM Employe");
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des employés:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des employés." });
  }
};

// Récupérer un employé par ID
export const getEmployeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID de l'employé est requis." });
  }

  try {
    const [rows] = await query<RowDataPacket[]>(
      "SELECT * FROM Employe WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Employé non trouvé." });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'employé:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de l'employé." });
  }
};

// Créer un employé
export const createEmploye = async (req: Request, res: Response) => {
  const { nom, role, telephone, email, mot_de_passe } = req.body;

  // Validation des entrées
  if (!nom || !role || !telephone || !email || !mot_de_passe) {
    return res
      .status(400)
      .json({ message: "Tous les champs sont requis pour créer un employé." });
  }

  try {
    const result = await query<OkPacket>(
      "INSERT INTO Employe (nom, role, telephone, email, mot_de_passe) VALUES (?, ?, ?, ?, ?)",
      [nom, role, telephone, email, mot_de_passe]
    );
    res
      .status(201)
      .json({ message: "Employé créé avec succès.", id: result.insertId });
  } catch (error) {
    console.error("Erreur lors de la création de l'employé:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'employé." });
  }
};

// Mettre à jour un employé
export const updateEmploye = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nom, role, telephone, email, mot_de_passe } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: "ID de l'employé est requis pour la mise à jour." });
  }

  if (!nom && !role && !telephone && !email && !mot_de_passe) {
    return res.status(400).json({
      message: "Au moins un champ est requis pour mettre à jour un employé.",
    });
  }

  try {
    const result = await query<OkPacket>(
      "UPDATE Employe SET nom = ?, role = ?, telephone = ?, email = ?, mot_de_passe = ? WHERE id = ?",
      [nom, role, telephone, email, mot_de_passe, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employé non trouvé." });
    }

    res.status(200).json({ message: "Employé mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'employé:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'employé." });
  }
};

// Supprimer un employé
export const deleteEmploye = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "ID de l'employé est requis pour la suppression." });
  }

  try {
    const result = await query<OkPacket>("DELETE FROM Employe WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employé non trouvé." });
    }

    res.status(200).json({ message: "Employé supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'employé:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'employé." });
  }
};
