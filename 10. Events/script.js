class Task {
      constructor(id, name, description, image) {
            this.id = id;
            this.name = name;
            this.image = image;
            this.description = description;
      }

      get #titleComponent() {
            const h5 = document.createElement('h5');
            h5.classList.add('card-title', 'mt-1');
            h5.textContent = this.name;
            return h5;
      }

      get #imageComponent() {
            const img = document.createElement('img');
            img.classList.add('card-img-top', 'mt-1', 'mb-1');
            img.src = this.image;
            img.droppable = false;
            return img;
      }

      get #descriptionComponent() {
            const p = document.createElement('p');
            p.classList.add('card-text', 'mt-1');
            p.textContent = this.description;
            return p;
      }

      get #body() {
            const div = document.createElement('div');
            div.classList.add('card-body');
            div.appendChild(this.#titleComponent);
            div.appendChild(this.#imageComponent);
            div.appendChild(this.#descriptionComponent);
            return div;
      }

      #onDragEventListener(dragEvent) {
            dragEvent.dataTransfer.setData('text/plain', this.id);
            dragEvent.dataTransfer.effectAllowed = 'move';
      }

      render() {
            const div = document.createElement('div');
            div.classList.add('card', 'g-0', 'mb-2');
            div.setAttribute('draggable', true);
            div.id = `task-${this.id}`;
            div.appendChild(this.#body);
            div.addEventListener('dragstart', this.#onDragEventListener.bind(this));
            return div;
      }
}

class TaskList {
      #listComponent;

      constructor(listName, tasks) {
            this.tasks = tasks;
            this.listName = listName;
            this.#listComponent = document.getElementById(this.listName);
      }

      #onDragEnterEventListener(dragEvent) {
            if (dragEvent.dataTransfer.types[0] === 'text/plain') {
                  dragEvent.preventDefault();
            }
            this.#listComponent.parentElement.classList.add('droppable');
      }

      #onDragOverEventListener(dragEvent) {
            if (dragEvent.dataTransfer.types[0] === 'text/plain') {
                  dragEvent.preventDefault();
            }
            this.#listComponent.parentElement.classList.add('droppable');
      }

      #onDragLeaveEventListener(dragEvent) {
            if (dragEvent.relatedTarget.closest(this.listName) !== this.#listComponent) {
                  this.#listComponent.parentElement.classList.remove('droppable');
            }
      }

      #onDropEventListener(dropEvent) {
            const data = dropEvent.dataTransfer.getData('text/plain');
            this.#listComponent.parentElement.classList.remove('droppable');
            const task = document.getElementById(`task-${data}`);
            if (dropEvent.target.tagName.toLowerCase() === 'div') {
                  this.#listComponent.appendChild(task);
            }
      }

      render() {
            this.#listComponent.addEventListener('dragenter', this.#onDragEnterEventListener.bind(this));
            this.#listComponent.addEventListener('dragover', this.#onDragOverEventListener.bind(this));
            this.#listComponent.addEventListener('dragleave', this.#onDragLeaveEventListener.bind(this));
            this.#listComponent.addEventListener('drop', this.#onDropEventListener.bind(this));
            for (const task of this.tasks) {
                  this.#listComponent.appendChild(task.render());
            }
      }
}

class Application {
      static initialize() {
            const todoList = new TaskList('todo-list', [
                  new Task(
                        0,
                        'Create Swagger',
                        `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis
                              optio iste aperiam repellendus quam quod doloribus facilis temporibus
                              repellat odit dolor voluptatem quidem, dolore culpa dolorem animi neque
                              eligendi delectus?`,
                        'https://picsum.photos/200',
                  ),
            ]);
            const inProgressList = new TaskList('in-progress-list', [
                  new Task(
                        1,
                        'Testing API',
                        `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis
                        optio iste aperiam repellendus quam quod doloribus facilis temporibus
                        repellat odit dolor voluptatem quidem, dolore culpa dolorem animi neque
                        eligendi delectus?`,
                        'https://picsum.photos/200',
                  ),
            ]);
            const completedList = new TaskList('completed-list', [
                  new Task(
                        2,
                        'Bugfix',
                        `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis
                              optio iste aperiam repellendus quam quod doloribus facilis temporibus
                              repellat odit dolor voluptatem quidem, dolore culpa dolorem animi neque
                              eligendi delectus?`,
                        'https://picsum.photos/200',
                  ),
            ]);

            todoList.render();
            inProgressList.render();
            completedList.render();
      }
}

Application.initialize();
