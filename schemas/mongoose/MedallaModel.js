import mongoose from 'mongoose';

const medallaSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    nombre: { 
        type: String, 
        required: true 
    },
    descripcion: { 
        type: String, 
        required: true 
    },
    fechaYHoraObtencion: { 
        type: Date, 
        required: true 
    },
    nombreJefe: { 
        type: String, 
        required: true 
    }
}, { 
    timestamps: true, 
    versionKey: false 
});

export const MedallaModel = mongoose.model('Medalla', medallaSchema);