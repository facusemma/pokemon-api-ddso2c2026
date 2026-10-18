import mongoose from 'mongoose';

const entrenadorSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    nombre: { 
        type: String, 
        required: true 
    },
    edad: { 
        type: Number, 
        required: true 
    },
    ciudad: { 
        type: String, 
        required: true 
    },
    equipoPokemon: { 
        type: Array, 
        default: [] 
    },
    medallas: { 
        type: Array, 
        default: [] 
    }
}, { 
    timestamps: true, 
    versionKey: false 
});

export const EntrenadorModel = mongoose.model('Entrenador', entrenadorSchema);