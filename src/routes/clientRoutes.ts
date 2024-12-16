import { Router } from 'express';
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/clientController';

const clientRouter = Router();

clientRouter.get('/', getAllClients); // Récupérer tous les clients
clientRouter.get('/:id', getClientById); // Récupérer un client par ID
clientRouter.post('/', createClient); // Créer un nouveau client
clientRouter.put('/:id', updateClient); // Mettre à jour un client
clientRouter.delete('/:id', deleteClient); // Supprimer un client

export default clientRouter;