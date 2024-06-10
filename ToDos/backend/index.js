import express from 'express';
import bodyParser from 'body-parser';
import { router as todoRoutes } from './routes/todo.route';

const application = express();

application.use(bodyParser.json());
application.use(todoRoutes);

application.listen(3000, 'todo.io');
