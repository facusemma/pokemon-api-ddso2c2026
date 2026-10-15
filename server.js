import dotenv from 'dotenv';
import app from './app.js';
import snapshotManager from './snapshot/PokeApiSnapshot.js';

dotenv.config(); 

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        console.log('🚀 Iniciando servidor...');
        
        // Verificamos si existe el snapshot antes de abrir el servidor
        if (!snapshotManager.existsOnDisk()) {
            console.log('📁 Snapshot no encontrado. Generando...');
            await snapshotManager.refresh();
        }

        app.listen(PORT, () => {
            console.log(`🌐 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error fatal al arrancar el servidor:", error);
        process.exit(1);
    }
}

startServer();