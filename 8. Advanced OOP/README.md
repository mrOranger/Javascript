# Advanced Concepts for OOP

In this chapter we will go depper in understanding how OOP is implemented in JavaScript. Moreover, we will take a look at an alternative approach used in JavaScript to declare classes, that is by using function. Then, we will examine the concept of _Prototype_ of classes, if you have experience with JavaScript of course you noticed the field **[[Prototype]]** in any object printed in the console.

## Constructor Functions

In the previous versions of JavaScript, before the ES6, there wasn't the concept of class. Moreover, is was possible to declare a class but without the keywork **class** and the **construct** method. The alternative approach was to declare a special function known as **Constructor Function**, whose name starts with an uppercase letter (this is not mandatory but just a convention) and that can be created using the **new** keyword. For example, if we would like to create a `Person` with `firstName`, `lastName` and `age` fields, we would declare something like this:

```javascript
function Person(firstName, lastName, age) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;

      this.greet = function greet() {
            return `Hello ${this.firstName} ${this.lastName}, you are ${this.age} years old.`;
      };
}
```

### Constructor Function instantiation

Creating an object using the Constructor Function requires to mix up concepts both from functions and classes. If we would to instantiate a new object using the Costructor Function `Person` we have to do something like this:

```javascript
const person = new Person();
```

However, why should we instantiate a new `Person` using the **new** keyword if we are declaring it using a function? The explaination to this question stands in what happens behind the scenes when we use **new**, in fact, we could say that the keyword adds some code to the function, like this:

```javascript
function Person(firstName, lastName, age) {
      this = {}; // Creates the function's context.

      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;

      this.greet = function greet() {
            return `Hello ${this.firstName} ${this.lastName}, you are ${this.age} years old.`;
      };

      return this; // Returns the function's itself.
}
```

Therefore, <u>instantiating an object using the Constructor Function is no more that returning the function's context</u> whose internal state has been modified based on the function's parameters.

However, declaring functions inside a Costructor Function respect to declaring them inside a class is a little bit different, and requires to know another concept of JavaScript which is the **Prototype**.

## Prototypes

To understand the concept of **Prototype** we have to make a step in how classes are managed in Java. Every Java's classes are child of the superclass `Object`, this means that some methods as `toString()` are always defined in every classes since the former is implemented in the `Object` class, therefore Java makes a <u>chain of calls to every classes in the hierarchy to get the implementation of the `toString()` method</u>.

In a certain sense, this concept is conected to JavaScript Prototype, in fact, <u>Prototype is functionality that JavaScript uses to connect objects' functionalities starting from the current Object and reaching the main `Object` class</u>. We can say that is a form of inheritance between objects, but goes over the classic inheritance of OOP. Let's consider the `Person` class created through the Constructor Function, if we examinate the instance of this class on the console, we can notice the following fields:

```
Person
      firstName : 'Mario'
      lastName : 'Rossi'
      age : 40
      greet : f greet()
      [[Prototype]]: Object
```

there is a property called `[[Prototype]]` that refers to the next object in the inheritance chain, in this case the `Object` class that is the base class for every JavaScript class. Unsurprisingly, if we invoke the `toString()` method on the `person` object, that function is anctually not undefined, and will returns a string like this `[object Object]`, in fact, inside the `[[Prototype]]` field there is the method `toString()`.

However, if we print the details of the `Person` class, we will see other properties:

```
Person
      arguments: null
      caller: null
      length: 2
      name : 'Person'
      prototype:
            greet: f greet()
            constructor: Person (firstName, lastName, age)
            [[Prototype]] : Object
      [[Prototype]] : f
```

While `[[Prototype]]` defined the next node in the object's chain, the `prototype` object is used to create the node's values that would be inherited by the `[[Prototype]]`. In fact, inside that field there are the functions declared in the `Person` class, that are `greet` and `constructor` (the default object's constructor).

Therefore, we can create a class declaring its properties and methods using the `prototype` field, thus these elements will be available from all the objects sharing the same `[[Prototype]]`:

```javascript
function Person(firstName, lastName, age) {
      Person.prototype.firstName = firstName;
      Person.prototype.lastName = lastName;
      Person.prototype.age = age;

      Person.prototype.greet = function greet() {
            return `Hello ${this.firstName} ${this.lastName} you are ${this.age} years old.`;
      };
}
```

## Prototype and performances

Up to this point, there is an important difference in declaring a class in the "classic" way, while using the Constructor Function, and the difference stands in <u>performances' optimization that JavaScript makes automatically</u>. In fact, declaring a method in a class defined in the classic way, JavaScript will automatically add that method in the classes' prototype, while the same thing is not make in Costructor Function. Therefore, if we declare a class with a method, in the following way:

```javascript
class Person {
      constructor(firstName, lastName, age) {
            this.firstName = firstName;
            this.lastName = lastName;
            tis.age = age;
      }

      greet() {
            return `Hello ${this.firstName} ${this.lastName} you are ${this.age} years old.`;
      }
}
```

the object created from the following class, will contain the method `greet()` inside its own prototype, as we can see inspecting the object using the `console.dir` method. While declaring the same class using the Costructor Function:

```javascript
function Person(firstName, lastName, age) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;

      this.greet = function greet() {
            return `Hello ${this.firstName} ${this.lastName} you are ${this.age} years old.`;
      };
}
```

won't add the method `greet()` inside the object's prototype. Why do we care about this? <u>Because declaring a method inside the object's prototype will indicate to JavaScript to resuse that method also for other objects that share it, reducing the memory usage in terms of space</u>.

However, the only way through which we can indicate implicitly to JavaScript to add that method inside the object's prototype is by using the syntax that we saw previously, while declaring a method using an arrow function or a classes' property, won't able JavaScript to optimize the code.
