# HTTP

Web application are typically designed in two parts: the **frontend** that is responsible about presenting data to the user, and is the only part that the user uses to interact with the application, and the **backend** where the application's business logic is encoded. In order to communicate, there is a widely standard protocol used for web information interchange that is **HTTP** (HyperText Transfer Protocol), that is used also by JavaScript.

There are two interfaces implemented in JavaScript to communicate through the web and use the HTTP protocol, the **XHR** XMLHTTPRequest and the **fetch API**. Nowadays, the latter is maybe the most used, however, we will see both of them because they are complementary, and probabily legacy code will use only XHR.

## XMLHTTPRequest

To interact with a server, JavaScript uses the **XMLHttpRequest** object that is a native interface implemented that ables us to make HTTP request. Making a request using this object is quite easy, and involves four main steps:

- Create a new **XMLHTTPRequest** object.
- **Open** the connection with the destination, by specifying the HTTP method and the URL.
- Attach to the **onload** event the callback function that we want to execute when the request completed.
- Make the request, passing to it our potential data.

Let's cosider the following example, we would like to get the data from the server by making an HTTP GET request on a specific resource, when the request is completed, we would like to print the response's body:

```javascript
const request = new XMLHttpPRequest();

request.open('GET', '/users/1');

request.onload = function () {
      console.log(request.response);
};

request.send();
```

On the other hand, if we would like to pass any data to the server, of course we have to make a POST request, by passing the body as a string, that is typically the JSON representation of our data:

```javascript
const request = new XMLHttpPRequest();
const user = {
      firstName: 'Mario',
      lastName: 'Rossi',
};

request.open('POST', '/users');

request.onload = function () {
      console.log(request.response);
};

request.send(JSON.stringify(user));
```

There are many other settings and methods implemented inside the `XMLHttpPRequest` object, however, more or less this is the most important part to know about this way of making HTTP requests.

### Error handling

When deling with the `XMLHttpRequest` object, there are two different type of errors to handle: errors given by an incorrect user's request, like `400 - Bad Request`, and errors caused by some server's internal problem. We need to distinguish these erros because there are triggered in different ways in JavaScript. If the first type of errosr can be handled inside the `onload` callback, the others must be handled in another callback function that is triggered by the `onerror`. Let's take a look at this example:

```javascript
const request = new XMLHttpPRequest();
const user = {
      firstName: 'Mario',
      lastName: 'Rossi',
};

request.open('POST', '/users');

request.onload = function () {
      const response = request.response;
      if (response.status >= 200 && response.status < 300) {
            console.log(request.response);
      } else {
            console.log('An error occurred: ' + response.status);
      }
};

request.onerror = function () {
      console.log(request.status, request.response);
};

request.send(JSON.stringify(user));
```

## fetch API

Since ES6, JavaScript provides the **fetch API**, a new interface for fetch resources more poerwrful and easier to use that `XMLHttpRequest`. Moreover, the fetch API uses the `Request` and `Response` objects as well as other concepts like CORS and HTTP Origin semantic. Respect to `XMLHttpRequest`, the fetch API uses `Promise` to handle the responses and can be configurated in different ways using an object as parameter. Let's take a look at the following example, we would like to make a GET request to `http://my.domain.com/resource/`:

```javascript
fetch('http://my.domain.com/resource')
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
```

Quite shorter that `XMLHttpRequest`. However, the important thing to notice is that we chained two `then` methods instead of one. In fact, the `fetch` does not returns only a Promise with the response but returns another Promise that must be solved to get the right response, and we do that by using the `json()` method on that Promise, returning a new Promise containing a JSON. Why should we do that? The answer again is in error handling, as we saw using `XMLHttpRequest` there are two main types of errors that must be handled, client's error or server's error or internet's error, therefore we need to check in the first `then` method the response's code:

```javascript
fetch('http://my.domain.com/resource')
      .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                  return response.json();
            } else {
                  response.json().then((error) => throw new Error(`An error occurred: ${error.message}`));
            }
      })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
```

Of course this is a quite easy example, we make a GET request without passing data inside the request's body. If we would like to make another type of request, such as a POST, we must pass additional parameters to `fetch`, by using an object. For instance, let's make a POST request to the same URL, passing some random parameters inside the body, and indicating in the request's header that the body is a JSON string:

```javascript
fetch('http://my.domain.com/resource', {
      method: 'POST',
      body: {
            firstName: 'Mario',
            lastName: 'Rossi',
      },
      header: {
            'content-type': 'application/json',
      },
})
      .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                  return response.json();
            } else {
                  response.json().then((error) => throw new Error(`An error occurred: ${error.message}`));
            }
      })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
```
