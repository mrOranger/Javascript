const inputTodo = document.getElementById('input-todo');
const saveButton = document.getElementById('save-button');
const todoListResult = document.getElementById('todo-list');
const todoList = [];

saveButton.addEventListener('click', () => {
      if (inputTodo.value) {
            todoList.push({
                  date: new Date().toLocaleTimeString(),
                  title: inputTodo.value,
                  toShow: true,
            });
      }
});

function appendTodoItems() {
      setInterval(() => {
            for (const todoElement of todoList) {
                  for (const todoElementObjKey in todoElement) {
                        if (todoElementObjKey == 'toShow' && todoElement[todoElementObjKey]) {
                              todoListResult.innerHTML += `<p> ${todoElement.date} - ${todoElement.title}</p>`;
                              todoElement[todoElementObjKey] = !todoElement[todoElementObjKey];
                        }
                  }
            }
            appendTodoItems();
      }, 5000);
}

appendTodoItems();
