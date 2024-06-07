export class Spinner {
      static render(type) {
            const body = document.querySelector('body');

            const container = document.createElement('div');
            const title = document.createElement('h1');
            const div = document.createElement('div');
            const span = document.createElement('span');

            container.classList.add('spinner-container');

            title.textContent = 'Loading ...';

            div.classList.add(...Spinner.#getSpinnerType(type));
            div.role = 'status';

            span.classList.add('sr-only');
            span.innerHTML = 'Loading ...';

            div.appendChild(span);

            container.appendChild(div);
            container.appendChild(title);

            body.classList.add('hide');
            body.appendChild(container);

            return container;
      }

      static remove() {
            const body = document.querySelector('body');
            const container = document.querySelector('.spinner-container');

            body.classList.remove('hide');

            container.remove();
      }

      static #getSpinnerType(type) {
            if (type === 'error') {
                  return ['spinner-border', 'text-danger', 'spinner'];
            }
            return ['spinner-border', 'text-primary'];
      }
}
