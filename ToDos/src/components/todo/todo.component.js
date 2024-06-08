export class TodoComponent {
      constructor(todo) {
            this._todo = todo;
      }

      render() {
            const li = document.createElement('li');
            const span = document.createElement('span');

            li.classList.add('list-group-item');
            li.innerHTML = `<b>${this._todo.title}</b> (<i>${this._todo.id}</i>)-  ${this._todo.description}`;

            const badgeClass = this._todo.isDone ? 'text-bg-primary' : 'text-bg-danger';
            span.classList.add('badge', badgeClass, 'p-2', 'm-2');
            span.innerHTML = this._todo.isDone ? 'Completed' : 'To complete';

            li.appendChild(span);
            return li;
      }
}
