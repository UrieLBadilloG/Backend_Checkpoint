import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  changeOrderStatus,
} from '../controllers/OrderController';

const router = Router();

// Crear una orden
router.post('/', createOrder);

// Obtener todas las órdenes
router.get('/', getOrders);

// Obtener una orden por ID
router.get('/:id', getOrderById);

// Actualizar una orden por ID
router.put('/:id', updateOrder);

// Eliminar una orden por ID
router.delete('/:id', deleteOrder);

// Cambiar el estatus de una orden
router.patch('/:id/status', changeOrderStatus);

export default router;
