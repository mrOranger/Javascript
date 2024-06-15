import { TodoService } from '../../services/todo.service';
import { SaveModalComponent } from '../modals/save-modal.component';
import { Spinner } from '../spinner/spinner.component';

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
