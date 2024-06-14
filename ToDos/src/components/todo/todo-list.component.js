import { Todo } from '../../models/todo.model';
import { BaseComponent } from '../base.component';
import { TodoComponent } from './todo.component';

export class TodoListComponent extends BaseComponent {
      #unorderedList;

      constructor(todos) {
            this._todos = todos;
            this.#unorderedList = document.createElement('ul');
      }

      render() {
            this.#unorderedList.classList.add('list-group', 'mt-2', 'mb-2');
            for (const todo of this._todos) {
                  const todoComponent = new TodoComponent(new Todo(todo));
                  this.#unorderedList.appendChild(todoComponent.render());
            }
            return this.#unorderedList;
      }

      remove() {
            this.#unorderedList.remove();
      }
}
