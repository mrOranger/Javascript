import { Request, Response } from 'express';

export class CorsMiddleware {
      /**
       * Apply the following middleware to the normal HTTP request workflow.
       *
       * @param {Request} request - Incoming HTTP request.
       * @param {Response} response - Outgoing HTTP response.
       * @param {() => void} next - Callback function to be called in passing to the next middleware.
       */
      apply(request, response, next) {
            response.setHeader('Access-Controll-Allow-Origin', '*');
            response.setHeader('Access-Controll-Allow-Methods', 'POST, GET, OPTIONS');
            response.setHeader('Access-Controll-Allow-Headers', 'Content-Type');
            next();
      }
}
