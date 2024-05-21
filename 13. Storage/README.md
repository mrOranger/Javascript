# Data Storage in JavaScript

User's data are typically stored in the backend of our application, because we do not want to make them accessibile easily. However, there are some cases where it is desirable to store some data inside the browser, of course we are not talking about critical information, since they are still subject to security issues and can be directly updated by the user. There are many examples of data stored inside the browser in our daily life, for example, if you have used an e-commerce website, it is quite probable that the _shopping list_ has beed implemented using browser's storage.

In JavaScript there are three main differen types of Browser's storage:

- The simplest form of storage is represented by **Local** and **Session Storage**. From a technical point of view, this is a simple key-value pair storage, easy to use and where we can set only primitive data like `String` or `Number`. JavaScript allows us to use this storage with the `localStorage` and `sessionStorage` objects.

- Just like **Session** and **Local Storage**, **Cookies** is a set of key-value pairs used to store information. However, unlike the previous storage type, cookies are attached to the HTTP request, therefore they can also be saved in the backend.

- Unlike the previous two storage options, **Indexed Database** is a more complex solution that allows us to store complex data in the browser, in fact, it is a real NoSql database available from the frontend.

### Storage limitations and exception

Browser can store at least 10mb of data, divided equally between Local Storage and Session Storage. Once the limit is reached, if we try to store more data an `QuotaExceededError` exception will be throws, <u>it means that all the operations on browser storage must be handled using a `try-catch` block</u>.

Any time we can check the quantity of available data using the `navigator.storage.estimated()` method, available from the `Storage` object. However, this method returns an estimation of the available space quantity, since we cannot be sure that other origins from the same browser's session will use more space.

## Session and Local Storage

As we mentioned before, the simpliest way used by JavaScript to use browser's storage is by using the `sessionStorage` and `localStorage` objects. The first thing that we need to know, is the difference between these objects, in fact, both of them represents a set of key-value pairs where store simple data, however:

- the **local storage** stores elements inside the current browser's exection. This means that closing the current tab, the data will be also available because we did not close the application itself. Thus, data will be available between all the tabs of the same running instance.

- On the other hand, **session storage** (as the same indicates), can store data only inside the current tab's session. Therefore, if we close the tab, the data won't be available inside other tab of the same browser's instance.

There are few methods available both from `sessionStorage` and `localStorage` objects, of course, the complete list of these can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/Storage), however, the most used methods are:

1. `setItem(key, value)` that creates a new item with the values specified as the second argument, and stored using the key specified by the first argument.

2. `getItem(key)` returns the item with the specified key, or `null` if there is not item with that key.

However, there are some cases where the user cannot allow the Browser to store data, sometimes due to security or browser's configuration reasons. In both cases, storing data using the `getItem` method can be throw a `DOMException` that needs to be catched and managed.

In both cases, we cannot store complex data directly but only privitive values such as `Number` or `String`, that is because the `setItem` method, stores only string values and then invokes the `toString` method on every value that we require to store. Therefore, a simple object's value is stored as `[object Object]`. However, there is a workaraound to store objects using primitive types, that is converting an object in its string representation using the `JSON.strigify` method:

```javascript
const aNumber = 1;
const aString 'hello world';
const anObject = {
    firstName : 'Mario',
    lastName : 'Rossi'
};

sessionStorage.setItem('aNumber', aNumber);
sessionStorage.setItem('aString', aString);
sessionStorage.setItem('anObject', anObject);
sessionStorage.setItem('anObject', JSON.stringify(anObject));
```

On the other hand, if we would like to store objects' values without using the `JSON.strigify` method, we can override the `toString` method in the class, that will be automatically invoked when we will store the value in the Storage:

```javascript
function Person(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;

      Person.prototype.toString = function toString() {
            return `${this.firstName} ${this.lastName}`;
      };
}

localStorage.setItem('person', new Person('Mario', 'Rossi'));
localStorage.getItem('person'); // Mario Rossi
```

## Cookies

Browser's storage allows us to store data only in the browser, without exchanging information with the server directly. Another way to store user's data also both in frontend and in the backend, is using **Cookies**. Cookies are additional key-value pairs of information stored in an HTTP message, and that can be accessed both from frontend and backend.

JavaScript allows us to access cookies data using the `document` object. However, differently from the classic browser's storage, storing and retrieving cookies is more cumbersome, since there are no methods defined in JavaScript to manipulate cookies' data and they are stored as a string. The following example shows how can we access and write cookies in JavaScript:

```javascript
const aNumber = 1;

const person = {
      firstName: 'Mario',
      lastName: 'Ross',
};

document.cookie += `number=${aNumber};`;
console.log(document.cookie); //number=1;

document.cookie += `person=${JSON.stringify(person)};`;
```

## IndexedDB

A more complex solution is represented by the **IndexedDB** that lets us to create more complex application working both online and offline, thanks to the IndexedDB queries' abilities, and less strict limitations of the available storage space. However, data can be accessed only from the same origin.There are some characteristics to keep in mind while working with IndexedDB:

1. Only **key-value pairs** are allowed to store, just like with some NoSql databases. However, we can also created _indexes_ for objects' key to store, improving the reserach capabilities.

2. Everything happens in the same **transaction**. Just like most common databases that follows the [ACID Priciples](https://en.wikipedia.org/wiki/ACID), all the operations are encapsulated in a single transaction, that are auto-committed thus is not necessary indicate to the database that can persist our operations.

3. As most of the NoSql databases' operations, also IndexedDb **works in async mode**. Any operation is performed thhrough **requestes** and **responses**, and the events are notified directly to the DOM. Since requests are asynchronous operations, they can have `onsuccess` and `onerror` properties, and we can attach listeners to them. Each request made to the database can assume two values between **success** or **failure**, they have also other internal properties like **readyState**, **result** or **errorCode**.

4. In a traditional relational database, you would have tables that store a collection of data. On the other hand, IndexedDb persists JavaScript **objects** that can have a collection of indexes making the queries over them more efficient.

There is a basic pattern that is encouraged to follow when we are working with the indexedDB, that is:

1. Open a new database.
2. Create the objects that have to be persisted.
3. Start a new transaction.
4. Register a new listener and wait for the operation to be completed or rejected.
5. Manipulate the result.

### Create a new database instance

Working with an IndexedDB requires to create a new database instance, using the following code:

```javascript
const databaseRequest = indexedDB.open('MyDatabase', 1);
```

with the code above, we are not starting any transaction but we are just making a request to the database to create a new instance with the given name, and with the following version. In fact, we can create different databases' instances using the same name, but specifying another version, to distinguish between updated schemas of the same instance. Once we called the function `open` an instance of `IDBOpenDBRequest` is returned, with a result or error value that must be handled by events.

Once we create a new instance of the database, we can proceed to register the callback functions for handling errors of successes:

```javascript
const databaseRequest = indexedDB.open('MyDatabase', 1);

databaseRequest.onerror = function onError(event) {
      console.error('A problem occurred in opening the database, check you permission.');
};

databaseRequest.onupgradeneeded = function onUpgradeneeded(event) {
      const database = event.target.result;

      console.log('A new version of the database has been created.');
};

databaseRequest.onsuccess = function onSuccess(event) {
      console.log('Database created successfully!');
};
```

The `onsuccess` callback is fired once the connection to the database has been established correctly. However, if the database has been created for the first time, the `onupgradedneeded` callback will be triggered, and the database's schema will be created using the specified structure. On the other hand, if the database exists, but we are specifying a different version, the `onupgradeneeded` callback will be triggered again. The IndexedDB API is designed to minimize the need for error handling, however, there are some conditions that generates errors to handle, the most common is the lack of user's permissions to create a database.

### Create or update the version of the database

When we create a new instance of the database with a different version, the event `onupgradeneeded` will be triggered with the `IDBVersionChangeEvent` object. Inside this event, we can create or update the **object store** inside the current version of the database. Once the update is completed successfully, the event `onsuccess` will be triggered indicating that the opening and upgrading of the database was completed successfully.

Previously, we mentioned the **object store** that is the object used to store information inside the database rather than single table. An object store is composed by a key identifying it and the associated value, it is possible to create **indexes** associated to objects that make easier to retrieve information, moreover, indexes can also be used to guarantee some constraints such as unique values between objects. Let's take a look at this example:

```javascript
request.onupgradeneeded = function (event) {
      const people = [
            { taxCode: 'AB123CD', firstName: 'Mario', lastName: 'Rossi', email: 'mario.rossi@email.com' },
            { taxCode: 'AK912LA', firstName: 'Maria', lastName: 'Verdi', email: 'maria.verdi@email.com' },
            { taxCode: 'NH293LA', firstName: 'Federico', lastName: 'Neri', email: 'federico.neri@email.com' },
      ];

      const database = event.target.result;

      const objectStore = database.createObjectStore('people', { keyPath: 'id' });
      objectStore.createIndex('firstNameIndex', 'firstName', { unique: false });
      objectStore.createIndex('emailIndex', 'email', { unique: true });

      objectStore.transaction.oncomplete = (event) => {
            const peopleObjectStore = database.transaction('people', 'readwrite').objectStore('people');
            people.forEach((person) => {
                  peopleObjectStore.add(person);
            });
      };
};
```

Notice that all the database structure's update are made inside the event `onupgradeneeded`. First of all, we create a new object store using the code `const objectStore = database.createObjectStore('people', { keyPath: 'id' });`, this method takes as first argument the name of the object store and optional parameters, in this case we are indicating through the parameter that all the elements inside this object store, will be identified through the `id`` key. Moreover, we attached indexes to this object store:

- `objectStore.createIndex('firstNameIndex', 'firstName', { unique: false });` creates a new index named `firstNameIndex` on the field `firstName` of the object, passing the optional parameters that indicates to the database that the field should not be unique.
- On the other hand, the second index `objectStore.createIndex('emailIndex', 'email', { unique: true });` guarantees us that the `email` field must be unique, preventing us to insert duplicates in the collection.

Finally, in the last lines, we create a new transaction, taking the object store that we just created, and adding all the person passed as input to the function.

### Adding, retrieving and removing data

Before perform some operations on the database's data we must create a transaction, and specify which type of operation we want to perform. Any transaction can be created with three different modalities: `readonly`, `readwrite` or `versionchange`. While the first two of them are used only to read or read and write data, the latter is used only for operations that update the database's internal structure.

Let's take a look at this example to understand how can we use transaction to read data from the database:

````javascript
const people = [
      { taxCode: 'AB123CD', firstName: 'Mario', lastName: 'Rossi', email: 'mario.rossi@email.com' },
      { taxCode: 'AK912LA', firstName: 'Maria', lastName: 'Verdi', email: 'maria.verdi@email.com' },
      { taxCode: 'NH293LA', firstName: 'Federico', lastName: 'Neri', email: 'federico.neri@email.com' },
];

const transaction = database.transaction(['people'], 'readwrite');```
````

using the function `database.transaction` we are opening a new transaction specifying which object store is involved in the transaction and in which mode we are creating the new transaction (in this case we can both read or write data). Once we created a new transaction, we can register the events' handlers for the event `error` and `complete` (remember that transactions work in asynchronous way):

```javascript
transaction.oncomplete = function (event) {
      console.log(`Transaction started successfully!`);
};

transaction.onerror = function (event) {
      console.error(`Transaction failed!`);
};

const objectStore = transaction.objectStore('people');
people.forEach((person) => {
      const request = objectStore.add(person);

      request.oncomplete = function (event) {
            console.log(`${people} written with success!`);
      };

      request.onerror = function (event) {
            console.error(`Error in persisting ${people}`);
      };
});
```

once we created the transaction and registered the events' handlers, we can get the object store where our data will be stored and adding them, adding listeners for request's result.

In a similar manner other operations like get, update or delete, are implemented. For example, let's consider the delete operation without registering any listeners to the transaction:

```javascript
const transaction = database.transaction(['people'], 'readwrite');
const objectStore = transaction.objectStore('people');
const request = objectStore.delete('NH293LA');
```

inside the variable `request` there is the id of the deleted object store, that is the tax code that we passed as input to the function.
