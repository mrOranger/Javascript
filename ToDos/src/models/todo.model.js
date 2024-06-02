export class Todo {
      constructor({ id, title, description, done, createdAt, updatedAt }) {
            this._id = id;
            this._title = title;
            this._description = description;
            this._done = done;
            this._createdAt = createdAt;
            this._updatedAt = updatedAt;
      }

      get id() {
            return this._id;
      }

      get title() {
            return this._title;
      }

      get description() {
            return this._description;
      }

      get isDone() {
            return this._done;
      }

      get createdAt() {
            return this._createdAt;
      }

      get updatedAt() {
            return this._updatedAt;
      }

      set title(value) {
            this._title = value;
      }

      set description(value) {
            this._description = value;
      }

      set isDone(value) {
            this._done = value;
      }

      toString() {
            return `{
                  id : ${this.id},
                  title : ${this.title},
                  description : ${this.description},
                  isDone : ${this.isDone},
                  createdAt : ${this.createdAt},
                  updatedAt : ${this.updatedAt}
            }`;
      }
}
