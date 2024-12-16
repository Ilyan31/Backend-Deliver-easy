import { Router } from "express";
import {
  getAllEmployes,
  getEmployeById,
  createEmploye,
  updateEmploye,
  deleteEmploye,
} from "../controllers/employeController";

const router = Router();

/**
 * @route GET /employes
 * @desc Récupérer tous les employés
 */
router.get("/", async (req, res) => {
  try {
    await getAllEmployes(req, res);
  } catch (error) {
    console.error("Erreur sur la route GET /employes:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * @route GET /employes/:id
 * @desc Récupérer un employé spécifique par son ID
 */
router.get("/:id", async (req, res) => {
  try {
    await getEmployeById(req, res);
  } catch (error) {
    console.error(`Erreur sur la route GET /employes/${req.params.id}:`, error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * @route POST /employes
 * @desc Créer un nouvel employé
 */
router.post("/", async (req, res) => {
  try {
    await createEmploye(req, res);
  } catch (error) {
    console.error("Erreur sur la route POST /employes:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * @route PUT /employes/:id
 * @desc Mettre à jour un employé existant
 */
router.put("/:id", async (req, res) => {
  try {
    await updateEmploye(req, res);
  } catch (error) {
    console.error(`Erreur sur la route PUT /employes/${req.params.id}:`, error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * @route DELETE /employes/:id
 * @desc Supprimer un employé par son ID
 */
router.delete("/:id", async (req, res) => {
  try {
    await deleteEmploye(req, res);
  } catch (error) {
    console.error(
      `Erreur sur la route DELETE /employes/${req.params.id}:`,
      error
    );
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
