import { Todo } from '../../models/todo.model';

export class TodoListComponent {
      constructor(todos) {
            this._todos = todos;
      }

      render() {
            const ul = document.createElement('ul');
            ul.classList.add('list-group');
            for (const todo of this._todos) {
                  const todoComponent = new TodoListComponent(new Todo(todo));
                  ul.appendChild(todoComponent);
            }
            return ul;
      }
}
