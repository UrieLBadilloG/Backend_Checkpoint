import { Router } from 'express';
import { createTruck, getTrucks, updateTruck, deleteTruck } from '../controllers/TruckController';

const router = Router();

router.post('/', createTruck);
router.get('/', getTrucks);
router.put('/:id', updateTruck);
router.delete('/:id', deleteTruck);

export default router;
