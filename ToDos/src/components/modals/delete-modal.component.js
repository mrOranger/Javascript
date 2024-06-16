import { TodoService } from '../../services/todo.service';
import { TodoIdValidator } from '../../validators/todo-id.validator';
import { AlertFactory } from '../alerts/alert.factory';
import { BaseComponent } from '../base.component';
import { SpinnerComponent } from '../spinner/spinner.component';

export class DeleteModalComponent extends BaseComponent {
      #title;
      #loadingSpinner;
      #body = document.querySelector('body');
      #modalDiv = document.createElement('div');
      #modalDialogDiv = document.createElement('div');
      #modalContentDiv = document.createElement('div');
      #modalHeaderDiv = document.createElement('div');
      #modalBodyDiv = document.createElement('div');
      #modalInputDiv = document.createElement('div');
      #modalInput = document.createElement('input');
      #modalFooterDiv = document.createElement('div');
      #modalTitleH5 = document.createElement('h5');
      #modalAddButton = document.createElement('button');
      #modalCloseButton = document.createElement('button');

      constructor(title) {
            super();
            this.#title = title;
            this.#loadingSpinner = new SpinnerComponent('info', 'Deleting the todo ...');
      }

      get title() {
            return this.#title;
      }

      set title(title) {
            this.#title = title;
      }

      render() {
            const semaphore = sessionStorage.getItem('semaphore');
            if (semaphore === 'true') {
                  sessionStorage.setItem('semaphore', false);
                  this.#initModalDialog();
            }
      }

      #initModalDialog() {
            this.#initModalFooter();
            this.#initModalBody();
            this.#initModalHeader();

            this.#modalContentDiv.classList.add('modal-content', 'rounded-4', 'shadow');
            this.#modalContentDiv.appendChild(this.#modalHeaderDiv);
            this.#modalContentDiv.appendChild(this.#modalBodyDiv);
            this.#modalContentDiv.appendChild(this.#modalFooterDiv);

            this.#modalDialogDiv.classList.add('modal-dialog');
            this.#modalDialogDiv.role = 'document';
            this.#modalDialogDiv.appendChild(this.#modalContentDiv);

            this.#modalDiv.classList.add('modal', 'modal-sheet', 'position-absolute', 'd-block', 'p-4', 'py-md-5');
            this.#modalDiv.role = 'dialog';
            this.#modalDiv.tabIndex = -1;
            this.#modalDiv.appendChild(this.#modalDialogDiv);

            this.#body.appendChild(this.#modalDiv);
            this.#body.classList.add('hide');
      }

      #initModalHeader() {
            this.#modalTitleH5.classList.add('modal-title', 'fs-5');
            this.#modalTitleH5.innerHTML = this.title;

            this.#modalHeaderDiv.classList.add('modal-header', 'border-bottom-0');
            this.#modalHeaderDiv.appendChild(this.#modalTitleH5);
      }

      #initModalBodyInput() {
            this.#modalInput.type = 'text';
            this.#modalInput.placeholder = 'Id of the modal';
            this.#modalInput.ariaLabel = 'Id of the modal';
            this.#modalInput.min = 0;
            this.#modalInput.step = 1;
            this.#modalInput.oninput = this.#onInputChangeEvent.bind(this);
            this.#modalInput.classList.add('form-control');

            this.#modalInputDiv.classList.add('input-group', 'mb-3');
            this.#modalInputDiv.appendChild(this.#modalInput);
      }

      #onInputChangeEvent() {
            try {
                  const validator = new TodoIdValidator(this.#modalInput.value);
                  validator.validate();
                  this.#modalAddButton.disabled = false;
            } catch (exception) {
                  this.#modalAddButton.disabled = true;
            }
      }
      #initModalBody() {
            this.#initModalBodyInput();
            this.#modalBodyDiv.classList.add('modal-body', 'py-0');
            this.#modalBodyDiv.appendChild(this.#modalInputDiv);
      }

      #initModalFooter() {
            this.#initModalFooterButtons();
            this.#modalFooterDiv.classList.add(
                  'modal-footer',
                  'flex-column',
                  'align-items-stretch',
                  'w-100',
                  'gap-2',
                  'pb-3',
                  'border-top-3',
            );
            this.#modalFooterDiv.appendChild(this.#modalAddButton);
            this.#modalFooterDiv.appendChild(this.#modalCloseButton);
      }

      #initModalFooterButtons() {
            this.#modalCloseButton.type = 'button';
            this.#modalCloseButton.classList.add('btn', 'btn-secondary');
            this.#modalCloseButton.dataset.dataBsDismiss = 'modal';
            this.#modalCloseButton.innerHTML = 'Close';
            this.#modalCloseButton.addEventListener('click', this.#onModalCloseEvent.bind(this));

            this.#modalAddButton.type = 'button';
            this.#modalAddButton.classList.add('btn', 'btn-primary');
            this.#modalAddButton.dataset.dataBsDismiss = 'modal';
            this.#modalAddButton.innerHTML = 'Delete';
            this.#modalAddButton.disabled = true;
            this.#modalAddButton.addEventListener('click', this.#onModalAddEvent.bind(this));
      }

      #onModalCloseEvent() {
            this.remove();
      }

      #onModalAddEvent() {
            this.#loadingSpinner.render();
            TodoService.delete(this.#modalInput.value)
                  .then((response) => {
                        this.#loadingSpinner.remove();
                        this.remove.apply(this);
                        const { statusCode, success } = response;
                        if (success) {
                              if (statusCode == 200) {
                                    AlertFactory.deletedAlert().render();
                              }
                        } else {
                              if (statusCode == 404) {
                                    AlertFactory.noTodoAlert().render();
                              }
                        }
                  })
                  .catch((error) => {
                        console.log(error);
                        this.#loadingSpinner.remove();
                        this.remove.apply(this);
                        AlertFactory.networkErrorAlert().render();
                  });
      }

      remove() {
            sessionStorage.setItem('semaphore', true);
            this.#body.classList.remove('hide');
            this.#modalDiv.remove();
      }
}
