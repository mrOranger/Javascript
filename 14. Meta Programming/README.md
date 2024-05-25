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

Another common use of Symbols is in the `toString` function, in fact, the Symbol `Symbol.toStringTag` is used when we invoke the `toString` method over an object, more specifically it appends the second part of the default string, that is `Object` in `[object Object]` given by the default implementation of the `toString` function. If we would like to override that part of the `toString` method, we have to define a property of the object/class whose name is `Symbol.toStringTag`, just like this:

```javascript
class CustomToString {
      get [Symbol.toStringTag]() {
            return 'CustomToString';
      }
}

const customToStringObject = {
      [Symbol.toStringTag]: 'CustomToStringObject',
};

const customToString = new CustomToString();
console.log(customToString.toString()); // [object CustomToString]
console.log(customToStringObject.toString()); // [object CusCustomToStringObject]
```

## Iterators and Generators

Before dive into the chapter's main concepts, you have to keep in mind how the **Iterator Design Pattern** works and why shall we keep it in mind. Not all Data Strcutures can be iterated in the same way as Linear Data Structures, that is beacause they are not linear. On the other hand, we would like to traverse them in the same way as the do with all Data Strcutures, for example using a **for each** loop, that is why we need the Iterator Design Pattern, in fact, this is a behvioural Design Pattern that encapsulate the logic used to traverse the Data Strucutre, inside an interface and then a concrete class (more information about this Design Pattern can be found [here](https://en.wikipedia.org/wiki/Iterator_pattern)).

There is a commong protocol used in JavaScript to create iterable objects, that is the **Iterator Protocol**. The Itearator Protocol consists in implementing a `next()` method that returns an object with two properties:

- The next value of the sequence within the `next` property.
- A boolean flag that indicates whether the iteration process is completed or not, in the `done` field.

For instance, if we would like to implement this protocol in a custom class named `IterableClass`, we will produce something like this:

```javascript
class IterableClass {
      constructor(elements) {
            this.elements = elements;
            this.currentIteration = 0;
      }

      next() {
            if (this.currentIteration < this.elements.length - 1) {
                  return { value: this.elements[this.currentIteration++], done: false };
            }
            return { value: this.elements[this.currentIteration], done: true };
      }
}
```

### Generator Functions

While an iterator is a powerful tool to iterate over the elements of a collection, they still require to maintain the interal state of the iteration process. On the other hand, there is an alternative approach to iterator function that is the **Generator Function**. From an abstract point of view, a Generator Function is function implementing an iterative algorithm whose execution is not continous.

A Generator Function is indicated by the special syntax `function*`, and the special keywork `yield`. The `yield` keyword tells to JavaScript: _I will stop the exection here, and the next time that you require a value I will start from here up to the next `yield` point_. Let's consider the following example, where we are trying to implement a `Company` class and we would like to iterate over all the companie's employees:

```javascript
function Company(employees) {
      Company.prototype.iterator = function* () {
            for (let i = 0; i < employees.length; i++) {
                  yield employees[i];
            }
      };
}

const company = new Company(['Mario', 'Maria', 'Federico', 'Federica']);
const companyIterator = company.iterator();

for (const employee of companyIterator) {
      console.log(employee);
}

console.log(companyIterator); // [object Generator]
```

Notice that we implemented a function named `iterator`, declared as a **Generator Function**, and used that function (whose result is assigned to a variable) to iterate over all the companies' employee, morever, to have a confirmation about the fact that `iterator` is a Generator Function, we printed out the content of the variable `companyIterator`. Therefore, in this case the `yield` keyword acts like returning an array, every time we use it inside a loop.

I hope that this example is quite clear, however, we can make some improvements. We would like to iterate the company's employees without saving the generator function inside a variable. In this scenario, the Symbol `Symbol.iterator` helps us:

```javascript
function Company(employees) {
      Company.prototype[Symbol.iterator] = function* () {
            for (let i = 0; i < employees.length; i++) {
                  yield employees[i];
            }
      };
}

const company = new Company(['Mario', 'Maria', 'Federico', 'Federica']);

for (const employee of company) {
      console.log(employee);
}
```

Declaring a function whose name is `Symbol.iterator` indicates to JavaScript to looking for that function when we would to iterate over the object.

## Reflect API

The `Reflect` namespace contains a set of methods to manipulate object. There are many methods inside this namespace, however, I would like to focus only on few of these, like:

- `Reflect.defineProperty` that creates a new property inside an object, having the value used as parameter.
- `Reflect.deleteProperty` deletes a property from the object if it is actually inside it.
- Finally, `Reflect.setPrototypeOf` assigns the `Prototype` value to the object.

## Proxy API

A `Proxy` is an object that ables to intercept an object's basic operation, like getting, settings or deleting properties. In fact, the `Proxy` constructor takes two parameters, the object itself and an object whose properties are the operations we would like to listen, handled by function known as **traps**, For instance, if we would like return a propertie's value if it is not undefined, we can create a Proxy object over out object just like this way:

```javascript
const object = {
      firstName: 'Mario',
      lastName: 'Rossi',
};

const proxy = new Proxy(object, {
      get: function (object, property, receiver) {
            if (object[property]) {
                  return object[property];
            }
            throw new Error(`Cannot get property ${property} since it is undefined`);
      },
});

console.log(proxy.firstName, proxy.lastName, proxy['undefined']); // Uncaught exception
```

Of course, we can notice that the `Proxy` is a powerful way to create objects with private fields, and checks whenever we can access or update a field. However, if we declare an object and its Proxy in this way, it does not make sense, because we can still access object's properties without checking if the field is private or not, therefore, we have to write again out example like in this way:

```javascript
const proxy = new Proxy(
      {
            firstName: 'Mario',
            lastName: 'Rossi',
            secretKey: 'AB123CD',
      },
      {
            get: function (object, property, receiver) {
                  if (property != 'secretKey') {
                        if (object[property]) {
                              return object[property];
                        }
                        throw new Error(`Cannot get property ${property} because is undefined`);
                  }
                  throw new Error(`Cannot get property ${property}, because is private!`);
            },
      },
);

console.log(proxy.firstName, proxy.lastName);
console.log(proxy.secretKey); // Cannot get property secretKey ... is private
console.log(proxy.invalid); // Cannot get property ... is undefined
```

There are many trap functions that can be used inside a Proxy object, some of them are:

- `set(object, key, newValue)` to watch writing operations on an object.
- `deleteProperty(object, key)` to watch deleting properties' operations.
