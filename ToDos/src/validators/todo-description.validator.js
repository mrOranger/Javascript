import { BaseValidator } from './base.validator';

export class TodoDescriptionValidator extends BaseValidator {
      #description;

      constructor(description) {
            super();
            this.#description = description;
      }

      validate() {
            if (this.#description.length == 0) {
                  throw new InvalidInputException('Not a valid description!');
            }
      }
}
