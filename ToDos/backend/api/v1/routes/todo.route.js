import express from 'express';
import serviceProvider from '../service.provider';

const router = express.Router();

router.get('/api/v1/todo', serviceProvider.controllers.todo.getAll);
router.get('api/v1/todo/:id', serviceProvider.controllers.todo.getById);

router.post('api/v1/todo', serviceProvider.controllers.todo.save);

router.put('api/v1/todo/:id', serviceProvider.controllers.todo.update);

router.patch('api/v1/todo/:id', serviceProvider.controllers.todo.patch);

router.delete('api/v1/todo/:id', serviceProvider.controllers.todo.delete);

export { router };
