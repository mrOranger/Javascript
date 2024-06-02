import { Todo } from '../../models/todo.model';
import { ToDoService, TodoService } from '../../services/todo.service';

export class GetAllListener {
      constructor(htmlButton) {
            this._htmlButton = htmlButton;
            this.#init();
      }

      #init() {
            this._htmlButton.addEventListener('click', () => {
                  TodoService.getAll()
                        .then((response) => {
                              if (response.success) {
                                    if (response.data.length > 0) {
                                          const todos = response.data.map((todoResponse) => new Todo(todoResponse));
                                    } else {
                                    }
                              }
                        })
                        .catch((error) => {
                              console.log(error);
                        });
            });
      }
}
