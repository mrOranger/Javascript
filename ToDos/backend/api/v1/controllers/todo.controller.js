import { Request, Response } from 'express';

export class TodoController {
      static OKAY = 200;
      static CREATED = 201;
      static NOT_FOUND = 404;
      static CONFLICT = 409;
      static UNPROCESSABLE_CONTENT = 422;
      static NOT_IMPLEMENTED = 501;

      /**
       * Get all the todo items registered, returning a 200 response.
       *
       * @param {Request} request - Incoming HTTP request.
       * @param {Response} response - Outgoing HTTP response
       */
      getAll(request, response) {
            return response.status(TodoController.NOT_IMPLEMENTED);
      }

      /**
       * Get the todo identified by a specific id, otherwise returns a 404 not found error,
       * otherwise a 200 okay message.
       *
       * @param {Request} request - Incoming HTTP request.
       * @param {Response} response - Outgoing HTTP response
       */
      getById(request, response) {
            return response.status(TodoController.NOT_IMPLEMENTED);
      }

      /**
       * Creates a new todo, returning a 422 error if the number of elements exceeds the maximum size,
       * otherwise a 201 created message.
       *
       * @param {Request} request - Incoming HTTP request.
       * @param {Response} response - Outgoing HTTP response
       */
      save(request, response) {
            return response.status(TodoController.NOT_IMPLEMENTED);
      }

      /**
       * Updates an existing todo, returning a 422 error if there is no todo with the same id
       * passed as input, therwise a 200 okay message.
       *
       * @param {Request} request - Incoming HTTP request.
       * @param {Response} response - Outgoing HTTP response
       */
      update(request, response) {
            return response.status(TodoController.NOT_IMPLEMENTED);
      }

      /**
       * Updates an existing todo, returning a 422 error if there is no todo with the same id
       * passed as input, or 409 error if the status of the element is already completed
       * otherwise a 200 okay message.
       *
       * @param {Request} request - Incoming HTTP request.
       * @param {Response} response - Outgoing HTTP response
       */
      patch(request, response) {
            return response.status(TodoController.NOT_IMPLEMENTED);
      }

      /**
       * Deletes an existing todo, returning a 422 error if there is no todo with the same id
       * passed as input, otherwise a 200 okay message.
       *
       * @param {Request} request - Incoming HTTP request.
       * @param {Response} response - Outgoing HTTP response
       */
      delete(request, response) {
            return response.status(TodoController.NOT_IMPLEMENTED);
      }
}
