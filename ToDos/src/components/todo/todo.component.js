import { BaseComponent } from '../base.component';

export class TodoComponent extends BaseComponent {
      #listItem;
      #span;

      constructor(todo) {
            super();
            this._todo = todo;
            this.#listItem = document.createElement('li');
            this.#span = document.createElement('span');
      }

      render() {
            this.#listItem.classList.add('list-group-item');
            this.#listItem.innerHTML = `<b>${this._todo.title}</b> (<i>${this._todo.id}</i>)-  ${this._todo.description}`;

            const badgeClass = this._todo.isDone ? 'text-bg-primary' : 'text-bg-danger';
            this.#span.classList.add('badge', badgeClass, 'p-2', 'm-2');
            this.#span.innerHTML = this._todo.isDone ? 'Completed' : 'To complete';

            this.#listItem.appendChild(this.#span);

            return this.#listItem;
      }

      remove() {
            this.#listItem.remove();
      }
}
