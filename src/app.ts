import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import userRoutes from './routes/UserRoutes';
import truckRoutes from './routes/TruckRoutes';
import orderRoutes from './routes/OrderRoutes';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch((err) => console.log('Error conectando a MongoDB:', err));

// Rutas
app.use('/users', userRoutes);
app.use('/trucks', truckRoutes);
app.use('/orders', orderRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
