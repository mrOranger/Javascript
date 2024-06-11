import express from 'express';
import bodyParser from 'body-parser';
import todoServiceProvider from './api/v1/service.provider';

const application = express();

application.use(bodyParser.json());
application.use(todoServiceProvider.routes);
application.use(todoServiceProvider.middlewares.cors.apply);

application.listen(3000, 'todo.io');
