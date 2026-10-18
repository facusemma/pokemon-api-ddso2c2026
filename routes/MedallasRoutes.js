import { Router } from 'express';
import { MedallasController } from '../controllers/MedallasController.js';
import { validarBody } from '../middlewares/ValidarDatosHandler.js';
import { crearMedallaSchema, editarMedallaSchema } from '../schemas/zod/MedallaSchemaZod.js';

const router = Router();
const controller = new MedallasController();

/**
 * @swagger
 * /api/medallas:
 *   get:
 *     summary: Obtiene todas las medallas
 *     tags: [Medallas]
 *     responses:
 *       200:
 *         description: Lista de medallas
 *   post:
 *     summary: Crea una nueva medalla
 *     tags: [Medallas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string, example: "Medalla Alma" }
 *               descripcion: { type: string, example: "Vence a Koga en Ciudad Fucsia." }
 *               fechaYHoraObtencion: { type: string, example: "2026-10-18T15:30:00Z" }
 *               nombreJefe: { type: string, example: "Koga" }
 *     responses:
 *       201:
 *         description: Medalla creada
 */
router.get('/', controller.obtenerMedallas);
router.post('/', validarBody(crearMedallaSchema), controller.crearMedalla);

/**
 * @swagger
 * /api/medallas/{idMedalla}:
 *   get:
 *     summary: Obtiene una medalla por su UUID
 *     tags: [Medallas]
 *     parameters:
 *       - in: path
 *         name: idMedalla
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Datos de la medalla
 *   put:
 *     summary: Edita una medalla
 *     tags: [Medallas]
 *     parameters:
 *       - in: path
 *         name: idMedalla
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreJefe: { type: string, example: "Janine" }
 *     responses:
 *       200:
 *         description: Medalla actualizada
 *   delete:
 *     summary: Elimina una medalla del sistema
 *     tags: [Medallas]
 *     parameters:
 *       - in: path
 *         name: idMedalla
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Medalla eliminada
 */
router.get('/:idMedalla', controller.obtenerMedalla);
router.put('/:idMedalla', validarBody(editarMedallaSchema), controller.editarMedalla);
router.delete('/:idMedalla', controller.borrarMedalla);

export default router;