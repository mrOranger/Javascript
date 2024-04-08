# Functions

Before dive into the tecnical details about how functions are defined and used in JavaScript, we must have a look on the theory of programming languages, more specifically in function's classification. From a theoretical point of view, functions are classified in **three abstraction levels** that are: _first_, _second_ and _third_ class citized; depending on their ability and flexiblity in the language.

JavaScript's function are **first class citizen** it means that they can be trated as any other data type in the language. Indeed, functions can be:

- _Assigned to a variable_, thus accessed and resuable.
- _Passed as an argument_ to other functions.
- _Returned from functions_, allowing them to create _high order functions_.

Take into account these concepts in this section, while introducting functions.

## Functions are Objects ?

Let's take a look at this piece of code:

```javascript
function aFunction() {
      return Math.random();
}

console.log(typeof aFunction); // Function
```

therefore, JavaScript has a own type to manage functions that is the _Function_ type. However, if we take a look at the definition of a function, we will notice that a set of key-value elements are printed, therefore, are functions objects? More or less is true, but the correct answer is that **functions in JavaScript are a special kind of objects**.

## Function Declaration vs Function as a variable

As mentioned above, functions are first class' citizen, therefore, they can be assigned to variables, in fact, we could define a function in two different ways:

```javascript
const aFunction = function aFunction() {
      console.log('aFunction');
};

function anotherFunction() {
      console.log('anotherFunction');
}

aFunction(); // aFunction
anotherFunction(); // anotherFunction
```

the result is the same, so what is the difference between these two declarations? In fact, declaring a function in its "classical" way let JavaScript to apply the **hoisting**, therefore the function's declaration will be moved to the top of the script, and this won't happen in declaring a function as a variable. Indeed, updating the initial example in this way will throw an exception:

```javascript
aFunction(); // Undefined function 'afunction'
anotherFunction(); // anotherFunction

const aFunction = function aFunction() {
      console.log('aFunction');
};

function anotherFunction() {
      console.log('anotherFunction');
}
```

## Preparing a function with bind()

As we know, functions are a sort of object, thus there are some methods invokable on a function's definition. One of these methods, is the _bind_ method, which is a sort of _prepare the function without executing it_, that is, the function injects some parameters as default values, without actually run it. Consider this example:

```javascript
function aFunction(aParameter1, aParameter2) {
      console.log(aParameter1, aParameter2);
}

aFunction = aFunction.bind(this, 'hello');
aFunction('world'); // hello world
```

by using the _bind_ function on the function's instance, we get an instance of the same function in which there is already the first parameter, therefore, when we will can the same function passing only one parameter, JavaScript will notice that there is already the first parameter injectd into the function.

- **NB**, we will exaplain the _this_ parameter later.
