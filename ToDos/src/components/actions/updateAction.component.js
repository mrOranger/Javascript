import { UpdateModalCmomponent } from '../modals/update-modal.component';
import { TodoService } from '../../services/todo.service';
import { Spinner } from '../spinner/spinner.component';
import { Alert } from '../alerts/alert.component';

export class UpdateAction {
      constructor(htmlActioButton) {
            this.htmlActioButton = htmlActioButton;
            this.#setClickListener();
      }

      #setClickListener() {
            this.htmlActioButton.addEventListener('click', this.#onUpdateTodo);
      }

      #onUpdateTodo() {
            const updateModal = new UpdateModalCmomponent('Update a ToDo', () => {
                  Spinner.render('Loading');
                  updateModal.remove();
                  const { id, title, description } = updateModal.userInfo;
                  TodoService.update(id, JSON.stringify({ title, description }))
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
