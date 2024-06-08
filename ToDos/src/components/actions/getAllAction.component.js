import { TodoService } from '../../services/todo.service';
import { Alert } from '../alerts/alert.component';
import { Spinner } from '../spinner/spinner.component';
import { StandardModal } from '../modals/standard-modal.component';
import { TodoComponent } from '../todo/todo.component';

export class GetAllAction {
      constructor(htmlActionButton, body) {
            this.body = body;
            this.htmlActionButton = htmlActionButton;
            this.#initListener();
      }

      #initListener() {
            this.htmlActionButton.addEventListener('click', this.#onGetAllTodos.bind(this));
      }

      #onGetAllTodos() {
            Spinner.render('normal');
            TodoService.getAll()
                  .then((response) => {
                        Spinner.remove();
                        const { statusCode, data, message, success } = response;
                        if (success && statusCode === 200) {
                              if (data.length === 0) {
                                    Alert.render(`There are no ToDos, please add a new one.`, `info`);
                              } else {
                                    const todoList = new TodoComponent(data);
                                    const standardModal = new StandardModal('Result', todoList);
                                    standardModal.render();
                              }
                        } else {
                              console.info(message);
                              Alert.render(
                                    `Opss ... I'm so sorry but there is a problem with the network. Please, try later.`,
                                    `error`,
                              );
                        }
                  })
                  .catch((error) => {
                        console.error(error);
                        alert(`Opss ... I'm so sorry but there is a problem with the network. Please, try later.`);
                  });
      }
}
