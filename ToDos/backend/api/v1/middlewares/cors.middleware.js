export class CorsMiddleware {
      /**
       * Apply the following middleware to the normal HTTP request workflow.
       *
       * @param {import('express').Request} request - Incoming HTTP request.
       * @param {import('express').Response} response - Outgoing HTTP response.
       * @param {() => void} next - Callback function to be called in passing to the next middleware.
       */
      static apply(request, response, next) {
            response.setHeader('Access-Controll-Allow-Origin', '*');
            response.setHeader('Access-Controll-Allow-Methods', 'POST, GET, OPTIONS');
            response.setHeader('Access-Controll-Allow-Headers', 'Content-Type');
            next();
      }
}
