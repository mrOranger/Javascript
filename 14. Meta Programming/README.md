# Meta Programming

The concepts that we will learn in this section you won't proably use in your daily developer life. On the other hand, these fetures are useful for libraries' developer, in fact, if we consider the defintion of **Meta Programming** described by Wikipedia, it will be something like this:

> **Meta Programming** is a programming technique in which computer's programs have the abilty to treat other programs like their input data. This means that a program can be designed to read, generate, analyze or transform other programs, and eaven modify itself while running.

## Symbols

The last primitive value that up to now we ignore is `symbol`, that is a unique value that cannot be replicated in the program. To create a new symbol we can use the `Symbol` object, whose contructor returns a new `symbol`.

To create a new symbol, we can just call the `Symbol()` constructor without the `new` keyword, giving it a name that can be used to identify the new symbol:

```javascript
const symbol = Symbol('name');
console.log(symbol); // Symbol(name)
```

As we mentioned before, if we try to compare two symbols with the same name, the won't be the same `symbol`, they are always different even if they are identified by the same key. Thus, one of the most useful usage that we can do with a symbol is create a unique value in an object, that cannot be written or accessed in any part of the program:

```javascript
const object = {
      firstName: 'Mario',
      [Symbol('secretkey')]: 'Programmer',
};

console.log(object[Symbol('secretkey')]); // undefined
```

of course, we have to wrap the expression `Symbol('secretkey')` in square brackets indicating to JavaScript that the key will be the resulting value of the expression.

To make a Symbol available throught all the lifetime of a program we can use the `Symbol.for()` and `Symbol.keyFor()` funtions. While `Symbol.for()` takes a string and returns a Symbol, `Symbol.keyFor()` takes a Symbol and returns the key corresponding to it:

```javascript
Symbol.keyFor(Symbol.for('string')) == 'string'; // true
```

### Well-known Symbols

There are some Symbols used in JavaScript, and their purpose encode some language's built in operations, for example, if there is a static function inside a class, whose name is `Symbol.hasInstance` that function will encode the behaviour of the `instanceof` operator:

```javascript
class CustomClass {
      static [Symbol.hasInstance](instance) {
            console.log(instance);
            return false;
      }
}

const custom = new CustomClass();
console.log('a' instanceof CustomClass); // 'a', false
console.log(1 instanceof CustomClass); // 1, false
```

## Iterators

## Reflect API

## Proxy API
