export class Spinner {
      static render(type) {
            const div = document.createElement('div');
            const span = document.createElement('span');

            div.classList.add(...Spinner.#getSpinnerType(type));
            div.role = 'status';

            span.classList.add('sr-only');
            span.innerHTML = 'Loading ...';

            div.appendChild(span);

            return div;
      }

      static #getSpinnerType(type) {
            if (type === 'error') {
                  return ['spinner-border', 'text-danger'];
            }
            return ['spinner-border', 'text-primary'];
      }
}
