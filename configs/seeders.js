import { EntrenadorModel } from '../schemas/mongoose/EntrenadorModel.js';
import { MedallaModel } from '../schemas/mongoose/MedallaModel.js';
import Entrenador from '../models/Entrenador.js';
import Medalla from '../models/Medalla.js';

export const seedDatabase = async () => {
    try {
        // Verificamos si ya hay datos
        const entrenadoresCount = await EntrenadorModel.countDocuments();
        const medallasCount = await MedallaModel.countDocuments();

        if (entrenadoresCount === 0 && medallasCount === 0) {
            console.log('🌱 Base de datos vacía. Ejecutando script semilla (Seeder)...');

            // 1. Instanciamos Entrenadores usando el Modelo de Dominio (autogenera UUIDs)
            const ash = new Entrenador({ nombre: 'Ash Ketchum', edad: 10, ciudad: 'Pueblo Paleta' });
            const misty = new Entrenador({ nombre: 'Misty', edad: 10, ciudad: 'Ciudad Celeste' });
            const brock = new Entrenador({ nombre: 'Brock', edad: 15, ciudad: 'Ciudad Plateada' });

            // 2. Instanciamos Medallas usando el Modelo de Dominio
            const medallaRoca = new Medalla({
                nombre: 'Medalla Roca',
                descripcion: 'Otorgada por vencer al líder Brock en Ciudad Plateada.',
                fechaYHoraObtencion: new Date('2026-10-18T10:00:00Z'),
                nombreJefe: 'Brock'
            });

            const medallaCascada = new Medalla({
                nombre: 'Medalla Cascada',
                descripcion: 'Otorgada por vencer a Misty en el gimnasio de Ciudad Celeste.',
                fechaYHoraObtencion: new Date('2026-10-25T14:30:00Z'),
                nombreJefe: 'Misty'
            });

            // (Opcional) Podemos simular que Ash ya ganó la Medalla Roca
            ash.agregarMedalla(medallaRoca);

            // 3. Guardamos todo físicamente en MongoDB
            await EntrenadorModel.insertMany([ash, misty, brock]);
            await MedallaModel.insertMany([medallaRoca, medallaCascada]);

            console.log('✅ Base de datos poblada exitosamente con datos de prueba.');
        } else {
            console.log('🌳 La base de datos ya contiene datos. Se omite el Seeder.');
        }
    } catch (error) {
        console.error('❌ Error al ejecutar el Seeder:', error.message);
    }
};