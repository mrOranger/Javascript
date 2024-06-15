import { BaseValidator } from './base.validator';

export class TodoTitleValidator extends BaseValidator {
      #title;

      constructor(title) {
            super();
            this.#title = title;
      }

      validate() {
            if (this.#title.length == 0) {
                  throw new InvalidInputException('Not a valid title!');
            }
      }
}
