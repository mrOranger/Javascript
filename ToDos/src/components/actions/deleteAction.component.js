import { DeleteModalComponent } from '../modals/delete-modal.component';
import { TodoService } from '../../services/todo.service';
import { Spinner } from '../spinner/spinner.component';

export class DeleteAction {
      constructor(htmlActioButton) {
            this.htmlActioButton = htmlActioButton;
            this.#setClickListener();
      }

      #setClickListener() {
            this.htmlActioButton.addEventListener('click', this.#onDeleteTodo);
      }

      #onDeleteTodo() {
            const updateModal = new DeleteModalComponent('Delete a ToDo', () => {
                  Spinner.render('Loading');
                  updateModal.remove();
                  TodoService.delete(updateModal.id)
                        .then((response) => {
                              Spinner.remove();
                              const { statusCode, success } = response;
                              if (success && statusCode === 200) {
                                    Alert.render('ToDo deleted successfully!', 'success');
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
