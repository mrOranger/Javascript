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
