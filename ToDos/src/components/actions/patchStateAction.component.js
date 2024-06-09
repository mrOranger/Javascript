import { PatchModalComponent } from '../modals/patch-modal.component';
import { TodoService } from '../../services/todo.service';
import { Spinner } from '../spinner/spinner.component';
import { Alert } from '../alerts/alert.component';

export class PatchStateAction {
      constructor(htmlActioButton) {
            this.htmlActioButton = htmlActioButton;
            this.#setClickListener();
      }

      #setClickListener() {
            this.htmlActioButton.addEventListener('click', this.#onPatchTodo);
      }

      #onPatchTodo() {
            const updateModal = new PatchModalComponent('Update a ToDo status', () => {
                  Spinner.render('Loading');
                  updateModal.remove();
                  TodoService.updateStatus(updateModal.id)
                        .then((response) => {
                              Spinner.remove();
                              const { statusCode, success } = response;
                              if (success && statusCode === 200) {
                                    Alert.render('ToDo updated successfully!', 'success');
                              } else {
                                    Alert.render(
                                          'There is an error in unpdating process, check if the data are correct!',
                                          'error',
                                    );
                              }
                        })
                        .catch((error) => {
                              Alert.render('There is a network problem, please try later', 'error');
                              Spinner.remove();
                              console.error(error);
                        });
            });
            updateModal.render();
      }
}
