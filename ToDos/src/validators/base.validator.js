import { NotImplementedException } from '../exceptions/not-implemented.exception';

export class BaseValidator {
      validate() {
            throw new NotImplementedException();
      }
}
