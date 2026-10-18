import { MedallaModel } from '../schemas/mongoose/MedallaModel.js';
import Medalla from '../models/Medalla.js';

export class MedallasRepository {
    async guardar(medallaDominio) {
        const nuevaMedalla = new MedallaModel(medallaDominio);
        await nuevaMedalla.save();
        return medallaDominio;
    }

    async obtenerTodas() {
        const medallasDoc = await MedallaModel.find().lean();
        return medallasDoc.map(doc => new Medalla(doc));
    }

    async obtenerPorId(id) {
        const medallaDoc = await MedallaModel.findOne({ id }).lean();
        if (!medallaDoc) return null;
        
        return new Medalla(medallaDoc);
    }

    async actualizar(id, datosActualizados) {
        const medallaActualizadaDoc = await MedallaModel.findOneAndUpdate(
            { id },
            { $set: datosActualizados },
            { new: true } 
        ).lean();

        if (!medallaActualizadaDoc) return null;
        
        return new Medalla(medallaActualizadaDoc);
    }

    async eliminar(id) {
        const resultado = await MedallaModel.findOneAndDelete({ id });
        return resultado !== null;
    }
}