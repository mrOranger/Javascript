export class Database {
      constructor() {
            this.maxSize = 100;
            this.data = [];
      }

      getAll() {
            return this.data;
      }

      getById(id) {
            const todo = this.data.find((todo) => todo.id === id);
            if (!todo) {
                  throw new Error('Data not found exception.');
            }
            return todo;
      }

      save(todo) {
            if (this.data.length >= this.maxSize) {
                  throw new Error('Maximum size exceeded.');
            }
            this.data.push(todo);
      }

      update(id, todoToUpdate) {
            const todoIndex = this.data.findIndex({ id, ...todoToUpdate });
            if (todoIndex === -1) {
                  throw new Error('Data not found exception.');
            }
            this.data.splice(todoIndex, 1, { id, ...todoToUpdate });
      }

      updateStatus(id) {
            const todo = this.getById(id);
            todo.completed = true;
      }

      delete(id) {
            const todoIndex = this.data.findIndex({ id, ...todoToUpdate });
            if (todoIndex === -1) {
                  throw new Error('Data not found exception.');
            }
            this.data.splice(todoIndex, 1);
      }
}
