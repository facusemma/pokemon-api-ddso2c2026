import snapshotManager from '../snapshot/PokeApiSnapshot.js';
import { NotFoundError } from '../errors/AppError.js';

export class PokemonesService {
    async obtenerPokemones(filtros) {
        const { 
            tipo, nombre, page, limit, 
            pesoMin, pesoMax, alturaMin, alturaMax,
            vidaMin, vidaMax, ataqueMin, ataqueMax, defensaMin, defensaMax,
            ataqueEspecialMin, ataqueEspecialMax, defensaEspecialMin, defensaEspecialMax,
            velocidadMin, velocidadMax
        } = filtros;

        let pokemones = await snapshotManager.readFromDisk();
        
        if (nombre) {
            const searchNombre = nombre.toLowerCase();
            pokemones = pokemones.filter(p => p.nombre.toLowerCase().includes(searchNombre));
        }
        if (tipo) {
            const searchTipo = tipo.toLowerCase();
            pokemones = pokemones.filter(p => p.hasType(searchTipo));
        }

        if (pesoMin !== undefined) pokemones = pokemones.filter(p => p.peso >= pesoMin);
        if (pesoMax !== undefined) pokemones = pokemones.filter(p => p.peso <= pesoMax);
        if (alturaMin !== undefined) pokemones = pokemones.filter(p => p.altura >= alturaMin);
        if (alturaMax !== undefined) pokemones = pokemones.filter(p => p.altura <= alturaMax);

        if (vidaMin !== undefined) pokemones = pokemones.filter(p => p.getStatValue("vida") >= vidaMin);
        if (vidaMax !== undefined) pokemones = pokemones.filter(p => p.getStatValue("vida") <= vidaMax);

        if (ataqueMin !== undefined) pokemones = pokemones.filter(p => p.getStatValue("ataque") >= ataqueMin);
        if (ataqueMax !== undefined) pokemones = pokemones.filter(p => p.getStatValue("ataque") <= ataqueMax);

        if (defensaMin !== undefined) pokemones = pokemones.filter(p => p.getStatValue("defensa") >= defensaMin);
        if (defensaMax !== undefined) pokemones = pokemones.filter(p => p.getStatValue("defensa") <= defensaMax);

        if (ataqueEspecialMin !== undefined) pokemones = pokemones.filter(p => p.getStatValue("ataque especial") >= ataqueEspecialMin);
        if (ataqueEspecialMax !== undefined) pokemones = pokemones.filter(p => p.getStatValue("ataque especial") <= ataqueEspecialMax);

        if (defensaEspecialMin !== undefined) pokemones = pokemones.filter(p => p.getStatValue("defensa especial") >= defensaEspecialMin);
        if (defensaEspecialMax !== undefined) pokemones = pokemones.filter(p => p.getStatValue("defensa especial") <= defensaEspecialMax);

        if (velocidadMin !== undefined) pokemones = pokemones.filter(p => p.getStatValue("velocidad") >= velocidadMin);
        if (velocidadMax !== undefined) pokemones = pokemones.filter(p => p.getStatValue("velocidad") <= velocidadMax);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const pokemonesPaginados = pokemones.slice(startIndex, endIndex);

        return {
            info: {
                totalRegistros: pokemones.length,
                paginasTotales: Math.ceil(pokemones.length / limit),
                paginaActual: page,
                limite: limit
            },
            data: pokemonesPaginados
        };
    }

    async obtenerPokemon(idPokemon) {
        const pokemones = await snapshotManager.readFromDisk();
        const pokemon = pokemones.find(p => p.id === Number(idPokemon));
        
        if (!pokemon) {
            throw new NotFoundError(`No se encontró el Pokémon con ID ${idPokemon}`);
        }
        
        return pokemon;
    }
}