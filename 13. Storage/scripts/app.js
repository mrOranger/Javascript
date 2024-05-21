const listRadioLocalStorage = document.querySelector('#list-radio-local-storage');
const listRadioSessionStorage = document.querySelector('#list-radio-session-storage');
const listRadioDatabaseStorage = document.querySelector('#list-radio-database-storage');

const taskList = document.querySelector('#task-list');

const addTaskButton = document.querySelector('#add-task-button');

const taskTitle = document.querySelector('#title');
const taskDescription = document.querySelector('#description');
const taskPriority = document.querySelector('#priority');

function Task(id, title, description, priority) {
      Task.prototype.priorityColors = {
            1: 'red-300',
            2: 'orange-300',
            3: 'yellow-300',
      };

      Task.prototype.getId = function getId() {
            return id;
      };

      Task.prototype.getTitle = function getId() {
            return title;
      };

      Task.prototype.getDescription = function getId() {
            return description;
      };

      Task.prototype.getPriority = function getId() {
            return priority;
      };

      Task.prototype.toString = function toString() {
            return JSON.stringify({
                  id: this.getId(),
                  title: this.getTitle(),
                  description: this.getDescription(),
                  priority: this.getPriority(),
            });
      };

      Task.prototype.render = function render() {
            return `                  
            <div class="flex flex-col space-y-4 rounded-lg border-2 bg-${this.priorityColors[priority]} border-${this.priorityColors[priority]} border-solid p-5">
                  <h1 class="text-3xl subpixel-antialiased font-semibold text-justify text-wrap">${title}</h1>
                  <p class="text-base subpixel-antialiased font-normal text-justify text-wrap">${description}</p>
                  <h3 class="text-2xl subpixel-antialiased font-semibold text-justify text-wrap">Priority : ${priority}</h3>
            </div>`;
      };
}

function saveInLocalStorage(task) {
      try {
            localStorage.setItem(`task-${task.getId()}`, task);
            taskList.innerHTML += task.render();
      } catch (exception) {
            if (exception instanceof DOMException) {
                  console.error('Unable to store data in Local Storage, check permissions.');
            }
            console.error(exception);
      }
}

function saveInSessionStorage(task) {
      try {
            sessionStorage.setItem(`task-${task.getId()}`, task);
            taskList.innerHTML += task.render();
      } catch (exception) {
            if (exception instanceof DOMException) {
                  console.error('Unable to store data in Session Storage, check permissions.');
            }
            console.error(exception);
      }
}

function saveInDatabase(task) {
      openConnection('TodoDatabase', 1)
            .then((database) => addTask(database, task))
            .then((task) => {
                  taskList.innerHTML += new Task(
                        task.getId(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getPriority(),
                  ).render();
            })
            .catch((error) => console.error(error));
}

function onSaveTask() {
      const id = Date.now();
      const title = taskTitle.value.trim();
      const description = taskDescription.value.trim();
      const priority = taskPriority.value.trim();

      const task = new Task(id, title, description, priority);

      if (listRadioLocalStorage.checked) {
            return saveInLocalStorage(task);
      }

      if (listRadioSessionStorage.checked) {
            return saveInSessionStorage(task);
      }

      return saveInDatabase(task);
}

function onLocalStorageSelect() {
      listRadioLocalStorage.checked = true;
      listRadioSessionStorage.checked = false;
      listRadioDatabaseStorage.checked = false;
}

function onSessionStorageSelect() {
      listRadioLocalStorage.checked = false;
      listRadioSessionStorage.checked = true;
      listRadioDatabaseStorage.checked = false;
}

function onIndexedDbSelect() {
      listRadioLocalStorage.checked = false;
      listRadioSessionStorage.checked = false;
      listRadioDatabaseStorage.checked = true;
}

listRadioDatabaseStorage.addEventListener('click', onIndexedDbSelect);
listRadioSessionStorage.addEventListener('click', onSessionStorageSelect);
listRadioLocalStorage.addEventListener('click', onLocalStorageSelect);
addTaskButton.addEventListener('click', onSaveTask);

function initStorage(storage) {
      for (let i = 0; i < storage.length; i++) {
            const storageKey = storage.key(i);
            const storageItem = JSON.parse(storage.getItem(storageKey));
            const task = new Task(storageItem.id, storageItem.title, storageItem.description, storageItem.priority);
            taskList.innerHTML += task.render();
      }
}

window.onload = function () {
      initStorage(localStorage);
      initStorage(sessionStorage);
      openConnection('TodoDatabase', 1)
            .then((database) => getTasks(database))
            .then((tasks) => {
                  tasks.forEach((task) => {
                        taskList.innerHTML += new Task(task.id, task.title, task.description, task.priority).render();
                  });
            })
            .catch((error) => console.error(error));
};
