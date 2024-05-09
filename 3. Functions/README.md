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

therefore, JavaScript has a own type to manage functions that is the `Function` type. However, if we take a look at the definition of a function, we will notice that a set of key-value elements are printed, therefore, are functions objects? That's true, more or less, but the correct answer is that **functions in JavaScript are a special kind of objects**.

## Function Declaration vs Function as a variable

As mentioned above, functions are first class' citizen, therefore, they can be assigned to variables, in fact, we could define a function in two different ways:

```javascript
const aFunction = function () {
      console.log('aFunction');
};

function anotherFunction() {
      console.log('anotherFunction');
}

aFunction(); // aFunction
anotherFunction(); // anotherFunction
```

the result is the same, so what is the difference between these two declarations? Declaring a function in its "classical" way let JavaScript to apply the **hoisting**, therefore the function's declaration will be moved to the top of the script, and this won't happen in declaring a function as a variable. Indeed, updating the initial example in this way will throw an exception:

```javascript
aFunction(); // Undefined function 'afunction'
anotherFunction(); // anotherFunction

const aFunction = function () {
      console.log('aFunction');
};

function anotherFunction() {
      console.log('anotherFunction');
}
```

## Preparing a function with bind()

As we know, functions are a sort of object, thus there are some methods invokable on a function's definition. One of these methods, is the `bind` method, which is a sort of _prepare the function without executing it_, that is, the function injects some parameters as default values, without actually run it. Consider this example:

```javascript
function aFunction(aParameter1, aParameter2) {
      console.log(aParameter1, aParameter2);
}

aFunction = aFunction.bind(this, 'hello');
aFunction('world'); // hello world
```

by using the _bind_ function on the function's instance, we get an instance of the same function in which there is already the first parameter, therefore, when we will can the same function passing only one parameter, JavaScript will notice that there is already the first parameter injectd into the function.

## apply() & call()

While `bind()` is a sort of _function preparation_ before call the function itself, `apply` and `call` prepares the function and call it in the same moment. If we take a look at the definition of these two methods, we can see that they both receive as first parameter the context to inject in the function before execute it, but they are different respect to the second parameter. In fact, `apply` receives as second parameter an array of parameters to substitute, while `call` recevies a number of variable arguments

```javascript
function aFunction(a, b) {
      console.log(this.c, a, b);
}

aFunction.apply({ c: 1 }, [2, 3]); // 1 2 3
aFunction.call(this, 2, 3); // undefined, 2, 3
```

## Pure vs Side Effect Functions

Sometimes you probably heard about **pure** functions and functions with **side effect**, without adding more technical details, we can say that the former are functions that do not modify the input data, while the latter do. Of course, creating functions that do not modify the program's internal state is always desirable, since we have more control on them and they are easier to test. However, we cannot avoid using function with side effects, since they are an essential part to achieve a daily programming task.

Let's take a look at these examples:

```javascript
function aFunction(a, b) {
      return a + b;
}
```

a function like this one is a pure function, we can always control its result and it does not modify `a` or `b` values. On the other hand, a function like the following has side effects:

```javascript
function aFunction(elements) {
      elements.push(1);
}
```

in fact, the input values is updated once we have invoked the function, producing an update of the program's state.

One of the most common case of function with side effects is an HTTP call to a server. In fact, we cannot predict exaclty the result of the function, and its execution will probably change the program's state.

## Closures

One of the most important aspect of JavaScript as we mentioned above, is declaring functions as **first's class citizen**. Therefore, one consequence of this theoretical aspect of functions, is that they can be stored as values of an expression. Let's take a look at this example:

```javascript
function aFunction(value) {
      console.log(value);
}

const aVariable = aFunction;
```

assigning to `aVariable` the value of `aFunction` we are not actually invoking the function itself, but in a certain sense we are telling to JavaScript _"okay, freeze the function inside the variable, without actually starting to bind the parameters"_. This technical aspect of JavaScript is known as **closure**, and according to [Wikipedia](<https://en.wikipedia.org/wiki/Closure_(computer_programming)>), a closure is defined as:

```
a technique for implementing lexical scoped name binding, in a language with a first's class function. Operationally, a closure is a record storing a function.
```

### Lexical Environment

Reading the previous definition, probably you asked to yourself: "what the hell is a _lexical scope_?" Answering to this question requires an example:

```javascript
let firstName = 'Mario';
let lastName = 'Rossi';

function printData() {
      console.log(firstName, lastName);
}

printData(); // Mario Rossi
```

How is it possible that the function prints `Mario Rossi` even if the variables `firstName` and `lastName` are not defined in its body? Well, functions, or in general every expression in JavaScript, has a special scope named _lexical scope_ assigned to it and connected to its outermost exception. Therefore, in this case, when we invoke the function JavaScript cannot bind the variables `firstName`, `lastName` because they are not defined in the function's lexical scope, and for this reason the JavaScript engine starts to look for variables' definitions in the outermost expression of the function, that is the program itself.

Let's take a look on another example:

```javascript
function aFunction() {
      let aVariable = 1;
      let anotherVariable = 2;

      function anotherFunction() {
            let anotherVariable = 3;
            console.log(aVariable, anotherVariable);
      }

      return anotherFunction;
}

const func = aFunction();
func(); // 1, 3
```

When we call the function `anotherFunction` JavaScript starts to solve the variables' values inside it. Thus, starting with the variable `aVariable`, it is not possible to get a value for it because there is no definition of such a variable in the current lexical scope, so JavaScript looks for the variable's defintion in the immediatly outerscope that it the body of the function `aFunction`. Things are different for the variable `anotherVariable` since it is defined both inside the function `aFunction` and the function `anotherFunction`, howerver, looking for the variable's definition, the only scope in where the variable is defined is the lexical scope of the function `anotherFunction`, so JavaScript stops to looking in other scopes since it is not needed.

## IIFE

In older JavaScript code, you probably saw an expression like this:

```javascript
(function () {
      var aNumber = 1;
      console.log(aNumber);
})();
```

this was a common Design Pattern used in JavaScript, known as **Immediately Invoked Function Expression** (or **IIFE**), and was mainly used to overcome problems related to the declaration of variables with the `var` keyword. In fact, variables declared with that keyword have global or function scope, therefore multiple global variable's declarations can pollute the script.

Declaring a function in this way, we are actually limiting the scope of the variables inside the function's declaration, and we are immediately calling that function. In fact, wrapping a function's declaration inside brackets, converts that function's declarion in an expression, and by opening and closing brackets at the end of the expression, we are actually invoke the function inside the expression.

This pattern is no more used in JavaScript starting from the releasing of ES6, that introduces `let` and `const` keywords with block scope.
