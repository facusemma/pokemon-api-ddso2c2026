import express from 'express';
import cors from 'cors'; 
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger.js';
import routes from './routes/Routes.js'; 
import { NotFoundHandler } from './middlewares/NotFoundHandler.js';
import { ErrorHandler } from './middlewares/ErrorHandler.js';

const app = express();

app.use(express.json());
app.use(cors()); 

/**
 * @swagger
 * /healthcheck:
 *   get:
 *     summary: Verifica el estado del servidor
 *     tags: [Sistema]
 *     responses:
 *       200:
 *         description: El servidor está funcionando correctamente
 */
app.get("/healthcheck", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString()
    });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routes); 
app.use(NotFoundHandler);
app.use(ErrorHandler);

export default app;