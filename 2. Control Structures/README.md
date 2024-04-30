# Control Structures

In this section we will going to cover the topic of control structures. This are language specific commands that allow us to modify the normal program's workflow. I won't explain the "classic" control structures that are already implemented in language such as Java, meanwhile, I will focus on JavaScript's specific controls' structures.

## Falsy & Truthy

Before starting to explain the JavaScript's native control strucutres, we have to talk about the concept of _truthy_ and _falsy_ of an expression. In the commonest programming languages, we know that the guard expression (e.g. the condition of an if-then-else) of a control structure can be true or false, but in JavaScript it can also be truthy of falsy, let's consider this example:

```javascript
const name = 'John';
if (name) {
      console.log(`My name is ${name}`);
}
```

The variable `name` is interpreted by JavaScript as `true`, how is it possible? Well, behind the scenes, JavaScript applies the concept of _coercion_, that is considering a variable as a boolean even if it is not actually a boolean value. Therefore, JavaScript converts a generic value in a boolean without actually converting it. To convert a generic value in its boolean counterpart, JavaScript applies these rules:

| expression                 | booolean value |
| -------------------------- | -------------- |
| 0                          | _false_        |
| any other number           | _true_         |
| ""                         | _false_        |
| any other non-empty string | _true_         |
| objects and arrays         | _true_         |
| null, undefined, NaN       | _false_        |

Thus, hen a variable with one of these values is required to be evaluated as a boolean value, JavaScript applies one of these rules, without actually converting it. This means that, 0 is a falsy value, while any other number greater than 0 is truthy.

## Boolean Coercion

Keeping in mind the meaning of truthy and falsy, how can we convert a normal value in its corresponding boolean conterpart? Let's considering this example:

```javascript
const isValidName = !'John'; // false
```

since the string John is a truthy value, its negation returns false, and this is quite clear. However, using again the negation, we can convert the initial truthy value in the corresponding boolean value:

```javascript
const isValidName = !!'John'; // true
```

Therefore, the double negation operator `!!` corresponds to the coercion operator in JavaScript, and we use to our advantage this operator by checking the truthy or falsy of a generic value.

## Assignment via AND and OR

An interesting fact about the `&&` and `||` operators, is that they do not actually convert an expression in a boolean value as it happens in the commonest programming language. Instead, _they returns the last and the first value that is truthy in an expression_. Let's consider this example:

```javascript
const name = inputName || 'John'; // "John"
const validName = loggedIn && 'John'; // false
```

As I mentioned above, the || operator returns the first value in the expression that is truthy, therefore, if `inputName` is a truthy value it will be assigned to the variable `name`, otherwise `'John'` will be assigned. On the other hand, the `&&` operator returns the last value that is truthy in an expression, thus, if the user is logged in, the returned value will be  `'John'`, which is the last value will be returned, otherwise `false` (that is the value of the _loggedIn_ variable) will be assigned to `validName`.

## Loops

I won't describe what a loop is, and the commones loop control structures like _for_ or _while_, since I assume that you ecounter at least one of them in another programming language. However, JavaScript implements some native loops which are the _for-of_ and the _for-in_ loop, therefore I will focus on them.

### For-of

Most of the time, we use loops for arrays, like in the following example:

```javascript
const array = [1, 2, 3];
for (let i = 0; i < array.length; i++) {
      console.log(array[i]);
}
```

however, if we are interested only in the current element of the array, do we need a variable like `i`? Of course the answer is not, and for this reason we can use the _for-of_ loop to iterate over the elements of the array, in this way:

```javascript
const array = [1, 2, 3];
for (const element of array) {
      console.log(element);
}
```

it is not mandatory to declare the iteration variable `element` as `const`, but is recommended since this variable should be read-only.

### For-in

While iterating over a data structure like array is quite simple and natural as operatio, what about objects? Keeping into account that objects in JavaScript are key-value pairs, it should be easy to iterate over elements of them. The `Object` class in JavaScript offers us a set of useful function for iteration, let's take a look on this example:

```javascript
const object = {
      a: 1,
      b: 2,
};
const keys = Object.keys(array);

for (const key of keys) {
      console.log(object[key]);
}
```

is it quite easy right? Now, since this operation is quite common, JavaScript implements a variation of the standard for loop, like the _for-of_ loop, but working only on objects, the _for-in_ loop:

```javascript
const object = {
      a: 1,
      b: 2,
};

for (const key in object) {
      console.log(array[key]);
}
```

in this way, JavaScript extract automatically the ket for each element of the object, and iterates over them, allowing us to access the value.
