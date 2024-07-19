# Object Oriented Programming

Even thought in JavaScript OOP is a well known concept, in TypeScript it is improved in such a way as introducing concepts like: propertie's and method's visibility, inheritance and generic programming. In this section, we will not have a look on the basic's OOP concepts, moreover, we will see how these are implemented in TypeScript and how they differ respect to JavaScript.

## Classe's basis concepts and visibility operators

A **Class** is nothing more than a blueprint for an **Object**, moreover, in TypeScript we can specify the types of methods and properties, and also use **visibility operators** in a way that control the access to them. Let's take a look at the following example in JavaScript, where we would like to implement a `Person` class:

```javascript
class Person {
      #_firstName;
      #_lastName;

      constructor(firstName, lastName) {
            this.#_firstName = firstName;
            this.#_lastName = lastName;
      }

      get firstName() {
            return this.#_firstName;
      }

      get lastName() {
            return this.#_lastName;
      }
}
```

the same class, can be implemented in TypeScript in the following way:

```typescript
class Person {
      private _firstName: string;
      private _lastName: string;

      public constructor(firstName: string, lastName: string) {
            this._firstName = firstName;
            this._lastName = lastName;
      }

      public get firstName() {
            return this._firstName;
      }

      public get lastName() {
            return this._lastName;
      }
}
```

it is much cleaver right? We can use `private` and `public` keywords to indicate who can access to the classe's properties (if we ommit the visibility modifier, `public` is the default one).

Moreover, there is a shortcut method introduced in latest TypeScript version, and which ables us to define the properties inside the constructor's parameters, in such a way:

```typescript
class Person {
      public constructor(private _firstName: string, private _lastName: string) {}

      public get firstName() {
            return this._firstName;
      }

      public get lastName() {
            return this._lastName;
      }
}
```

Respect to JavaScript we can also define **constant** properties, simply using the `readonly` modifier before the propertie's definition, like in this way:

```typescript
class Person {
      public constructor(
            private readonly _firstName: string, 
            private readonly _lastName: string
      ) {}

      public get firstName() {
            return this._firstName;
      }

      public get lastName() {
            return this._lastName;
      }
}
```

## Inheritance

Like in JavaScript, also in TypeScript we can inherit classes' beheviours using the `extends` keyword, however, inherit's a classes' behaviour means that we have to call the parent's class constructor using the `super` method.

Let's take a look at this example:

```typescript
class Person {
      constructor(
            private readonly _firstName: string, 
            private readonly _lastName: string
      ) {}

      get firstName() {
            return this._firstName;
      }

      get lastName() {
            return this._lastName;
      }
}

class Employee extends Person {
      constructor(
            private _firstName: string, 
            private _lastName: string, 
            private _department: string
      ) {
            super(_firstName, _lastName);
      }

      get department() {
            return _department;
      }
}
```

by extending the `Person` class, we are inheriting the methods and properties of the class , but we need to call the parent's constructor using the `super()` method, passing the right parameters to the constructor.

Up to this point, we can instantiate both the `Person` class and the `Employee` class, however, we would like to instantiate only the concrete class `Employee`, because in our example all the `Person` are `Employee`. In TypeScript, and in any other programming language that fully support OOP, we can use the `abstract` modifier, indicating that the class cannot be instantiated, but it must be inherited by another class if we would like to create a similar object. Considering the previous example, we have to update it in the following way:

```typescript
abstract class Person {
      constructor(private readonly _firstName: string, private readonly _lastName: string) {}

      public abstract getFullName(): string;
}

class Employee extends Person {
      constructor(private _firstName: string, private _lastName: string, private _department: string) {
            super(_firstName, _lastName);
      }

      public getFullName(): string {
            return `${this.firstName} ${this.lastName} - ${this.age}`;
      }
}
```

## Interfaces

Interfaces in TypeScript are a sort of blueprint for objects, they describe how an object has to be composed in terms of their properties and methods. Let's take a look at this example, we would like to describe the object of type `Person` as a set of two properties, `firstName` and `lastName` both as strings.

```typescript
interface Person {
      firstName: string;
      lastName: string;
}
```

now, we can declare variables having type `Person` like in normal variables. On the other hand, we can also use interfaces to declare methods that object must have, like in the following example:

```typescript
interface Person {
      firstName: string;
      lastName: string;
      sayHello(): void;
}
```

Up to this point, what is the difference between `interface` and `type` as we saw earlier? Well, the key difference is that interfaces can also be used as **contracts** for classes. According to the last statement, we can use the keywork `implements` to indicate that a class must have the methods and the properties that are defined in the interface that it implements.

Let's consider the following example: we would like to create an interface named `Printable` that contains a method named `print` that prints the classes' description that implements the interface, moreover, we would like to declare the class `Person` that implements that interface:

```typescript
interface Printable {
      print(): void;
}

class Person implements Printable {
      public constructor(
            private readonly firstName: string, 
            private readonly lastName: string
      ) {}

      public print(): void {
            console.log(`${this.firstName} ${this.lastName}`);
      }
}
```

As we can see, we can use the interface as a contract for a class that **must** expose the interfaceproperties, this behaviour would impossibile using the normal `type`. Moreover, the interface `Printable` can extends another interface by inherit the behaviour of the first one, like this:

```typescript
interface Person {
      firstName: string;
      lastName: string;
}

interface Employee extends Person {
      salary: float;
}
```

of course, a similar behaviour can be achived also with `type` but we have to use the **type intersection**.

Like in classes, also interfaces can declare their fields using the `readonly` modifier. Interface's properties declared using that modifer cannot be updated after assignment.
