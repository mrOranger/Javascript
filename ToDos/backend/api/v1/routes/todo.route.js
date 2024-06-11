import express from 'express';

const router = express.Router();

router.get('/api/v1/todo', null);
router.get('api/v1/todo/:id', null);

router.post('api/v1/todo', null);

router.put('api/v1/todo/:id', null);

router.patch('api/v1/todo/:id', null);

router.delete('api/v1/todo/:id', null);

export { router };
