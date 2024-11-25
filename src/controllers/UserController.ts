import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'Usuario ya registrado' });
        return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ 
        message: 'Usuario registrado exitosamente', 
        userId: newUser._id // Aquí regresamos el userId
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registrando usuario', error });
    }
  };
  

  export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: 'Credenciales incorrectas' });
        return;
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ 
        token, 
        userId: user._id // Aquí regresamos el userId
      });
    } catch (error) {
      res.status(500).json({ message: 'Error iniciando sesión', error });
    }
  };
  
