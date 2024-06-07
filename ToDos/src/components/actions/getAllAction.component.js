import { TodoService } from '../../services/todo.service';
import { Alert } from '../alerts/alert.component';
import { Spinner } from '../spinner/spinner.component';

export class GetAllAction {
      constructor(htmlActionButton, body) {
            this.body = body;
            this.htmlActionButton = htmlActionButton;
            this.#initListener();
      }

      #initListener() {
            this.htmlActionButton.addEventListener('click', this.#onGetAllTodos.bind(this));
      }

      #onGetAllTodos() {
            Spinner.render('normal');
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
                  })
                  .finally(() => Spinner.remove());
      }
}
