import { UpdateModalComponent } from '../modals/update-modal.component';
import { TodoService } from '../../services/todo.service';
import { Spinner } from '../spinner/spinner.component';

export class UpdateAction {
      constructor(htmlActioButton) {
            this.htmlActioButton = htmlActioButton;
            this.#setClickListener();
      }

      #setClickListener() {
            this.htmlActioButton.addEventListener('click', this.#onUpdateTodo);
      }

      #onUpdateTodo() {
            const updateModal = new UpdateModalComponent('Update an existing ToDo');
            updateModal.render();
      }
}
