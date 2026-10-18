import dotenv from 'dotenv';
import app from './app.js';
import snapshotManager from './snapshot/PokeApiSnapshot.js';
import { conectarDB } from './configs/database.js';

dotenv.config(); 

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        console.log('🚀 Iniciando servidor...');
        
        if (!snapshotManager.existsOnDisk()) {
            console.log('Snapshot no encontrado. Generando...');
            await snapshotManager.refresh();
        }

        await conectarDB()

        app.listen(PORT, () => {
            console.log(`🌐 Servidor corriendo en http://localhost:${PORT}`);
        });

        const intervaloMs = Number(process.env.REFRESH_INTERVAL_HOURS) * 3600000 || 43200000; // 12 horas por defecto

        setInterval(async () => {
            try {
                console.log('🔄 Actualizando snapshot de la PokeAPI automáticamente...');
                await snapshotManager.refresh();
            } catch (error) {
                console.error('❌ Error en la actualización automática del snapshot:', error.message);
            }
        }, intervaloMs);
    } catch (error) {
        console.error("❌ Error fatal al arrancar el servidor:", error);
        process.exit(1);
    }
}

startServer();