import { Router } from 'express';
import PokemonesRoutes from './PokemonesRoutes.js';
import EntrenadoresRoutes from './EntrenadoresRoutes.js';

const router = Router();

router.use('/pokemones', PokemonesRoutes);

export default router;
