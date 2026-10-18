import { NotFoundError } from '../errors/AppError.js';

export const NotFoundHandler = (req, res, next) => {
    next(new NotFoundError(`Ruta no encontrada: ${req.originalUrl}`));
};