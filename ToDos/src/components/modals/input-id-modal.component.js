import { TodoService } from '../../services/todo.service';
import { Alert } from '../alerts/alert.component';
import { Spinner } from '../spinner/spinner.component';

export class InputIdModalComponent {
      #body = document.querySelector('body');

      constructor(title) {
            this._title = title;
      }

      get title() {
            return this._title;
      }

      set title(title) {
            this._title = title;
      }

      render() {
            this.modalDiv = document.createElement('div');
            const modalDialogDiv = document.createElement('div');
            const modalContentDiv = document.createElement('div');
            const modalHeaderDiv = document.createElement('div');
            const modalBodyDiv = document.createElement('div');
            const modalInputDiv = document.createElement('div');
            const modalInput = document.createElement('input');
            const modalFooterDiv = document.createElement('div');
            const modalTitleH5 = document.createElement('h5');
            const modalCloseButton = document.createElement('button');
            const modalAddButton = document.createElement('button');

            modalCloseButton.type = 'button';
            modalCloseButton.classList.add('btn', 'btn-secondary');
            modalCloseButton.dataset.dataBsDismiss = 'modal';
            modalCloseButton.innerHTML = 'Close';
            modalCloseButton.addEventListener('click', this.remove.bind(this));

            modalAddButton.type = 'button';
            modalAddButton.classList.add('btn', 'btn-primary');
            modalAddButton.dataset.dataBsDismiss = 'modal';
            modalAddButton.innerHTML = 'Get';
            modalAddButton.addEventListener('click', () => {
                  this.remove();
                  Spinner.render('normal');
                  const id = modalInput.value;
                  if (id) {
                        TodoService.getById(id)
                              .then((response) => {
                                    Spinner.remove();
                                    const { statusCode, data, message, success } = response;
                                    if (success && statusCode === 200) {
                                          if (data) {
                                                console.log(data);
                                          }
                                    } else {
                                          Alert.render(`There is a network problem, please try later`, `error`);
                                    }
                              })
                              .catch((error) => {
                                    Spinner.remove();
                                    console.error(error);
                                    Alert.render(`There is a network problem, please try later`, `error`);
                              });
                  }
            });

            modalFooterDiv.classList.add(
                  'modal-footer',
                  'flex-column',
                  'align-items-stretch',
                  'w-100',
                  'gap-2',
                  'pb-3',
                  'border-top-3',
            );
            modalFooterDiv.appendChild(modalAddButton);
            modalFooterDiv.appendChild(modalCloseButton);

            modalInput.type = 'text';
            modalInput.placeholder = 'Id of the modal';
            modalInput.ariaLabel = 'Id of the modal';
            modalInput.classList.add('form-control');

            modalInputDiv.classList.add('input-group', 'mb-3');
            modalInputDiv.appendChild(modalInput);

            modalBodyDiv.classList.add('modal-body', 'py-0');
            modalBodyDiv.appendChild(modalInputDiv);

            modalTitleH5.classList.add('modal-title', 'fs-5');
            modalTitleH5.innerHTML = this.title;

            modalHeaderDiv.classList.add('modal-header', 'border-bottom-0');
            modalHeaderDiv.appendChild(modalTitleH5);

            modalContentDiv.classList.add('modal-content', 'rounded-4', 'shadow');
            modalContentDiv.appendChild(modalHeaderDiv);
            modalContentDiv.appendChild(modalBodyDiv);
            modalContentDiv.appendChild(modalFooterDiv);

            modalDialogDiv.classList.add('modal-dialog');
            modalDialogDiv.role = 'document';
            modalDialogDiv.appendChild(modalContentDiv);

            this.modalDiv.classList.add('modal', 'modal-sheet', 'position-absolute', 'd-block', 'p-4', 'py-md-5');
            this.modalDiv.role = 'dialog';
            this.modalDiv.tabIndex = -1;
            this.modalDiv.appendChild(modalDialogDiv);

            this.#body.appendChild(this.modalDiv);
            this.#body.classList.add('hide');
      }

      remove() {
            this.#body.classList.remove('hide');
            this.modalDiv.remove();
      }
}
