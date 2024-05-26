const addButton = document.querySelector('#add');
const updateButton = document.querySelector('#update');
const deleteButton = document.querySelector('#delete');
const propertyName = document.querySelector('#key');
const propertyValue = document.querySelector('#value');
const logs = document.querySelector('#logs');
const personAttributes = document.querySelector('#person-attributes');
const logController = new LogController();
let currentAction = '';

const person = new Proxy(
      {
            firstName: 'Mario',
            lastName: 'Rossi',
            age: 21,
      },
      {
            get: (target, field) => {
                  if (target[field]) {
                        return target[field];
                  }
                  throw new Error(`Cannot get undefined property ${field}!`);
            },
            set: (target, field, newValue) => {
                  if (['firstName', 'lastName'].includes(field)) {
                        throw new Error(`Cannot set private property ${field}!`);
                  }
                  if (currentAction === 'UPDATE' && !target[field]) {
                        throw new Error(`Cannot update undefined property ${field}!`);
                  }
                  if (currentAction === 'ADD' && target[field]) {
                        throw new Error(`Cannot add existing property ${field}!`);
                  }
                  target[field] = newValue;
            },
            deleteProperty: (target, field) => {
                  if (['firstName', 'lastName'].includes(field)) {
                        throw new Error(`Cannot delete private property ${field}!`);
                  }
                  if (target[field]) {
                        delete target[field];
                  } else {
                        throw new Error(`Cannot delete undefined property ${field}!`);
                  }
            },
      },
);

addButton.addEventListener('click', (event) => {
      try {
            currentAction = 'ADD';
            const name = propertyName.value;
            const value = propertyValue.value;
            Reflect.set(person, name, value);
            logController.addLog(currentAction, logController.computeLogDescription(currentAction, name, value));
            const li = document.createElement('li');
            li.id = name;
            li.textContent = `${name}: ${value}`;
            personAttributes.appendChild(li);
      } catch (exception) {
            console.error(exception);
            logController.logError(exception.message);
      }
});

updateButton.addEventListener('click', (event) => {
      try {
            currentAction = 'UPDATE';
            const name = propertyName.value;
            const value = propertyValue.value;
            Reflect.set(person, name, value);
            logController.addLog(currentAction, logController.computeLogDescription(currentAction, name, value));
            const li = document.querySelector(`#${name}`);
            li.textContent = `${name}: ${value}`;
      } catch (exception) {
            console.error(exception);
            logController.logError(exception.message);
      }
});

deleteButton.addEventListener('click', (event) => {
      try {
            currentAction = 'DELETE';
            const name = propertyName.value;
            Reflect.deleteProperty(person, name);
            logController.addLog(currentAction, logController.computeLogDescription(currentAction, name));
            const li = document.querySelector(`#${name}`);
            personAttributes.removeChild(li);
      } catch (exception) {
            console.error(exception);
            logController.logError(exception.message);
      }
});

function LogController() {
      LogController.prototype.addLog = function (type, description) {
            const logDiv = document.createElement('div');
            const h1 = document.createElement('h1');
            const p = document.createElement('p');
            const h4 = document.createElement('h4');

            logDiv.classList.add('w-full', this.computeLogColor(type), 'p-5', 'rounded-lg', 'border-solid');
            h1.classList.add('text-2xl');
            h4.classList.add('text-lg');

            p.textContent = description;
            h1.textContent = type;
            h4.textContent = new Date().toLocaleTimeString();

            logDiv.appendChild(h1);
            logDiv.appendChild(p);
            logDiv.appendChild(h4);
            logs.appendChild(logDiv);
      };

      LogController.prototype.logError = function (description) {
            const logDiv = document.createElement('div');
            const h1 = document.createElement('h1');
            const p = document.createElement('p');
            const h4 = document.createElement('h4');

            logDiv.classList.add('w-full', this.computeLogColor('DELETE'), 'p-5', 'rounded-lg', 'border-solid');
            h1.classList.add('text-2xl');
            h4.classList.add('text-lg');

            p.textContent = description;
            h1.textContent = 'ERROR';
            h4.textContent = new Date().toLocaleTimeString();

            logDiv.appendChild(h1);
            logDiv.appendChild(p);
            logDiv.appendChild(h4);
            logs.appendChild(logDiv);
      };

      LogController.prototype.computeLogDescription = function (type, fieldName, fieldValue) {
            if (type === 'ADD') {
                  return `Add new property ${fieldName} with value ${fieldValue}`;
            }
            if (type === 'UPDATE') {
                  return `Update property ${fieldName} with value ${fieldValue}`;
            }
            return `Delete property ${fieldName}`;
      };

      LogController.prototype.computeLogColor = function (type) {
            if (type === 'ADD') {
                  return 'bg-green-200';
            }
            if (type === 'UPDATE') {
                  return 'bg-orange-200';
            }
            return 'bg-red-200';
      };

      LogController.prototype[Symbol.iterator] = function* () {};
}
