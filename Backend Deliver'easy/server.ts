const express = require('express');
const dotenv = require('dotenv');
import { Request, Response } from 'express';  // Importation des types pour Express

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Initialisation de l'application Express
const app = express();

// Définition du port (depuis .env ou 3000 par défaut)
const port = process.env.PORT || 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});