import { TodoService } from '../../services/todo.service';
import { InputIdModalComponent } from '../modals/input-id-modal.component';

export class GetByIdAction {
      constructor(htmlActioButton) {
            this.htmlActioButton = htmlActioButton;
            this.#setClickListener();
      }

      #setClickListener() {
            this.htmlActioButton.addEventListener('click', this.#onGetTodoById.bind(this));
      }

      #onGetTodoById() {
            const inputIdModal = new InputIdModalComponent('Get the ToDo by the id');
            inputIdModal.render();
      }
}
