import { Router } from 'express';
import { PokemonesController } from '../controllers/PokemonesController.js';

const router = Router();
const controller = new PokemonesController();

/**
 * @swagger
 * /api/pokemones:
 *   get:
 *     summary: Obtiene la lista de Pokémones con paginación y filtros avanzados
 *     tags: [Pokemones]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: Número de página actual
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *         description: Cantidad de resultados por página
 *       - in: query
 *         name: nombre
 *         schema: { type: string }
 *         description: Búsqueda parcial por nombre (ej. "char")
 *       - in: query
 *         name: tipo
 *         schema: { type: string }
 *         description: Filtrar por tipo (ej. fuego, agua, electrico)
 *       - in: query
 *         name: pesoMin
 *         schema: { type: number }
 *       - in: query
 *         name: pesoMax
 *         schema: { type: number }
 *       - in: query
 *         name: alturaMin
 *         schema: { type: number }
 *       - in: query
 *         name: alturaMax
 *         schema: { type: number }
 *       - in: query
 *         name: vidaMin
 *         schema: { type: number }
 *       - in: query
 *         name: vidaMax
 *         schema: { type: number }
 *       - in: query
 *         name: ataqueMin
 *         schema: { type: number }
 *       - in: query
 *         name: ataqueMax
 *         schema: { type: number }
 *       - in: query
 *         name: defensaMin
 *         schema: { type: number }
 *       - in: query
 *         name: defensaMax
 *         schema: { type: number }
 *       - in: query
 *         name: ataqueEspecialMin
 *         schema: { type: number }
 *       - in: query
 *         name: ataqueEspecialMax
 *         schema: { type: number }
 *       - in: query
 *         name: defensaEspecialMin
 *         schema: { type: number }
 *       - in: query
 *         name: defensaEspecialMax
 *         schema: { type: number }
 *       - in: query
 *         name: velocidadMin
 *         schema: { type: number }
 *       - in: query
 *         name: velocidadMax
 *         schema: { type: number }
 *     responses:
 *       200:
 *         description: Lista de Pokémones obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 info:
 *                   type: object
 *                   properties:
 *                     totalRegistros: { type: integer, example: 151 }
 *                     paginasTotales: { type: integer, example: 16 }
 *                     paginaActual: { type: integer, example: 1 }
 *                     limite: { type: integer, example: 10 }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pokemon'
 */
router.get('/', controller.obtenerPokemones); 

/**
 * @swagger
 * /api/pokemones/{idPokemon}:
 *   get:
 *     summary: Obtiene un Pokémon específico por su ID numérico
 *     tags: [Pokemones]
 *     parameters:
 *       - in: path
 *         name: idPokemon
 *         required: true
 *         schema: { type: integer }
 *         description: ID numérico del Pokémon (ej. 4 para Charmander)
 *     responses:
 *       200:
 *         description: Detalles completos del Pokémon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: Pokémon no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:idPokemon', controller.obtenerPokemon); 

export default router;