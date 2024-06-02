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
            const main = document.querySelector('main');
            const modal = `                  
            <div class="custom-modal modal modal-dialog modal-dialog-centered">
                  <div class="modal-dialog">
                        <div class="modal-content">
                              <div class="modal-header">
                                    <h1 class="modal-title fs-5">${this.title}</h1>
                                    <button type="button" class="btn-close" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">${this.description}</div>
                              <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary">Close</button>
                              </div>
                        </div>
                  </div>
            </div>`;
            main.innerHTML += modal;
      }
}
