import { Request, Response } from 'express';
import Truck from '../models/Truck';

export const createTruck = async (req: Request, res: Response): Promise<void> => {
  const { user, year, color, plates } = req.body;

  try {
    const newTruck = new Truck({ user, year, color, plates });
    await newTruck.save();
    res.status(201).json(newTruck);
  } catch (error) {
    res.status(500).json({ message: 'Error creando el truck', error });
  }
};

export const getTrucks = async (req: Request, res: Response): Promise<void> => {
  try {
    const trucks = await Truck.find().populate('user');
    res.status(200).json(trucks);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo trucks', error });
  }
};

export const updateTruck = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedTruck = await Truck.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedTruck) {
      res.status(404).json({ message: 'Truck no encontrado' });
      return;
    }
    res.status(200).json(updatedTruck);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando el truck', error });
  }
};

export const deleteTruck = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedTruck = await Truck.findByIdAndDelete(id);
    if (!deletedTruck) {
      res.status(404).json({ message: 'Truck no encontrado' });
      return;
    }
    res.status(200).json({ message: 'Truck eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando el truck', error });
  }
};
