import { TodoService } from '../../services/todo.service';
import { AlertFactory } from '../alerts/alert.factory';
import { Spinner } from '../spinner/spinner.component';
import { TodoListModalComponent } from '../modals/todo-list.modal.component';

export class GetAllAction {
      #spinnerComponent;
      #todoListModalComponent;

      constructor(htmlActionButton, body) {
            this.body = body;
            this.htmlActionButton = htmlActionButton;
            this.#spinnerComponent = new Spinner('info', 'Loading');
            this.#todoListModalComponent = new TodoListModalComponent();
            this.#initListener();
      }

      #initListener() {
            this.htmlActionButton.addEventListener('click', this.#onGetAllTodos.bind(this));
      }

      #onGetAllTodos() {
            this.#spinnerComponent.render();
            TodoService.getAll()
                  .then((response) => {
                        this.#spinnerComponent.remove();
                        const { data } = response;
                        if (data.length === 0) {
                              AlertFactory.noDataAlert().render();
                        } else {
                              this.#todoListModalComponent.todoList = data;
                              this.#todoListModalComponent.render();
                        }
                  })
                  .catch((error) => {
                        this.#spinnerComponent.remove();
                        console.error(error);
                        AlertFactory.networkErrorAlert().render();
                  });
      }
}
