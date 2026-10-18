import { ZodError } from 'zod';
import { AppError } from '../errors/AppError.js'; 

export const ErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const timestamp = new Date().toISOString();

    if (err instanceof ZodError) {
        const primerError = err.errors[0];
        const campo = primerError.path.join('.');

        return res.status(400).json({
            status: "fail",
            message: `Error en el campo '${campo}': ${primerError.message}`,
            timestamp
        });
    }

    if (err instanceof AppError || err.status) { 
        return res.status(err.statusCode || err.status).json({
            status: err.status,
            message: err.message,
            timestamp: err.timestamp || timestamp,
        });
    }

    console.error('ERROR INESPERADO:', err);
    
    return res.status(500).json({ 
        status: "error",
        message: "Ocurrió un error interno en el servidor",
        timestamp,
    });
};