import { BaseComponent } from '../base.component';
import { TodoListComponent } from '../todo/todo-list.component';

export class TodoListModalComponent extends BaseComponent {
      #toDoList;
      #body = document.querySelector('body');

      constructor(toDoList) {
            super();
            this.#toDoList = toDoList;
      }

      get todoList() {
            return this.#toDoList;
      }

      set todoList(toDoList) {
            this.#toDoList = toDoList;
      }

      render() {
            this.modalDiv = document.createElement('div');
            const modalDialogDiv = document.createElement('div');
            const modalContentDiv = document.createElement('div');
            const modalHeaderDiv = document.createElement('div');
            const modalBodyDiv = document.createElement('div');
            const modalFooterDiv = document.createElement('div');
            const modalTitleH5 = document.createElement('h5');
            const modalCloseButton = document.createElement('button');

            modalCloseButton.type = 'button';
            modalCloseButton.classList.add('btn', 'btn-secondary');
            modalCloseButton.dataset.dataBsDismiss = 'modal';
            modalCloseButton.innerHTML = 'Close';
            modalCloseButton.addEventListener('click', this.remove.bind(this));

            modalFooterDiv.classList.add(
                  'modal-footer',
                  'flex-column',
                  'align-items-stretch',
                  'w-100',
                  'gap-2',
                  'pb-3',
                  'border-top-3',
            );
            modalFooterDiv.appendChild(modalCloseButton);

            const todoListComponent = new TodoListComponent(this.todoList);
            modalBodyDiv.classList.add('modal-body', 'py-0');
            modalBodyDiv.appendChild(todoListComponent.render());

            modalTitleH5.classList.add('modal-title', 'fs-5');
            modalTitleH5.innerHTML = 'List of all ToDo';

            modalHeaderDiv.classList.add('modal-header', 'border-bottom-0');
            modalHeaderDiv.appendChild(modalTitleH5);

            modalContentDiv.classList.add('modal-content', 'rounded-4', 'shadow');
            modalContentDiv.appendChild(modalHeaderDiv);
            modalContentDiv.appendChild(modalBodyDiv);
            modalContentDiv.appendChild(modalFooterDiv);

            modalDialogDiv.classList.add('modal-dialog');
            modalDialogDiv.role = 'document';
            modalDialogDiv.appendChild(modalContentDiv);

            this.modalDiv.classList.add('modal', 'modal-sheet', 'position-absolute', 'd-block', 'p-4', 'py-md-5');
            this.modalDiv.role = 'dialog';
            this.modalDiv.tabIndex = -1;
            this.modalDiv.appendChild(modalDialogDiv);

            this.#body.appendChild(this.modalDiv);
            this.#body.classList.add('hide');
      }

      remove() {
            this.#body.classList.remove('hide');
            this.modalDiv.remove();
      }
}
