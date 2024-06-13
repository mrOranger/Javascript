import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from './api/v1/routes/todo.route.js';

const application = express();

application.use(bodyParser.json());
application.use(cors());
application.use(router);

application.listen(8000);
