import { DeleteModalComponent } from '../modals/delete-modal.component';

export class DeleteAction {
      constructor(htmlActioButton) {
            this.htmlActioButton = htmlActioButton;
            this.#setClickListener();
      }

      #setClickListener() {
            this.htmlActioButton.addEventListener('click', this.#onDeleteTodo);
      }

      #onDeleteTodo() {
            const updateModal = new DeleteModalComponent('Delete a ToDo');
            updateModal.render();
      }
}
