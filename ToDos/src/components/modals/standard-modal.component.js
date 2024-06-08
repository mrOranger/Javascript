export class StandardModal {
      #body = document.querySelector('body');
      #header = document.querySelector('header');

      constructor(title, content) {
            this._title = title;
            this._content = content;
      }

      get title() {
            return this._title;
      }

      get content() {
            return this._content;
      }

      set title(title) {
            this._title = title;
      }

      set content(content) {
            this._content = content;
      }

      render() {
            const modalDiv = document.createElement('div');
            const modalDialogDiv = document.createElement('div');
            const modalContentDiv = document.createElement('div');
            const modalHeaderDiv = document.createElement('div');
            const modalBodyDiv = document.createElement('div');
            const modalFooterDiv = document.createElement('div');
            const modalTitleH5 = document.createElement('h5');
            const modalBodyP = document.createElement('p');
            const modalCloseButton = document.createElement('button');

            modalCloseButton.type = 'button';
            modalCloseButton.classList.add('btn', 'btn-secondary');
            modalCloseButton.dataset.dataBsDismiss = 'modal';
            modalCloseButton.innerHTML = 'Close';
            modalCloseButton.addEventListener('click', this.remove.bind(this));

            modalFooterDiv.classList.add(
                  'modal-footer',
                  'flex-column',
                  'align-items-stretch',
                  'w-100',
                  'gap-2',
                  'pb-3',
                  'border-top-3',
            );
            modalFooterDiv.appendChild(modalCloseButton);

            modalBodyP.innerHTML = this.content;

            modalBodyDiv.classList.add('modal-body', 'py-0');
            modalBodyDiv.appendChild(modalBodyP);

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

            modalDiv.classList.add('modal', 'modal-sheet', 'position-absolute', 'd-block', 'p-4', 'py-md-5');
            modalDiv.role = 'dialog';
            modalDiv.tabIndex = -1;
            modalDiv.appendChild(modalDialogDiv);

            this.#body.appendChild(modalDiv);
            this.#body.classList.add('hide');
      }

      remove() {
            this.#body.classList.remove('hide');
            this.#body.children[2].remove();
      }
}
