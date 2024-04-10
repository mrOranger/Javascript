# HTMl, JavaScript and DOM

Since JavaScript is mainly used for front-end applications, is important to understand how does it works with HTML and how HTML is actually managed by the browser. Therefore, in this section we will have a look on how these elements works and how they interacts with themselves.

## The DOM (Document Object Model)

Let's take a look at how the HTML and JavaScript code interact each other:

![DOM](../assets/DOM.png)

when we create HTML with a JavaScript code linked to it, the browser and the interpreter parse and render both of the code in order to use them. On the other hand, to make JavaScript able to use the HTML code, the Browser creates an object called **DOM** (_Document Object Model_), that is a sort of API that JavaScript can use to interact with the rendered HTML code.
