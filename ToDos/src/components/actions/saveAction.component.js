import { SaveModalComponent } from '../modals/save-modal.component';

export class SaveAction {
      constructor(htmlActioButton) {
            this.htmlActioButton = htmlActioButton;
            this.#setClickListener();
      }

      #setClickListener() {
            this.htmlActioButton.addEventListener('click', this.#onSaveTodo);
      }

      #onSaveTodo() {
            const saveModal = new SaveModalComponent('Create a new ToDo');
            saveModal.render();
      }
}
