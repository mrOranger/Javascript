export class TodoService {
      static #TODO_RESOURCE_PATH = 'todo';
      static #BASIC_PATH = 'http://localhost:8000/api/v1';
      static #HEADER = {
            accept: 'application/json',
            'Content-Type': 'application/json',
      };

      static getAll() {
            const path = `${this.#BASIC_PATH}/${this.#TODO_RESOURCE_PATH}`;
            return fetch(path, {
                  method: 'GET',
                  headers: this.#HEADER,
            }).then((response) => response.json());
      }

      static getById(id) {
            const path = `${this.#BASIC_PATH}/${this.#TODO_RESOURCE_PATH}/${id}`;
            return fetch(path, {
                  method: 'GET',
                  headers: this.#HEADER,
            }).then((response) => response.json());
      }

      static save(todo) {
            const path = `${this.#BASIC_PATH}/${this.#TODO_RESOURCE_PATH}`;
            return fetch(path, {
                  method: 'POST',
                  headers: this.#HEADER,
                  body: todo,
            }).then((response) => response.json());
      }

      static update(id, todo) {
            const path = `${this.#BASIC_PATH}/${this.#TODO_RESOURCE_PATH}/${id}`;
            return fetch(path, {
                  method: 'PUT',
                  headers: this.#HEADER,
                  body: todo,
            }).then((response) => response.json());
      }

      static updateStatus(id) {
            const path = `${this.#BASIC_PATH}/${this.#TODO_RESOURCE_PATH}/${id}`;
            return fetch(path, {
                  method: 'PATCH',
                  headers: this.#HEADER,
            }).then((response) => response.json());
      }

      static delete(id) {
            const path = `${this.#BASIC_PATH}/${id}`;
            return fetch(path, {
                  method: 'DELETE',
                  headers: this.#HEADER,
            }).then((response) => response.json());
      }
}
