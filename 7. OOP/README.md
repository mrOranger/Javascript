# OOP

**Object Oriented Programming** is a _programming paradigm_ widely used in many programming languages, such as _Java_ and _C++_. This programming paradigm is based on three theoretical concepts:

- **Encapsulation**. The object's internal state must not be accessible to other objects, moreover, only the object's owner can read and update its internal state. This is achieved by separating properties and methods inside the object, and assigning them a _visibility_, thus an accessing's rule to other entities. In most of programming languages, the Encapsulation is achieved using the concept of **Class**.

- **Inheritance**. Sometimes objects share common properties, think about a _Student_ and a _Professor_, both of them have a first name and a last name, moreover we could say that they are both a _Person_. Therefore, the Inheritance is the ability to creating objects (we shall call them _children_), starting from other objects (called _parents_).

- Last but not least, **Polymorphism** is the ability to use an object instead of another, if both of them share a common interface. Considering three classes A, B and C, where B and C are children of the class A, and sharing the method _doSomething()_, by declaring a variable of type A, we sould be able to instantiate this variable both as A, B or C, depending on our choice.

## Class vs Object

While Encapsulation can be achieved by using the concept of **class**, in JavaScript there are some considerations to make between classes and objects. If we take a look on the definiton of JavaScript's classes in [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), we will understand that there is no so much difference between classes and objects.

However, why shall we use classes and objects? An intuitive answer could be that classes are usefull when we have to create different objects many times, sharing common properties. Let's take a look on this example:

```javascript
const andy = {
    firstName : 'Andy'
    lastName : 'Bernard',
    age : 38,
    employee : 'sale'
};

const dwight = {
    firstName : 'Dwight K.',
    lastName : 'Schrute',
    age : 36,
    employee : 'sale'
};
```

is it tedious to define in this way a person all the time, by using classes we can simply the work:

```javascript
class Employee {
      constructor(firstName, lastName, age, employee) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.employee = employee;
      }
}

const andy = new Employee('Andy', 'Bernard', 38, 'sale');
const dwight = new Employee('Dwight K.', 'Schrute', 36, 'sale');
```

Therefore, once we defined our template of the Employee using a class, we can simply instantiate a new employee based on this template. Moreover, classes have some additional features respect to objects, like _static methods/fields_, _fields and property visibility_, and _inheritance_.

## Attributes & Methods

Unlike other programming languages, is not necessary to declare an attrbute at the top of a class, since it is sufficent to declare them in the class' constructor or in other methods as we saw previously. On the other hand, we can declare attributes at the top of the class' definition (that will be called **fields**), however, there is no difference between the two delaration's styles.

Declaring **methods** is an easy task in JavaScript, it is sufficient to declare a function without any specifc keyword but only using the name of the function and the formal parameters:

```javascript
class Person {
      constructor(firstName, lastName, age) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
      }

      sayHi() {
            return `Hi from ${this.firstName} ${this.lastName}`;
      }
}
```

we can also declare **arrow functions** inside a class, remembering that these type of function does not contains any reference to the classes' context.

### Private declaration

From **ES6** JavaScript introduced _private declaration_ both for properties and methods. Since there is no reserved keyword like in other languages, it is sufficient to prepend the **#** symbol, declaring the private properties as fields at the classes' beginning. Therefore, we could rewrite the previous exmaple as:

```javascript
class Person {
      #firstname;
      #lastname;
      #age;

      constructor(firstName, lastName, age) {
            this.#firstName = firstName;
            this.#lastName = lastName;
            this.#age = age;
      }

      sayHi() {
            return `Hi from ${this.#firstName} ${this.#lastName}`;
      }
}
```

There is also a convention to write private properties in classes prepending the underscore, but this does not make classes' attributes actually private as the previous example, it is just a convention.
