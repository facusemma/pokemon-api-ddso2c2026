import mongoose from 'mongoose';

export const conectarDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        const dbName = process.env.MONGO_DB_NAME;
        
        await mongoose.connect(uri, { dbName });
        console.log(`🗄️ Conectado exitosamente a MongoDB (Base de datos: ${dbName})`);
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error.message);
        process.exit(1);
    }
};