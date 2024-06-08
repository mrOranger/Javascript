import { Todo } from '../../models/todo.model';
import { TodoComponent } from './todo.component';

export class TodoListComponent {
      constructor(todos) {
            this._todos = todos;
      }

      render() {
            const ul = document.createElement('ul');
            ul.classList.add('list-group', 'mt-2', 'mb-2');
            for (const todo of this._todos) {
                  const todoComponent = new TodoComponent(new Todo(todo));
                  ul.appendChild(todoComponent.render());
            }
            return ul;
      }
}
