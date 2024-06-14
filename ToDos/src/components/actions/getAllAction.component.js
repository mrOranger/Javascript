import { TodoService } from '../../services/todo.service';
import { Alert } from '../alerts/alert.component';
import { Spinner } from '../spinner/spinner.component';
import { TodoListModalComponent } from '../modals/todo-list.modal.component';
import { TodoListComponent } from '../todo/todo-list.component';

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
                              Alert.render(`There are no ToDos, please add a new one.`, `info`);
                        } else {
                              this.#todoListModalComponent.todoList = data;
                              this.#todoListModalComponent.render();
                        }
                  })
                  .catch((error) => {
                        this.#spinnerComponent.remove();
                        console.error(error);
                        alert(`Opss ... I'm so sorry but there is a problem with the network. Please, try later.`);
                  });
      }
}
