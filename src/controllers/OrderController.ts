import { Request, Response } from 'express';
import Order from '../models/Order';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { user, truck, status, pickup, dropoff } = req.body;

  try {
    const newOrder = new Order({ user, truck, status, pickup, dropoff });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creando la orden', error });
  }
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate('user', 'email')
      .populate('truck', 'plates')
      .populate('pickup', 'address')
      .populate('dropoff', 'address');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo órdenes', error });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id)
      .populate('user', 'email')
      .populate('truck', 'plates')
      .populate('pickup', 'address')
      .populate('dropoff', 'address');
    if (!order) {
      res.status(404).json({ message: 'Orden no encontrada' });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo la orden', error });
  }
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedOrder) {
      res.status(404).json({ message: 'Orden no encontrada' });
      return;
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando la orden', error });
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      res.status(404).json({ message: 'Orden no encontrada' });
      return;
    }
    res.status(200).json({ message: 'Orden eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando la orden', error });
  }
};

export const changeOrderStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['created', 'in transit', 'completed'].includes(status)) {
    res.status(400).json({ message: 'Estatus inválido' });
    return;
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder) {
      res.status(404).json({ message: 'Orden no encontrada' });
      return;
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error cambiando el estatus de la orden', error });
  }
};
