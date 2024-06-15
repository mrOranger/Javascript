import { InvalidInputException } from '../exceptions/invalid-input.exception';
import { BaseValidator } from './base.validator';

export class TodoIdValidator extends BaseValidator {
      #id;

      constructor(id) {
            super();
            this.#id = id;
      }

      validate() {
            const parsedId = Number.parseInt(this.#id);
            if (isNaN(parsedId) || parsedId < 0) {
                  throw new InvalidInputException('Not a valid number as id!');
            }
      }
}
