import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes';
import clientRouter from './routes/clientRoutes';
import deliveryRouter from './routes/deliveriesRoutes';
import employeRouter from './routes/employeRoutes'; // Import du fichier de routes pour les employés
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Ajout d'une valeur par défaut si process.env.PORT est indéfini

// Middleware CORS : Autoriser les requêtes depuis localhost:5173
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/clients', clientRouter);
app.use('/deliveries', deliveryRouter);
app.use('/employes', employeRouter); // Ajout des routes pour les employés

app.get('/', (req, res) => {
  res.send("Bienvenue sur l'API Deliver'easy !");
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Backend en cours d'exécution sur http://localhost:${port}`);
});