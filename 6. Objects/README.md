# Objects

In JavaScript, Data Types are splitted in two groups, the first consists in _Primitive Types_ and the latter in _Reference Values_ or _Objects_. Typically, Objects are created in two ways, using the Object() constructor or the _literal syntax_ below:

```javascript
const person = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      hobbies: ['football', 'soccer'],
};
```

As we can see, we created an object named _person_ containing different properties identified by a key. However, taking a closer look on the example we can see that the object is just composed of Primitive Types, therefore, we could give a first recursive definition of Objects as <ins>container of Primitive Types and other Objects</ins>.

## Key values and access

As we mentioned in the previous chapter, objects are just a set of key-value pairs, where the key, differently from the _Map_ Data Structure, is symply a String.

However, as we can see from the previous example, it seems that keys are not Strings but variables. In fact, JavaScript coerces the keys to be Strings, this means that we can store keys like "first name" or "last name" but it wont happen, moreover if we would like to store keys with this notation, we must put the key in quotes:

```javascript
const person = {
      'first-name': 'John',
      'last name': 'Doe',
      age: 30,
      hobbies: ['football', 'soccer'],
};
```

However, doing this we can no more access keys in the objects with the dot notation, but it is mandatory to access the value of the key, using the square brackets:

```javascript
const personFirstName = person['first-name'];
const personLastName = person['last name'];
```

## Dynamic Properties Access and _delete_ operator

Up to this moment, we have seen objects as immutable elements, like something that you describe in terms of properties and will be immutable. However, objects are mutable and you can assign properties in different ways, let's see this basic example:

```javascript
const person = {
      firstName: 'John',
};

person.lastName = 'Doe';
```

with `person.lastName = 'Doe'` we are insert into the object a new property _'lastName'_ and initializing it with the value _'Doe'_. This is a dynamic behaviour of course, but is not enough dynamic for us.

Let's consider this scenario, we would like to add a new property to an object, based on the user's input, will be somethig like this correct?

```javascript
const userVariable = 'lastName';

const person = {
      firstName: 'John',
};

person.userVariable = 'Doe';
```

nope, since `person.userVariable` will cause an assignement to the object `person` of the property `userVariable`. How can we solve this problems? Well, we can use a special JavaScript's syntax, consisting in put the name of the dynamic property between square brackets in this way:

```javascript
const userVariable = 'lastName';

const person = {
      [userVariable]: 'John',
};
```

by doing this, JavaScript will understand the the content of the variable `userVariable` will be the name of that property with value `John`.

Now that we understand how to add a static and a dynamic property to the objects, how can we delete properties from the object? Probably you saw the keyword `delete`, that removes property from the object like this:

```javascript
const userVariable = 'lastName';

const person = {
      [userVariable]: 'John',
};

delete person.lastName;
```

Unfortunately, assigning the values `undefined` or `null` to the property of the object will not cause the propertie's elimination, but will just assign these values to it.

## Object's assignment

Since Objects in JavaScript are referenced types, the normal assignment operator will cause side effects on both variables. Luckily, there are two ways to assign an object to another object copying the content of the first into the second:

```javascript
const person = {
      firstName: 'John',
};

const anotherPerson = { ...person };
const yetAnotherPerson = Object.assign({}, person);
```

In the first statement, we are using the **spread operator** to extract all the key-value pairs of the object by adding them into a second object. Moreover, the `Object` class contains the method `assign` to perform assignment between objects without side-effects.

## What is _this_?

Considering that we are talking about Objects, it's time to introduce `this`. From the moment that this keyword is widely used in many and difference concepts in JavaScript, we will procede gradually, starting from what `this` means for an Object.

We could give a informal description of this keyword as, _the context of the caller of a function_. The following example will explain better this concept:

```javascript
const person = {
      firstName: 'John',
      lastName: 'Doe',
      getCredentials: function () {
            return `${this.firstName} ${this.lastName}`;
      },
};
```

Given that Objects can store any value, it is also possible for them to store a function whose name is specified by the Object's key. However, if we are going to implement a function inside an Object, we need somethings that ables us to access the Object's other properties, and this is the aim of the keyword `this`. However, we must be careful and specify that `this` will not refer to the Object `person`, but to the entity that will call the function.

Continuing with another example, we could use the Object and the function in this way:

```javascript
function showObjectCredentials(person) {
      const credentials = person.getCredentials();
}
```

In this simple example, `this` will refers to the context of `person`, thus the function's caller.

### Is it everything okay?

Up to this point, it seems that everything is okay ... or not? Back to the Object's definition, there is another way to implement functions inside an Object:

```javascript
const person = {
      firstName: 'John',
      lastName: 'Doe',
      getCredentials() {
            return `${this.firstName} ${this.lastName}`;
      },
};
```

so what is the difference between the previous method and this new one? Well, if we try to execute the function in the same way, destructuring the Object and then extracting the function's implementation, we will encounter an error:

```javascript
function showObjectCredentials(person) {
      const { getCredentials } = person;
      const credentials = getCredentials(); // Cannot read property firstName of undefined ...
}
```

the reason is that, as we mentioned before, `this` refers to the entity that is calling the function, and now the Object `person` is not actually calling it, however, if we would try to print the value of `this` inside the function, the global object `window` will be printed. How can we resolve this problem? We can use the `bind` method defined in the `Function` Object.

```javascript
function showObjectCredentials(person) {
      let { getCredentials } = person;
      getCredentials = getCredentials.bind(person);
      const credentials = getCredentials();
}
```

In fact, the first argument of the method `bind` is the value that we want to assign to the `getCredentials` function.
