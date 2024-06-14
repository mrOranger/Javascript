import { BaseComponent } from '../base.component';

export class Spinner extends BaseComponent {
      #container;
      #title;
      #div;
      #span;
      #message;
      #type;

      constructor(type, message) {
            super();
            this.#type = type;
            this.#message = message;
            this.bodyReference = document.querySelector('body');
      }

      #createComponentStructure() {
            this.#container = document.createElement('div');
            this.#title = document.createElement('h1');
            this.#div = document.createElement('div');
            this.#span = document.createElement('span');
      }

      render() {
            this.#createComponentStructure();
            this.#container.classList.add('spinner-container');
            this.#title.textContent = 'Loading ...';
            this.#div.classList.add(...this.#getSpinnerClass());
            this.#div.role = 'status';
            this.#span.classList.add('sr-only');
            this.#span.innerHTML = this.#message;
            this.#div.appendChild(this.#span);
            this.#container.appendChild(this.#div);
            this.#container.appendChild(this.#title);
            this.#switchBodyLight();
            this.bodyReference.appendChild(this.#container);
      }

      #switchBodyLight() {
            if (this.bodyReference.classList.contains('hide')) {
                  this.bodyReference.classList.remove('hide');
            } else {
                  this.bodyReference.classList.add('hide');
            }
      }

      remove() {
            this.#switchBodyLight();
            this.#container.remove();
      }

      #getSpinnerClass() {
            if (this.#type === 'error') {
                  return ['spinner-border', 'text-danger', 'spinner'];
            }
            return ['spinner-border', 'text-primary'];
      }
}
