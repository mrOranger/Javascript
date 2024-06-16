import { TodoService } from '../../services/todo.service';
import { TodoTitleValidator } from '../../validators/todo-title.validator';
import { TodoDescriptionValidator } from '../../validators/todo-description.validator';
import { AlertFactory } from '../alerts/alert.factory';
import { BaseComponent } from '../base.component';
import { SpinnerComponent } from '../spinner/spinner.component';

export class SaveModalComponent extends BaseComponent {
      #title;
      #validInput;
      #loadingSpinner;
      #body = document.querySelector('body');
      #modalDiv = document.createElement('div');
      #modalDialogDiv = document.createElement('div');
      #modalContentDiv = document.createElement('div');
      #modalHeaderDiv = document.createElement('div');
      #modalBodyDiv = document.createElement('div');
      #modalInputDiv = document.createElement('div');
      #modalTitleInput = document.createElement('input');
      #modalDescriptionInput = document.createElement('input');
      #modalFooterDiv = document.createElement('div');
      #modalTitleH5 = document.createElement('h5');
      #modalCloseButton = document.createElement('button');
      #modalAddButton = document.createElement('button');

      constructor(title) {
            super();
            this.#title = title;
            this.#validInput = {
                  title: false,
                  description: false,
            };
            this.#loadingSpinner = new SpinnerComponent('info', 'Saving the new todo ...');
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
                  this.#initModal();

                  this.#modalContentDiv.classList.add('modal-content', 'rounded-4', 'shadow');
                  this.#modalContentDiv.appendChild(this.#modalHeaderDiv);
                  this.#modalContentDiv.appendChild(this.#modalBodyDiv);
                  this.#modalContentDiv.appendChild(this.#modalFooterDiv);

                  this.#modalDialogDiv.classList.add('modal-dialog');
                  this.#modalDialogDiv.role = 'document';
                  this.#modalDialogDiv.appendChild(this.#modalContentDiv);

                  this.#modalDiv.classList.add(
                        'modal',
                        'modal-sheet',
                        'position-absolute',
                        'd-block',
                        'p-4',
                        'py-md-5',
                  );
                  this.#modalDiv.role = 'dialog';
                  this.#modalDiv.tabIndex = -1;
                  this.#modalDiv.appendChild(this.#modalDialogDiv);

                  this.#body.appendChild(this.#modalDiv);
                  this.#body.classList.add('hide');
            }
      }

      #initModal() {
            this.#initModalFooter();
            this.#initModalBody();
            this.#initModalHeader();
      }

      #initModalFooterButtons() {
            this.#modalCloseButton.type = 'button';
            this.#modalCloseButton.classList.add('btn', 'btn-secondary');
            this.#modalCloseButton.dataset.dataBsDismiss = 'modal';
            this.#modalCloseButton.innerHTML = 'Close';
            this.#modalCloseButton.addEventListener('click', this.#onCancelCallback.bind(this));

            this.#modalAddButton.type = 'button';
            this.#modalAddButton.classList.add('btn', 'btn-primary');
            this.#modalAddButton.dataset.dataBsDismiss = 'modal';
            this.#modalAddButton.innerHTML = 'Save';
            this.#modalAddButton.addEventListener('click', this.#onConfirmCallback.bind(this));
            this.#modalAddButton.disabled = true;
      }

      #onCancelCallback() {
            this.remove();
      }

      #onConfirmCallback() {
            const title = this.#modalTitleInput.value;
            const description = this.#modalDescriptionInput.value;
            this.#loadingSpinner.render();

            TodoService.save(JSON.stringify({ title, description }))
                  .then((response) => {
                        this.#loadingSpinner.remove();
                        this.remove();
                        const { statusCode, success } = response;
                        if (success && statusCode === 201) {
                              AlertFactory.createdAlert().render();
                        } else {
                              AlertFactory.cannotCreateResourceAlert().render();
                        }
                  })
                  .catch((error) => {
                        this.#loadingSpinner.remove();
                        this.remove();
                        console.log(error);
                  });
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

      #initModalBodyInput() {
            this.#modalTitleInput.type = 'text';
            this.#modalTitleInput.placeholder = 'ToDo title';
            this.#modalTitleInput.ariaLabel = 'Title of the todo';
            this.#modalTitleInput.oninput = this.#onTitleChange.bind(this);
            this.#modalTitleInput.classList.add('form-control');

            this.#modalDescriptionInput.type = 'text';
            this.#modalDescriptionInput.placeholder = 'ToDo description';
            this.#modalDescriptionInput.ariaLabel = 'Description of the todo';
            this.#modalDescriptionInput.oninput = this.#onDescriptionChange.bind(this);
            this.#modalDescriptionInput.classList.add('form-control');
      }

      #onTitleChange() {
            try {
                  const validator = new TodoTitleValidator(this.#modalTitleInput.value);
                  validator.validate();
                  this.#validInput.title = true;
            } catch (exception) {
                  this.#validInput.title = false;
            } finally {
                  this.#modalAddButton.disabled = !(this.#validInput.description && this.#validInput.title);
            }
      }

      #onDescriptionChange() {
            try {
                  const validator = new TodoDescriptionValidator(this.#modalDescriptionInput.value);
                  validator.validate();
                  this.#validInput.description = true;
            } catch (exception) {
                  this.#validInput.description = false;
            } finally {
                  this.#modalAddButton.disabled = !(this.#validInput.description && this.#validInput.title);
            }
      }

      #initModalBody() {
            this.#initModalBodyInput();

            this.#modalInputDiv.classList.add('input-group', 'mb-3');
            this.#modalInputDiv.appendChild(this.#modalTitleInput);
            this.#modalInputDiv.appendChild(this.#modalDescriptionInput);

            this.#modalBodyDiv.classList.add('modal-body', 'py-0');
            this.#modalBodyDiv.appendChild(this.#modalInputDiv);
      }

      #initModalHeader() {
            this.#modalTitleH5.classList.add('modal-title', 'fs-5');
            this.#modalTitleH5.innerHTML = this.title;

            this.#modalHeaderDiv.classList.add('modal-header', 'border-bottom-0');
            this.#modalHeaderDiv.appendChild(this.#modalTitleH5);
      }

      remove() {
            sessionStorage.setItem('semaphore', true);
            this.#body.classList.remove('hide');
            this.#modalDiv.remove();
      }
}
