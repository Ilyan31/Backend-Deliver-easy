import express from 'express';
import cors from 'cors';

const app = express();
const port = 8889;  // Port mis à jour

app.use(cors());
app.use(express.json());

// Route de base avec un message de débogage
app.get('/', (req, res) => {
  console.log("Route / appelée");  // Message de débogage pour confirmer l'accès
  res.send("Bienvenue sur l'API Deliver'easy !");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});