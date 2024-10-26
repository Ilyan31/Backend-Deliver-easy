import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import deliveryRoutes from './routes/deliveryRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/deliveries', deliveryRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});