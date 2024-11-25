import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/UserController';

const router = Router();

// Rutas para registro y login
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
