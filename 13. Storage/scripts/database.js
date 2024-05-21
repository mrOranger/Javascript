function openConnection(databaseName, databaseVersion) {
      return new Promise((resolve, reject) => {
            const databaseRequest = indexedDB.open(databaseName, databaseVersion);
            databaseRequest.onsuccess = function (event) {
                  return resolve(event.target.result);
            };

            databaseRequest.onupgradeneeded = function (event) {
                  const database = event.target.result;
                  database.createObjectStore('tasks', { keyPath: 'id' });
                  return resolve(database);
            };

            databaseRequest.onerror = function (event) {
                  return reject(event.target.result);
            };
      });
}

function getTasks(database) {
      return new Promise((resolve, reject) => {
            const transaction = database.transaction(['tasks'], 'readwrite');
            const objectStore = transaction.objectStore('tasks');
            const request = objectStore.getAll();

            request.onerror = function (event) {
                  return reject('Error in retrieving all the tasks!');
            };

            request.onsuccess = function (event) {
                  return resolve(request.result);
            };
      });
}

function addTask(database, task) {
      return new Promise((resolve, reject) => {
            const transaction = database.transaction(['tasks'], 'readwrite');

            transaction.oncomplete = function (event) {
                  return resolve(task);
            };

            transaction.onerror = function (event) {
                  return reject();
            };

            transaction.objectStore('tasks').add({
                  id: task.getId(),
                  title: task.getTitle(),
                  description: task.getDescription(),
                  priority: task.getPriority(),
            });
      });
}
