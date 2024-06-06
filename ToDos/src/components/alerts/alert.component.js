export class Alert {
      static render(message, type) {
            const header = document.querySelector('#header');

            const div = document.createElement('div');
            div.classList.add(...Alert.#getAlertClasses(type));
            div.role = 'alert';
            div.innerHTML = message;

            header.appendChild(div);
      }

      static #getAlertClasses(type) {
            if (type === 'error') {
                  return ['alert', 'alert-danger'];
            }
            return ['alert', 'alert-primary'];
      }
}
