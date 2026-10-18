import Entrenador from '../models/Entrenador.js';
import { EntrenadoresRepository } from '../repositories/EntrenadoresRepository.js';
import { PokemonesService } from './PokemonesService.js';
import { MedallasService } from './MedallasService.js';
import { NotFoundError, BadRequestError, ConflictError } from '../errors/AppError.js';

export class EntrenadoresService {
    constructor({ 
        entrenadoresRepository = new EntrenadoresRepository(),
        pokemonesService = new PokemonesService(),
        medallasService = new MedallasService() 
    } = {}) {
        this.entrenadoresRepository = entrenadoresRepository;
        this.pokemonesService = pokemonesService;
        this.medallasService = medallasService;
    }

    async crearEntrenador(datos) {
        const nuevoEntrenador = new Entrenador(datos);
        await this.entrenadoresRepository.guardar(nuevoEntrenador);
        return nuevoEntrenador;
    }

    async obtenerEntrenadores() {
        return await this.entrenadoresRepository.obtenerTodos();
    }

    async obtenerEntrenador(idEntrenador) {
        const entrenador = await this.entrenadoresRepository.obtenerPorId(idEntrenador);
        if (!entrenador) {
            throw new NotFoundError(`Entrenador con ID ${idEntrenador} no encontrado`);
        }
        return entrenador;
    }

    async editarEntrenador(idEntrenador, datosActualizados) {
        const existe = await this.entrenadoresRepository.obtenerPorId(idEntrenador);
        if (!existe) {
            throw new NotFoundError(`No se puede editar: Entrenador con ID ${idEntrenador} no encontrado`);
        }

        const entrenadorActualizado = await this.entrenadoresRepository.actualizar(idEntrenador, datosActualizados);
        return entrenadorActualizado;
    }

    async borrarEntrenador(idEntrenador) {
        const fueEliminado = await this.entrenadoresRepository.eliminar(idEntrenador);
        if (!fueEliminado) {
            throw new NotFoundError(`No se puede eliminar: Entrenador con ID ${idEntrenador} no encontrado`);
        }
        return { message: "Entrenador eliminado correctamente" };
    }

    async agregarPokemonAEquipo(idEntrenador, idPokemon) {
        const entrenadorDoc = await this.entrenadoresRepository.obtenerPorId(idEntrenador);
        if (!entrenadorDoc) throw new NotFoundError(`Entrenador con ID ${idEntrenador} no encontrado`);

        if (entrenadorDoc.equipoPokemon.length >= 6) {
            throw new BadRequestError("El entrenador ya tiene el equipo completo (6 Pokémones máximo).");
        }

        const yaLoTiene = entrenadorDoc.equipoPokemon.some(p => p.id === Number(idPokemon));
        if (yaLoTiene) {
            throw new ConflictError("Este Pokémon ya forma parte del equipo del entrenador.");
        }

        const pokemonEncontrado = await this.pokemonesService.obtenerPokemon(idPokemon);
        const entrenador = new Entrenador(entrenadorDoc);
        
        entrenador.agregarPokemon(pokemonEncontrado);
        await this.entrenadoresRepository.actualizar(idEntrenador, { equipoPokemon: entrenador.equipoPokemon });

        return entrenador;
    }

    async quitarPokemonDeEquipo(idEntrenador, idPokemon) {
        const entrenadorDoc = await this.entrenadoresRepository.obtenerPorId(idEntrenador);
        if (!entrenadorDoc) throw new NotFoundError(`Entrenador con ID ${idEntrenador} no encontrado`);

        const entrenador = new Entrenador(entrenadorDoc);
        
        const loTiene = entrenador.equipoPokemon.some(p => p.id === Number(idPokemon));
        if (!loTiene) {
            throw new NotFoundError("El Pokémon no forma parte del equipo de este entrenador");
        }

        entrenador.quitarPokemon({ id: Number(idPokemon) });
        await this.entrenadoresRepository.actualizar(idEntrenador, { equipoPokemon: entrenador.equipoPokemon });

        return entrenador;
    }

    async agregarMedallaAEntrenador(idEntrenador, idMedalla) {
        const entrenadorDoc = await this.entrenadoresRepository.obtenerPorId(idEntrenador);
        if (!entrenadorDoc) throw new NotFoundError(`Entrenador con ID ${idEntrenador} no encontrado`);

        const medalla = await this.medallasService.obtenerMedalla(idMedalla);
        const entrenador = new Entrenador(entrenadorDoc);

        const yaLaTiene = entrenador.medallas.some(m => m.id === idMedalla || m.nombre === medalla.nombre);
        if (yaLaTiene) {
            throw new ConflictError("El entrenador ya posee esta medalla.");
        }

        entrenador.agregarMedalla(medalla);
        await this.entrenadoresRepository.actualizar(idEntrenador, { medallas: entrenador.medallas });

        return entrenador;
    }

    async quitarMedallaDeEntrenador(idEntrenador, idMedalla) {
        const entrenadorDoc = await this.entrenadoresRepository.obtenerPorId(idEntrenador);
        if (!entrenadorDoc) throw new NotFoundError(`Entrenador con ID ${idEntrenador} no encontrado`);

        const entrenador = new Entrenador(entrenadorDoc);
        
        const medallaPoseida = entrenador.medallas.find(m => m.id === idMedalla);
        if (!medallaPoseida) {
            throw new NotFoundError("El entrenador no posee esta medalla.");
        }

        entrenador.quitarMedalla(medallaPoseida);
        await this.entrenadoresRepository.actualizar(idEntrenador, { medallas: entrenador.medallas });

        return entrenador;
    }
}