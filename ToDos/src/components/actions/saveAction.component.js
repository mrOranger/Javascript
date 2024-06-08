import { TodoService } from '../../services/todo.service';
import { Alert } from '../alerts/alert.component';
import { SaveModalComponent } from '../modals/save-modal.component';
import { Spinner } from '../spinner/spinner.component';

export class SaveAction {
      constructor(htmlActioButton) {
            this.htmlActioButton = htmlActioButton;
            this.#setClickListener();
      }

      #setClickListener() {
            this.htmlActioButton.addEventListener('click', this.#onSaveTodo);
      }

      #onSaveTodo() {
            const saveModal = new SaveModalComponent('Create a new ToDo', () => {
                  Spinner.render('Loading');
                  saveModal.remove();
                  const title = saveModal.title;
                  const description = saveModal.description;
                  TodoService.save(JSON.stringify({ title, description }))
                        .then((response) => {
                              const { message, statusCode, success } = response;
                              Spinner.remove('Loading');
                              if (success && statusCode === 201) {
                                    Alert.render(`Todo added successfully`, `success`);
                              } else {
                                    Alert.render(`There is a network problem, please try later`, `error`);
                              }
                        })
                        .catch((error) => {
                              console.log(error);
                              Alert.render(`There is a network problem, please try later`, `error`);
                              Spinner.remove('Loading');
                        });
            });
            saveModal.render();
      }

      saveModalCallback() {}
}
