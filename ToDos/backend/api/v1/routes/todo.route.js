import express from 'express';
import { TodoController } from '../controllers/todo.controller.js';

const router = express.Router();

router.get('/api/v1/todo', TodoController.getAll);
router.get('/api/v1/todo/:id', TodoController.getById);

router.post('/api/v1/todo', TodoController.save);

router.put('/api/v1/todo/:id', TodoController.update);

router.patch('/api/v1/todo/:id', TodoController.patch);

router.delete('/api/v1/todo/:id', TodoController.delete);

export { router };
