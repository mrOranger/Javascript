export class ModalComponent {
      constructor(title, description) {
            this._title = title;
            this._description = description;
      }

      get title() {
            return this._title;
      }

      get description() {
            return this._description;
      }

      render() {
            const body = document.querySelector('body');
            const main = document.querySelector('main');
            const modal = `                  
                  <div class="custom-modal modal modal-dialog modal-dialog-centered">
                        <div class="modal-dialog">
                              <div class="modal-content">
                                    <div class="modal-header">
                                          <h1 class="modal-title fs-5">${this.title}</h1>
                                          <button id="modal-cross" type="button" class="btn-close" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">${this.description}</div>
                                    <div class="modal-footer">
                                          <button id="modal-close" type="button" class="btn btn-secondary">Close</button>
                                    </div>
                              </div>
                        </div>
                  </div>`;
            main.innerHTML += modal;
            this.#onCloseModal('#modal-cross', body);
            this.#onCloseModal('#modal-close', body);
      }

      #onCloseModal(elementId, htmlMain) {
            document.querySelector(elementId).addEventListener('click', () => {
                  htmlMain.classList.remove('background-shadow');
                  document.querySelector('.custom-modal').remove();
            });
      }
}
