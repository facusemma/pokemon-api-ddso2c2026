import { EntrenadorModel } from '../schemas/mongoose/EntrenadorModel.js';
import Entrenador from '../models/Entrenador.js';

export class EntrenadoresRepository {
    async guardar(entrenadorDominio) {
        const nuevoEntrenador = new EntrenadorModel(entrenadorDominio);
        await nuevoEntrenador.save();
        return entrenadorDominio;
    }

    async obtenerTodos() {
        const entrenadoresDoc = await EntrenadorModel.find().lean();
        return entrenadoresDoc.map(doc => new Entrenador(doc));
    }

    async obtenerPorId(id) {
        const entrenadorDoc = await EntrenadorModel.findOne({ id }).lean();
        if (!entrenadorDoc) return null;
        
        return new Entrenador(entrenadorDoc);
    }

    async actualizar(id, datosActualizados) {
        const entrenadorActualizadoDoc = await EntrenadorModel.findOneAndUpdate(
            { id },
            { $set: datosActualizados },
            { new: true } 
        ).lean();

        if (!entrenadorActualizadoDoc) return null;
        
        return new Entrenador(entrenadorActualizadoDoc);
    }

    async eliminar(id) {
        const resultado = await EntrenadorModel.findOneAndDelete({ id });
        return resultado !== null;
    }
}