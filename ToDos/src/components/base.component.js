import { NotImplementedException } from '../exceptions/not-implemented.exception';

export class BaseComponent {
      render() {
            throw new NotImplementedException('Not implemented render() method in BaseComponent');
      }

      delete() {
            throw new NotImplementedException('Not implemented delete() method in BaseComponent');
      }
}
