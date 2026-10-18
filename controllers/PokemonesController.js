import { PokemonesService } from "../services/PokemonesService.js";

export class PokemonesController {
    constructor({ pokemonesService = new PokemonesService() } = {}) {
        this.pokemonesService = pokemonesService;
    }

    obtenerPokemones = async (req, res) => {
        const resultado = await this.pokemonesService.obtenerPokemones(req.query);
        res.json(resultado);
    }

    obtenerPokemon = async (req, res) => {
        const pokemon = await this.pokemonesService.obtenerPokemon(req.params.idPokemon);
        res.json(pokemon);
    }
}