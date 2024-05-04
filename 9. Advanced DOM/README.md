# Advanced DOM Concepts

In [Chapter 4](../4.%20DOM/README.md) we saw basic concepts about DOM, in this chapter we will see the most advanced features like the concept of `dataset` in the DOM and `location` and `navigator` objects. Rember that, the _Document Object Model_ (remember DOM), is a sort of API exposed by the browser to make the interaction between scripting languages (like JavaScript) and the HTML document easy.

## HTML Data Attribute & Dataset

Sometimes, we would like to add extra information in some HTML element in such a way that they will be always accessible. Fortunately in all HTML tags there is a special attribute whose name starts with `data` that allows us to store any kind of information in a form of string. Let's take a look at this example:

```html
<p id="description" data-paragraph-description="The description of my paragraph">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas sapien scelerisque, convallis sem nec.
</p>
<p id="author" data-paragraph-author="mrOranger">
      Nunc lobortis blandit ipsum, at dapibus lectus finibus et. Duis porta at dui in scelerisque. Phasellus id velit
      sit amet urna hendrerit facilisis. Aliquam pulvinar euismod felis, sit amet eleifend velit laoreet sit amet.
      Curabitur in neque quis leo maximus sagittis. Etiam accumsan odio eget sapien dictum, in suscipit sem rutrum.
</p>
```

as we can see, we add two attributes starting with the `data` prefix, in these HTML tags, indicating extra information about them.

Access to these information from JavaScript is quite easy, since all elements of the DOM are provided with a special property named `dataset`. The `dataset` property returns a `DOMStringMap` objects, which is nothing more that a set of key-value pairs corresponding to all the attributes starting with the `data` prefix.

One important thing is that since in the HTML page the attributes are named using the _kebab-case_, in the `DOMStringMap` they are actually converted in their _camelCase_ counterpart, as we can see below:

```javascript
const description = document.getElementById('description');
const author = document.getElementById('author');

console.log(description.dataset.paragraphDescription); // The description ...
console.log(description.dataset.paragraphAuthor); // mrOranger
```

## Timer & Intervals

Asynchronous programming is an important part of JavaScript, and will be covered later in this course. However, there are two methods that handle asynchronous code to execute while the script is running, and that we can see now. These functions are `setTimeout` and `setInterval`, and we can see an example of them here:

```javascript
const timeoutId = setTimeout(() => {
      console.log('Set timeout');
}, 1000);

const intervalId = setInterval(() => {
      console.log('Set interval');
}, 1000);
```

While `setTimeout` won't stop the script's execution and runs the code inside the callback function passed as first argument after the number of milliseconds passed as second argument (in this case 1000ms = 1s), the `setInterval` function runs the code inside the callback function with a time interval in milliseconds specified by the second argument (the string `'Set interval'` will be printed each 1000ms).

Thus, both functions executes some code in background respect to the normal script's workflow. However, even if it is quite helpful, we need a way to stop this background execution. As we can see from the previous example, both function returns a number representing the id of the code that will be executed, and we can use the function `clearTimeout` and `clearInterval` to stop the code's execution, identified by the id:

```javascript
clearTimeout(timeoutId);
clearInterval(intervalId);
```

## Location & History

Inside the `window` object is it possible access to the `location` property. The navigation through the tab of a browser is managed as a queue, each time you access to a new page, all the references to that page is enqueued in this virtual queue. Morever, it is possible access to a specific step of navigation's queue, using the `location` and `history` properties.

There are different properties inside the `location` object that allows us access to the page's URL, however the commonest maybe is the `href` property:

```javascript
window.location.href = 'http://mywebpage.com';
```

this command will immediately redirect the user to the webpage in `http://mywebpage.com`. On the other hand, the `history` object contains different methods to navigate through the window's navigation queue. For instance, if we want to navigate to the previous page, it is sufficient to use the `back()` method, or the `forward()` if we want to navigate forward.
