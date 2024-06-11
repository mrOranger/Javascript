import { TodoController } from './controllers/todo.controller';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { router } from './routes/todo.route';

export default {
      controllers: {
            todo: new TodoController(),
      },
      middlewares: {
            cors: new CorsMiddleware(),
      },
      routes: {
            todo: router,
      },
};
