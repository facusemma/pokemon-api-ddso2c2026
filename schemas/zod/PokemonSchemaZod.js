import { z } from 'zod';

export const busquedaPokemonSchema = z.object({
    tipo: z.string().optional(),
    nombre: z.string().optional(),
    
    // Paginación
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().optional().default(10),
    
    // Físicos
    pesoMin: z.coerce.number().positive().optional(),
    pesoMax: z.coerce.number().positive().optional(),
    alturaMin: z.coerce.number().positive().optional(),
    alturaMax: z.coerce.number().positive().optional(),
    
    // Estadísticas Planas
    vidaMin: z.coerce.number().positive().optional(),
    vidaMax: z.coerce.number().positive().optional(),
    
    ataqueMin: z.coerce.number().positive().optional(),
    ataqueMax: z.coerce.number().positive().optional(),
    
    defensaMin: z.coerce.number().positive().optional(),
    defensaMax: z.coerce.number().positive().optional(),
    
    ataqueEspecialMin: z.coerce.number().positive().optional(),
    ataqueEspecialMax: z.coerce.number().positive().optional(),
    
    defensaEspecialMin: z.coerce.number().positive().optional(),
    defensaEspecialMax: z.coerce.number().positive().optional(),
    
    velocidadMin: z.coerce.number().positive().optional(),
    velocidadMax: z.coerce.number().positive().optional(),
});