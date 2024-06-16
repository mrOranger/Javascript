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

      static cannotCreateResourceAlert() {
            return new AlertComponent('We canot create the alert, you have exceeded you maximum size.', 'error');
      }

      static resourceConflictAlert() {
            return new AlertComponent('You cannot mark as completed an already completed todo!', 'error');
      }

      static createdAlert() {
            return new AlertComponent('Todo created successfully!', 'success');
      }

      static updatedAlert() {
            return new AlertComponent('Todo updated successfully!', 'success');
      }

      static deletedAlert() {
            return new AlertComponent('Todo deleted successfully!', 'success');
      }
}
