import { BaseComponent } from '../base.component';

export class AlertComponent extends BaseComponent {
      #message;
      #type;
      #header;
      #alertDiv;

      constructor(message, type) {
            super();
            this.#message = message;
            this.#type = type;
            this.#header = document.querySelector('#header');
            this.#alertDiv = document.createElement('div');
      }

      render() {
            this.#alertDiv.classList.add(...this.#getAlertClasses());
            this.#alertDiv.role = 'alert';
            this.#alertDiv.innerHTML = this.#message;

            this.#header.appendChild(this.#alertDiv);

            setTimeout(() => this.remove(), 4000);
      }

      #getAlertClasses() {
            if (this.#type === 'error') {
                  return ['alert', 'alert-danger'];
            }
            if (this.#type === 'info') {
                  return ['alert', 'alert-info'];
            }
            return ['alert', 'alert-primary'];
      }

      remove() {
            this.#alertDiv.remove();
      }
}
