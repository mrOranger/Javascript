import { PatchModalComponent } from '../modals/patch-modal.component';

export class PatchStateAction {
      constructor(htmlActioButton) {
            this.htmlActioButton = htmlActioButton;
            this.#setClickListener();
      }

      #setClickListener() {
            this.htmlActioButton.addEventListener('click', this.#onPatchTodo);
      }

      #onPatchTodo() {
            const updateModal = new PatchModalComponent('Update a ToDo status');
            updateModal.render();
      }
}
