export class NotImplementedException extends Error {
      #message;

      constructor(message) {
            super(message);
            this.#message = message;
      }

      get name() {
            return 'NotImplementeException';
      }

      get message() {
            return this.#message;
      }
}
