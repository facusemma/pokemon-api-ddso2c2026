import { Router } from 'express';
import { EntrenadoresController } from '../controllers/EntrenadoresController.js';
import { validarBody } from '../middlewares/ValidarDatosHandler.js';
import { crearEntrenadorSchema, editarEntrenadorSchema } from '../schemas/zod/EntrenadorSchemaZod.js';

const router = Router();
const controller = new EntrenadoresController();

/**
 * @swagger
 * /api/entrenadores:
 *   get:
 *     summary: Obtiene todos los entrenadores
 *     tags: [Entrenadores]
 *     responses:
 *       200:
 *         description: Lista de entrenadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entrenador'
 *   post:
 *     summary: Crea un nuevo entrenador
 *     tags: [Entrenadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string, example: "Gary Oak" }
 *               edad: { type: integer, example: 10 }
 *               ciudad: { type: string, example: "Pueblo Paleta" }
 *     responses:
 *       201:
 *         description: Entrenador creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrenador'
 */
router.get('/', controller.obtenerEntrenadores);
router.post('/', validarBody(crearEntrenadorSchema), controller.crearEntrenador);

/**
 * @swagger
 * /api/entrenadores/{idEntrenador}:
 *   get:
 *     summary: Obtiene un entrenador por su UUID
 *     tags: [Entrenadores]
 *     parameters:
 *       - in: path
 *         name: idEntrenador
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Datos del entrenador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrenador'
 *   put:
 *     summary: Edita un entrenador existente
 *     tags: [Entrenadores]
 *     parameters:
 *       - in: path
 *         name: idEntrenador
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ciudad: { type: string, example: "Isla Canela" }
 *     responses:
 *       200:
 *         description: Entrenador actualizado
 *   delete:
 *     summary: Elimina un entrenador
 *     tags: [Entrenadores]
 *     parameters:
 *       - in: path
 *         name: idEntrenador
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Entrenador eliminado
 */
router.get('/:idEntrenador', controller.obtenerEntrenador);
router.put('/:idEntrenador', validarBody(editarEntrenadorSchema), controller.editarEntrenador);
router.delete('/:idEntrenador', controller.borrarEntrenador);

/**
 * @swagger
 * /api/entrenadores/{idEntrenador}/pokemones/{idPokemon}:
 *   post:
 *     summary: Agrega un Pokémon al equipo del entrenador (máximo 6)
 *     tags: [Entrenadores]
 *     parameters:
 *       - in: path
 *         name: idEntrenador
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: idPokemon
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Pokémon agregado al equipo exitosamente
 *       400:
 *         description: Equipo completo (6 máximo)
 *       409:
 *         description: El Pokémon ya está en el equipo
 *   delete:
 *     summary: Quita un Pokémon del equipo
 *     tags: [Entrenadores]
 *     parameters:
 *       - in: path
 *         name: idEntrenador
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: idPokemon
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Pokémon quitado exitosamente
 */
router.post('/:idEntrenador/pokemones/:idPokemon', controller.agregarPokemonAEquipo);
router.delete('/:idEntrenador/pokemones/:idPokemon', controller.quitarPokemonDeEquipo);

/**
 * @swagger
 * /api/entrenadores/{idEntrenador}/medallas/{idMedalla}:
 *   post:
 *     summary: Otorga una medalla al entrenador
 *     tags: [Entrenadores]
 *     parameters:
 *       - in: path
 *         name: idEntrenador
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: idMedalla
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Medalla otorgada
 *   delete:
 *     summary: Retira una medalla al entrenador
 *     tags: [Entrenadores]
 *     parameters:
 *       - in: path
 *         name: idEntrenador
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: idMedalla
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Medalla retirada
 */
router.post('/:idEntrenador/medallas/:idMedalla', controller.agregarMedallaAEntrenador);
router.delete('/:idEntrenador/medallas/:idMedalla', controller.quitarMedallaDeEntrenador);

export default router;