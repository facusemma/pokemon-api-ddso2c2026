import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger.js';
import routes from './routes/index.js';
import { notFoundHandler } from './middlewares/not-found.js';
import { errorHandler } from './middlewares/error-handler.js';

const App = express();

App.use(express.json());
App.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
App.use(routes);
App.use(notFoundHandler);
App.use(errorHandler);

export default app;
