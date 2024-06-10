import express from 'express';
import bodyParser from 'body-parser';

const application = express();

application.use(bodyParser.json());

application.listen(3000, 'todo.io');
