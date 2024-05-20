# Data Storage in JavaScript

User's data are typically stored in the backend of our application, because we do not want to make them accessibile easily. However, there are some cases where it is desirable to store some data inside the browser, of course we are not talking about critical information, since they are still subject to security issues. There are many examples of data stored inside the browser in our daily life, for example, if you have used an e-commerce website, it is quite probable that the _shopping list_ has beed implemented using browser's storage.

In JavaScript there are three main differen types of Browser's storage:

- The simplest form of storage is represented by **local** and **session storage**. From a thecnical point of view, this is a simple key-value pair storage, easy to use and where we can set simple data. JavaScript allows us to use this storage with the `localStorage` and `sessionStorage` objects.
- Just like **session** and **local storage**, **cookies** is a set of key-value pairs to store data. However, unlike the previous storage type, cookies are attached to the HTTP request, therefore they can also be saved in the backend.

- Unlike the previous two storage options, **indexed database** is a more complex solution that allows us to store complex data in the browser, in fact, it is a real database available from the frontend.

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

Browser's storage allows us to store data only in the browser, without exchanging information with the server directly. Another way to store user's data also both in frontend and in the backend, is to use **Cookies**. Cookies are additional key-value pairs of information stored in an HTTP message, and that can be accessed both from frontend and backend.

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

There is an internal key-value based database in the borwser that allows us to implement powerful application, with enriched query abilities, moreover, the **IndexedDB** allows us to work both online and offline. IndexedDB allows to persist data only between sessions of the same domain, thus, preventing clients working on different domains to access data without having permission and avoiding collisions between data stored below the same key.

Access or storing data in the database are made in a single **transaction** like in more complex databases. Moreover, most of operations made in the database are asynchronous, therefore, we cannot access data in the same way we did with Storage but only using callbacks functions, named **requests**.

Each request made to the database can assume two values between **success** or **failure**, they have also other internal properties like **readyState**, **result** or **errorCode**.

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

with the code above, we are not starting any transaction but we are just making a request to the database to create a new instance with the given name, and with the following version. In fact, we can create different databases' instances using the same name, but specifying another version, to distinguish between updated schemas of the same instance.

The `open` method returns an instance of `IDBRequest` interface that can success or fail. When we create a new instance of the database, the `onupgradedneeded` event is fired, and we create the schema of the database inside the callback function registered to listen this event.

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
