import { MedallasRepository } from '../repositories/MedallasRepository.js';
import Medalla from '../models/Medalla.js';
import { NotFoundError, ConflictError } from '../errors/AppError.js';

export class MedallasService {
    constructor({ medallasRepository = new MedallasRepository() } = {}) {
        this.medallasRepository = medallasRepository;
    }

    async crearMedalla(datosBrutos) {
        const nuevaMedalla = new Medalla(datosBrutos);

        const medallasExistentes = await this.medallasRepository.obtenerTodas();
        const yaExiste = medallasExistentes.some(m => m.nombre === nuevaMedalla.nombre);
        
        if (yaExiste) {
            throw new ConflictError(`Ya existe una medalla registrada con el nombre '${nuevaMedalla.nombre}'`);
        }

        await this.medallasRepository.guardar(nuevaMedalla);
        return nuevaMedalla;
    }

    async obtenerMedallas() {
        return await this.medallasRepository.obtenerTodas();
    }

    async obtenerMedalla(idMedalla) {
        const medalla = await this.medallasRepository.obtenerPorId(idMedalla);
        
        if (!medalla) {
            throw new NotFoundError(`No se encontró la medalla con ID ${idMedalla}`);
        }
        
        return medalla;
    }

    async editarMedalla(idMedalla, datosActualizados) {
        const existe = await this.medallasRepository.obtenerPorId(idMedalla);
        if (!existe) {
            throw new NotFoundError(`No se puede editar: Medalla con ID ${idMedalla} no encontrada`);
        }

        const medallaActualizada = await this.medallasRepository.actualizar(idMedalla, datosActualizados);
        return medallaActualizada;
    }

    async borrarMedalla(idMedalla) {
        const fueEliminada = await this.medallasRepository.eliminar(idMedalla);
        
        if (!fueEliminada) {
            throw new NotFoundError(`No se puede eliminar: Medalla con ID ${idMedalla} no encontrada`);
        }
        
        return { message: "Medalla eliminada exitosamente del registro" };
    }
}