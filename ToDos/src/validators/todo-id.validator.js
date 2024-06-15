import { InvalidInputException } from '../exceptions/invalid-input.exception';
import { BaseValidator } from './base.validator';

export class TodoIdValidator extends BaseValidator {
      #id;

      constructor(id) {
            this.#id = id;
      }

      validate() {
            if (Number.parseInt(this.#id) == NaN) {
                  throw new InvalidInputException('Not a valid number as id!');
            }
      }
}
