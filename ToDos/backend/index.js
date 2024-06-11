import express from 'express';
import bodyParser from 'body-parser';
import { router } from './api/v1/routes/todo.route.js';
import { CorsMiddleware } from './api/v1/middlewares/cors.middleware.js';

const application = express();

application.use(bodyParser.json());
application.use(CorsMiddleware.apply);
application.use(router);

application.listen(3000);
