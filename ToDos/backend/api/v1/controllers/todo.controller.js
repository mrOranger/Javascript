import { Database } from '../../../database/database.js';

export class TodoController {
      static OKAY = 200;
      static CREATED = 201;
      static NOT_FOUND = 404;
      static CONFLICT = 409;
      static UNPROCESSABLE_CONTENT = 422;
      static INTERNAL_SERVER_ERROR = 500;
      static NOT_IMPLEMENTED = 501;
      static database = new Database();

      /**
       * Get all the todo items registered, returning a 200 response.
       *
       * @param {import('express').Request} request - Incoming HTTP request.
       * @param {import('express').Response} response - Outgoing HTTP response
       */
      static getAll(request, response) {
            return response.status(TodoController.OKAY).json({
                  data: TodoController.database.getAll(),
            });
      }

      /**
       * Get the todo identified by a specific id, otherwise returns a 404 not found error,
       * otherwise a 200 okay message.
       *
       * @param {import('express').Request} request - Incoming HTTP request.
       * @param {import('express').Response} response - Outgoing HTTP response
       */
      static getById(request, response) {
            const { id } = request.params;
            try {
                  return response.status(TodoController.OKAY).json({
                        data: TodoController.database.getById(id),
                  });
            } catch (error) {
                  if (error.message == 'Data not found exception.') {
                        return response.status(TodoController.NOT_FOUND).json({
                              status: 'Not found.',
                              statusCode: TodoController.NOT_FOUND,
                              message: 'Data not found.',
                              success: false,
                        });
                  }
                  return response.status(TodoController.INTERNAL_SERVER_ERROR).json({
                        status: 'Internal Server Error',
                        statusCode: TodoController.INTERNAL_SERVER_ERROR,
                        message: 'There is an error, please try later',
                        success: false,
                  });
            }
      }

      /**
       * Creates a new todo, returning a 422 error if the number of elements exceeds the maximum size,
       * otherwise a 201 created message.
       *
       * @param {import('express').Request} request - Incoming HTTP request.
       * @param {import('express').Response} response - Outgoing HTTP response
       */
      static save(request, response) {
            const { title, description } = request.body;
            try {
                  TodoController.database.save({ title, description });
                  return response.status(TodoController.CREATED).json({
                        status: 'Created',
                        statusCode: TodoController.CREATED,
                        message: 'ToDo created successfully!',
                        success: true,
                  });
            } catch (error) {
                  if (error.message == 'Maximum size exceeded.') {
                        return response.status(TodoController.UNPROCESSABLE_CONTENT).json({
                              status: 'Unprocessable Content.',
                              statusCode: TodoController.UNPROCESSABLE_CONTENT,
                              message: 'Maximum size exceeded to save a new todo.',
                              success: false,
                        });
                  }
                  return response.status(TodoController.INTERNAL_SERVER_ERROR).json({
                        status: 'Internal Server Error',
                        statusCode: TodoController.INTERNAL_SERVER_ERROR,
                        message: 'There is an error, please try later',
                        success: false,
                  });
            }
      }

      /**
       * Updates an existing todo, returning a 422 error if there is no todo with the same id
       * passed as input, therwise a 200 okay message.
       *
       * @param {import('express').Request} request - Incoming HTTP request.
       * @param {import('express').Response} response - Outgoing HTTP response
       */
      static update(request, response) {
            const { id } = request.params;
            const { title, description } = request.body;
            try {
                  TodoController.database.update(id, { title, description });
                  return response.status(TodoController.OKAY).json({
                        status: 'Okay',
                        statusCode: TodoController.OKAY,
                        message: 'ToDo updated successfully!',
                        success: true,
                  });
            } catch (error) {
                  if (error.message == 'Data not found exception.') {
                        return response.status(TodoController.NOT_FOUND).json({
                              status: 'Not found.',
                              statusCode: TodoController.NOT_FOUND,
                              message: 'Data not found.',
                              success: false,
                        });
                  }
                  return response.status(TodoController.INTERNAL_SERVER_ERROR).json({
                        status: 'Internal Server Error',
                        statusCode: TodoController.INTERNAL_SERVER_ERROR,
                        message: 'There is an error, please try later',
                        success: false,
                  });
            }
      }

      /**
       * Updates an existing todo, returning a 422 error if there is no todo with the same id
       * passed as input, or 409 error if the status of the element is already completed
       * otherwise a 200 okay message.
       *
       * @param {import('express').Request} request - Incoming HTTP request.
       * @param {import('express').Response} response - Outgoing HTTP response
       */
      static patch(request, response) {
            const { id } = request.params;
            try {
                  TodoController.database.updateStatus(id);
                  return response.status(TodoController.OKAY).json({
                        status: 'Okay',
                        statusCode: TodoController.OKAY,
                        message: 'ToDo updated successfully!',
                        success: true,
                  });
            } catch (error) {
                  if (error.message == 'Data not found exception.') {
                        return response.status(TodoController.NOT_FOUND).json({
                              status: 'Not found.',
                              statusCode: TodoController.NOT_FOUND,
                              message: 'Data not found.',
                              success: false,
                        });
                  }
                  if (error.message == 'Todo already completed.') {
                        return response.status(TodoController.CONFLICT).json({
                              status: 'Conflict.',
                              statusCode: TodoController.CONFLICT,
                              message: 'Todo already completed.',
                              success: false,
                        });
                  }
                  return response.status(TodoController.INTERNAL_SERVER_ERROR).json({
                        status: 'Internal Server Error',
                        statusCode: TodoController.INTERNAL_SERVER_ERROR,
                        message: 'There is an error, please try later',
                        success: false,
                  });
            }
      }

      /**
       * Deletes an existing todo, returning a 404 error if there is no todo with the same id
       * passed as input, otherwise a 200 okay message.
       *
       * @param {import('express').Request} request - Incoming HTTP request.
       * @param {import('express').Response} response - Outgoing HTTP response
       */
      static delete(request, response) {
            const { id } = request.params;
            try {
                  TodoController.database.delete(id);
                  return response.status(TodoController.OKAY).json({
                        status: 'Okay',
                        statusCode: TodoController.OKAY,
                        message: 'ToDo updated successfully!',
                        success: true,
                  });
            } catch (error) {
                  if (error.message == 'Data not found exception.') {
                        return response.status(TodoController.NOT_FOUND).json({
                              status: 'Not found.',
                              statusCode: TodoController.NOT_FOUND,
                              message: 'Data not found.',
                              success: false,
                        });
                  }
                  return response.status(TodoController.INTERNAL_SERVER_ERROR).json({
                        status: 'Internal Server Error',
                        statusCode: TodoController.INTERNAL_SERVER_ERROR,
                        message: 'There is an error, please try later',
                        success: false,
                  });
            }
      }
}
