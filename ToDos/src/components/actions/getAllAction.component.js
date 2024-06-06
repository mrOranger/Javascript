import { TodoService } from '../../services/todo.service';
import { Alert } from '../alerts/alert.component';

export class GetAllAction {
      constructor(htmlActioButton) {
            this.htmlActioButton = htmlActioButton;
            this.#initListener();
      }

      #initListener() {
            this.htmlActioButton.addEventListener('click', this.#onGetAllTodos.bind(this));
      }

      #onGetAllTodos() {
            TodoService.getAll()
                  .then((response) => {
                        const { statusCode, data, message, success } = response;
                        if (success && statusCode === 200) {
                              console.log(data);
                        } else {
                              console.info(message);
                              this.alert.message = `Opss ... I'm so sorry but there is a problem with the network. Please, try later.`;
                              this.alert.type = 'error';
                              this.alert.render();
                        }
                        Alert.render(
                              `Opss ... I'm so sorry but there is a problem with the network. Please, try later.`,
                              `error`,
                        );
                  })
                  .catch((error) => {
                        console.error(error);
                        alert(`Opss ... I'm so sorry but there is a problem with the network. Please, try later.`);
                  });
      }
}
