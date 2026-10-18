import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'PokeAPI UTN',
        version: '1.0.0',
        description: 'API RESTful para la gestión de Entrenadores, Medallas y Pokémones con Arquitectura Limpia.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor de Desarrollo Local',
        },
    ],
    components: {
        schemas: {
            Error: {
                type: 'object',
                properties: {
                    status: { type: 'string', example: 'fail' },
                    message: { type: 'string', example: 'Mensaje de error descriptivo' },
                    timestamp: { type: 'string', example: '2026-10-18T20:00:00.000Z' }
                }
            },
            Pokemon: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 4 },
                    nombre: { type: 'string', example: 'charmander' },
                    altura: { type: 'number', example: 6 },
                    peso: { type: 'number', example: 85 },
                    estadisticas: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                nombre: { type: 'string', example: 'vida' },
                                stat_base: { type: 'integer', example: 39 }
                            }
                        }
                    },
                    tipos: {
                        type: 'array',
                        items: { type: 'string', example: 'fuego' }
                    }
                }
            },
            Medalla: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid', example: 'c4b1...-...' },
                    nombre: { type: 'string', example: 'Medalla Roca' },
                    descripcion: { type: 'string', example: 'Otorgada por vencer a Brock.' },
                    fechaYHoraObtencion: { type: 'string', format: 'date-time', example: '2026-10-18T10:00:00.000Z' },
                    nombreJefe: { type: 'string', example: 'Brock' }
                }
            },
            Entrenador: {
                type: 'object',
                properties: {
                    id: { type: 'string', format: 'uuid', example: 'a1b2...-...' },
                    nombre: { type: 'string', example: 'Ash Ketchum' },
                    edad: { type: 'integer', example: 10 },
                    ciudad: { type: 'string', example: 'Pueblo Paleta' },
                    equipoPokemon: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Pokemon' }
                    },
                    medallas: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Medalla' }
                    }
                }
            }
        }
    }
};

const options = {
    swaggerDefinition,
    apis: ['./app.js', './routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);