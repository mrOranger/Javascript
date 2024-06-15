import { AlertComponent } from './alert.component';

export class AlertFactory {
      static noDataAlert() {
            return new AlertComponent('There are no todo in your diary, please add a new one', 'info');
      }

      static noTodoAlert() {
            return new AlertComponent('There is not a todo with that id in your diary, please add a new one', 'info');
      }

      static networkErrorAlert() {
            return new AlertComponent('There should be an error network, please try later.', 'error');
      }
}
