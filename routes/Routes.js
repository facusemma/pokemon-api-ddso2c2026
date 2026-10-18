import { Router } from 'express';
import PokemonesRoutes from './PokemonesRoutes.js';
import EntrenadoresRoutes from './EntrenadoresRoutes.js';
import MedallasRoutes from './MedallasRoutes.js'; 

const router = Router();

router.use('/pokemones', PokemonesRoutes);
router.use('/entrenadores', EntrenadoresRoutes);
router.use('/medallas', MedallasRoutes);

export default router;