import { EntrenadoresService } from "../services/EntrenadoresService.js";

export class EntrenadoresController {
    constructor({ entrenadoresService = new EntrenadoresService() } = {}) {
        this.entrenadoresService = entrenadoresService;
    }

    crearEntrenador = async (req, res) => {
        const entrenador = await this.entrenadoresService.crearEntrenador(req.body);
        res.status(201).json(entrenador);
    }

    obtenerEntrenadores = async (req, res) => {
        const entrenadores = await this.entrenadoresService.obtenerEntrenadores();
        res.json(entrenadores);
    }

    obtenerEntrenador = async (req, res) => {
        const entrenador = await this.entrenadoresService.obtenerEntrenador(req.params.idEntrenador);
        res.json(entrenador);
    }

    editarEntrenador = async (req, res) => {
        const entrenadorActualizado = await this.entrenadoresService.editarEntrenador(req.params.idEntrenador, req.body);
        res.json(entrenadorActualizado);
    }

    borrarEntrenador = async (req, res) => {
        const resultado = await this.entrenadoresService.borrarEntrenador(req.params.idEntrenador);
        res.json(resultado);
    }

    agregarPokemonAEquipo = async (req, res) => {
        const { idEntrenador, idPokemon } = req.params;
        const entrenadorActualizado = await this.entrenadoresService.agregarPokemonAEquipo(idEntrenador, idPokemon);
        
        res.status(200).json({
            message: "Pokémon agregado exitosamente al equipo",
            equipo: entrenadorActualizado.equipoPokemon
        });
    }

    quitarPokemonDeEquipo = async (req, res) => {
        const { idEntrenador, idPokemon } = req.params;
        const entrenadorActualizado = await this.entrenadoresService.quitarPokemonDeEquipo(idEntrenador, idPokemon);
        
        res.status(200).json({
            message: "Pokémon eliminado del equipo correctamente",
            equipo: entrenadorActualizado.equipoPokemon
        });
    }

    agregarMedallaAEntrenador = async (req, res) => {
        const { idEntrenador, idMedalla } = req.params;
        const entrenadorActualizado = await this.entrenadoresService.agregarMedallaAEntrenador(idEntrenador, idMedalla);
        
        res.status(200).json({
            message: "Medalla otorgada exitosamente",
            medallas: entrenadorActualizado.medallas
        });
    }

    quitarMedallaDeEntrenador = async (req, res) => {
        const { idEntrenador, idMedalla } = req.params;
        const entrenadorActualizado = await this.entrenadoresService.quitarMedallaDeEntrenador(idEntrenador, idMedalla);
        
        res.status(200).json({
            message: "Medalla retirada exitosamente",
            medallas: entrenadorActualizado.medallas
        });
    }
}