import { z } from 'zod';

export const crearEntrenadorSchema = z.object({
    nombre: z.string({
        required_error: "El nombre es obligatorio",
        invalid_type_error: "El nombre debe ser un texto"
    }).min(3, "El nombre debe tener al menos 3 caracteres"),
    
    edad: z.number({
        required_error: "La edad es obligatoria",
        invalid_type_error: "La edad debe ser un número"
    }).int("La edad no puede tener decimales")
      .positive("La edad debe ser mayor a 0"),
    
    ciudad: z.string({
        required_error: "La ciudad es obligatoria"
    })
});

export const editarEntrenadorSchema = crearEntrenadorSchema.partial().refine(data => Object.keys(data).length > 0, {
    message: "Al menos un campo debe ser proporcionado para la actualización"
});