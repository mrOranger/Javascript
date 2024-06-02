import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { ModalComponent } from '../../components/modal.component';

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
                                          const modal = new ModalComponent(
                                                'ToDos',
                                                todos.reduce((prev, curr) => curr.toString(), ''),
                                          );
                                          modal.render();
                                    } else {
                                          const modal = new ModalComponent(
                                                'No Data',
                                                'There are no ToDo in the current session, please create a new one.',
                                          );
                                          modal.render();
                                    }
                              } else {
                                    const modal = new ModalComponent(
                                          'No Data',
                                          'There are no ToDo in the current session, please create a new one.',
                                    );
                                    modal.render();
                              }
                        })
                        .catch((error) => {
                              console.log(error);
                              const modal = new ModalComponent(
                                    'No Data',
                                    'There are no ToDo in the current session, please create a new one.',
                              );
                              modal.render();
                        });
            });
      }
}
