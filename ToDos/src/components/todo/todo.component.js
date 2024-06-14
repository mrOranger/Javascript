import { BaseComponent } from '../base.component';

export class TodoComponent extends BaseComponent {
      #listItem;

      constructor(todo) {
            this._todo = todo;
            this.#listItem = document.createElement('li');
      }

      render() {
            const span = document.createElement('span');

            this.#listItem.classList.add('list-group-item');
            this.#listItem.innerHTML = `<b>${this._todo.title}</b> (<i>${this._todo.id}</i>)-  ${this._todo.description}`;

            const badgeClass = this._todo.isDone ? 'text-bg-primary' : 'text-bg-danger';
            span.classList.add('badge', badgeClass, 'p-2', 'm-2');
            span.innerHTML = this._todo.isDone ? 'Completed' : 'To complete';

            this.#listItem.appendChild(span);

            return this.#listItem;
      }

      remove() {
            this.#listItem.remove();
      }
}
