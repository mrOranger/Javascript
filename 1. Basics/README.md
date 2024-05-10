# Basics

As mentioned previously, JavaScript is a _dynamic_ _weekly typed_ programming language, meaning that variables do not have a specific type, and you can change the type of a variable's value at runtime.

There are some unwritten conventions in writing JavaScript programs. Firt of all, variable and function's names should use the _camelCase_ notation, this is not mandatory of course but is recommended. For function and blocks of code, it is recommended to use the _KNF_ (Kernel Normal Form) convention, putting curly brackets in the same line of the starting block's definition, and the body indented of one, like in the following example:

```javascript
while (true) {
      doSomething();
}
```

this convention is the counterpart of the _K&R_ (Kernighan & Ritchie) commonly used in C, C++ and C# code.

## Data Types

JavaScript has a small set of Data Types, composed by the following elements:

- _Number_ identifies numerical values, both with or without decimal part.

- There is not a Data Type for represent single characters like in Java, but there is only one Data Type which is _String_.

- _Boolean_ is used for boolean values, of course.

- _Object_ is the most used Data Type, we can assume that everything except the previous Data Types, is an Object. On the other hand, object represets also elements with key-value pairs.

- Finally, the last but not least, _Array_ represents a generic collection of elements. However, soon we will see that Array are no more tha objects.

### Numbers

Every number is JavaScript is a _floating point number_ and is stored using double precision representation, thus with 64 bits. Inside the `Number` class there are some useful properties to see the maximum and minium numbers that can be represented in JavaScript, for example: `Number.MIN_SAFE_INTEGER` is the minimun integer value that can be used. On the other hand, if you would like to know the minumum and maximum numbers (not integers) properties `Number.MIN_VALUE` and `Number.MAX_VALUE` indicate them.

There is an alternative type to `Number` in JavaScript, that allows us to overcome the size limitations of 64-bit numbers, and is `BigInt`. To declare a number as a `BigInt` is necessary to postfix `n` to the number, like this `123458n`. From an internal point of view, `BigInt` numbers are actually stored as strings, to overcome the mathematical limitation of their double precision representation. However, is not allowed to mix `BigInt` numbers with normal numbers, classic number's mathemtical operations are allowed only between `BigInt` and `BigInt`.

### Strings

There are three different ways to declare a string in JavaScript, by using single quotes, double quotes or backticks. On the other hand, the last way is the most flexible to create strings with variable parameters that must be concatenated in the former.

Working with strings we would like to look for specific patterns in a string, and then **Regular Expression** helps us in this job. There are two different ways to define a Regular Expression:

- By using the `new` keyword, creating a new Regular Expression object `new RegExp()`.

- Using the double forward slashes `//`, and define our pattern inside them.

Let's see an example of how Regular Expression works, starting with the simple task of looking for the specific pattern `hello` inside any string:

```javascript
const regExp = /hello/;
regExp.test('hello'); // true
regExp.test('hello world!'); // true
regExp.test('hi, and Hello!'); // false
```

However, we are acntually looking for a string that matches exactly the word `hello`. On the other hand, a string like `Hello` won't pass the matching test, therefore we need to modify our pattern to consider also uppercase characters:

```javascript
const regExp = /(h|H)ello/;
regExp.test('hello'); // true
regExp.test('Hello world!'); // true
regExp.test('hi, and Hello!'); // true
```

In fact, by using the pipe operator `|` we are indicating that a specific character of our pattern can assume different configurations. However, if we do not care about a character and we want indicate in the regular expression that a specific character can assume any value, we can use the `.` wildcard.

```javascript
const regExp = /.ello/;
regExp.test('hello'); // true
regExp.test('Hello world!'); // true
regExp.test('hi, and ello!'); // false
regExp.test('hi, and Pello!'); // true
```

Of course, there are many other wildcards used in regular expression to create them, and since this is a complex theme, you can find details [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions).

### + Operator

There is a long list of operators in JavaScript, however I think that most of your have seen at least one time the following code as meme for JavaScript:

```javascript
3 + '3' = '33'
```

... what's wrong with JavaScript? The answer is nothing! Indeed, the `+` operator is used both for string's concation and sum of numbers, but in this case is used only for string concatenation, in a sort of precedent order. Therefore, the number 3 is treated as a string instead of a number. Let's take a look on another common piece of code:

```javascript
('b' + 'a' + +'a' + 'a').toLowerCase(); // banana
```

how is it possible that `'b' + 'a' + + 'a' + 'a'` returns `banana`? If you remove `toLowerCase` this answer is quite easy to understand, since the output would be `baNaNa`, in fact `+ + 'a'` is interpreted by JavaScript as `+ ( + 'a')` (concat the previous string with the result of + 'a', which is a casting operator from string to number), however since the casting operator cannot convert the character 'a' to a number, return the 'NaN' string (Not a Number).

## Functions

Functions in JavaScript are defined using the `function` keyword, but there is also another way of defining functions that we will see later. For example, for define a function that takes two parameters and returns the sum of them, we can write:

```javascript
function sum(a, b) {
      return a + b;
}
```

### The unimportance of the code

Howerver, it is important to know that functions unlike variables or other elements in JavaScript, did not follow the same logical evaluation rule from top to bottom. That is, we can also declare a function after that it is used:

```javascript
console.log(sum(1, 2));

function sum(a, b) {
      return a + b;
}
```

this is completly right in JavaScript, since there is a preliminary step in script execution, consisting in evaluating the script and then executing it. Therefore, a function can be declared after its call, since the evaluation step ensures that the function is defined before executing it.

### Scope and Shadowing

If you attempt a course about programming language theory, you should know that each block of code has an associated scope for variables' evaluation. Nevertheless, in JavaScript this situation could be quite common:

```javascript
let myVariable = 'someVariableValue';

function saySomething() {
      let myVariable = 'anotherVariableValue';
      console.log(myVariable);
}
```

not surprisingly, the _console.log_ instruction will print the value _someVariableValue_. This event is known as _shadowing_, indicating that the value of a variables has been obscured by another with the same name, since the first varible has a global scope, more important than the second variable which has a local scope inside the function's block.

## Array

There is not any other Data Structure already implemented in JavaScript other than _Array_. An array is just a collection of some elements, also of different types, and exposing a set of common operations.

## Objects

Everything in JavaScript is an object, but from a certain point of view, we can define an object as a collection of key-value pairs. Like in array, there is not an exact type for keys and values, and not surprisingly, we can also store function or other objects inside an object:

```javascript
let object = {
      firstKey: 'firstKey',
      secondKey: {
            anotherKey: 1,
      },
};
```

we can access to object's properties using a dot, and thankfully there is a language class named Object, that allows us to manipulate objects.

## Comments and JsDoc

Up to this point, if you came from a stricly typed language like Java, you should probably be afraid of the dynamic nature of JavaScript. Thankfully, there is an alternatively to use variables with generic types, and is by using _JsDoc_. JsDoc is no more than a standard for describing functions and other elements in JavaScript, by using comments:

```javascript
/**
 * Takes two elements and returns the sum of them.
 *
 * @param {Number} a - first element
 * @param {Number} b - second element
 * @return {Number} the sum of the two elements.
 */
function sum(a, b) {
      return a + b;
}
```

there is a wide variety of comments to use in JsDoc and described in the documentation, but the most important result is that now, inside the function's body the variables are treated with their correct type.
