import { z } from 'zod';

export const crearMedallaSchema = z.object({
    nombre: z.string({
        required_error: "El nombre de la medalla es obligatorio",
        invalid_type_error: "El nombre debe ser un texto"
    }).min(3, "El nombre debe tener al menos 3 caracteres"),
    
    descripcion: z.string({
        required_error: "La descripción es obligatoria",
        invalid_type_error: "La descripción debe ser un texto"
    }).min(10, "La descripción debe tener al menos 10 caracteres para ser válida"),
    
    fechaYHoraObtencion: z.coerce.date({
        required_error: "La fecha y hora de obtención es obligatoria",
        invalid_type_error: "El formato de la fecha es inválido (usa ISO 8601, ej: '2026-10-17T15:30:00Z')"
    }),
    
    nombreJefe: z.string({
        required_error: "El nombre del líder o jefe es obligatorio",
        invalid_type_error: "El nombre del jefe debe ser un texto"
    }).min(3, "El nombre del jefe debe tener al menos 3 caracteres")
});

export const editarMedallaSchema = crearMedallaSchema.partial();