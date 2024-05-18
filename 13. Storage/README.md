# Data Storage in JavaScript

User's data are typically stored in the backend of out application, because we do not want to make them accessibile easily also by the same user. However, there are some cases where it is desirable to store some data inside the browser, of course we are not talking about critical information, since they are still subject to security issues. There are many examples of data stored inside the browser in our daily life, for example, if you have used an e-commerce website, it is quite probable that the _shopping list_ has beed implemented using browser's storage.

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

## Cookies

## IndexedDb
