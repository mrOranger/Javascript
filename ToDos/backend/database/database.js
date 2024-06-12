export class Database {
      constructor() {
            this.maxSize = 100;
            this.data = [];
      }

      getAll() {
            return this.data;
      }

      getById(id) {
            const todo = this.data.find((todo) => todo.id == id);
            if (!todo) {
                  throw new Error('Data not found exception.');
            }
            return todo;
      }

      save(todo) {
            if (this.data.length >= this.maxSize) {
                  throw new Error('Maximum size exceeded.');
            }
            const newId = this.data.length;
            this.data.push({
                  ...todo,
                  id: newId,
                  createdAt: new Date().toLocaleTimeString(),
                  updatedAt: new Date().toLocaleTimeString(),
                  completed: false,
            });
      }

      update(id, todoToUpdate) {
            const todoIndex = this.data.findIndex((todo) => todo.id == id);
            if (todoIndex === -1) {
                  throw new Error('Data not found exception.');
            }
            this.data.splice(todoIndex, 1, {
                  id,
                  ...todoToUpdate,
                  completed: true,
                  createdAt: new Date().toLocaleTimeString(),
                  updatedAt: new Date().toLocaleTimeString(),
            });
      }

      updateStatus(id) {
            const todoIndex = this.data.findIndex((todo) => todo.id == id);
            if (todoIndex === -1) {
                  throw new Error('Data not found exception.');
            }
            if (this.data[todoIndex].completed) {
                  throw new Error('Todo already completed.');
            }
            const todo = this.data[todoIndex];
            this.data.splice(todoIndex, 1, {
                  ...todo,
                  completed: true,
                  createdAt: new Date().toLocaleTimeString(),
                  updatedAt: new Date().toLocaleTimeString(),
            });
      }

      delete(id) {
            const todoIndex = this.data.findIndex((todo) => todo.id == id);
            if (todoIndex === -1) {
                  throw new Error('Data not found exception.');
            }
            this.data.splice(todoIndex, 1);
      }
}
