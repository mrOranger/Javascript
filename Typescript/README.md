# Typescript

<p align="center">
<img src="./assets/Typescript-Javascript.png" style="width: 40%">
</p>

Now that we have a deeper understand of JavaScript, we are going to have a look on TypeScript. TypeScript is a **superset** of JavaScript, that is, it is not a completely independent programming language, however, is a <u>programming language built upon another language, in this case JavaScript</u>. Moreover, since TypeScript is not a programming language, it cannot be executed by the browser, but it must be **transpilled** in JavaScript's code, meaning that the <u>TypeScript code will be converted in its JavaScript's counterpart</u>, preserving its own login but using only JavaScript's feature.

Up to this point, we have a programming language, that is not a programming language, and that cannot be executed by any JavaScript's engine like Chrome's V8, so why should we use TypeScript instead of normal JavaScript? Well, answering this question needs an example, let's consider the following code:

```javascript
function printPersonName(firstName, lastName) {
      return firstName + lastName;
}
```

Is there any way to tell JavaScript that the two parameters of the function must be strings necessarily? Unfortunately no ... but we can achieve that with TypeScript. Of course we will not study TypeScript just because it is a JavaScript's version with types, in fact, TypeScript adds many programming features that JavaScript does not have, for instance:

- Object-oriented structures like **Generics** and **Interfaces** are not supported by JavaScript, but they are in TypeScript.

- We saw **Meta-Programming Features** in JavaScript like **Proxy** or **Symbols**, while TypeScript adds also **Decorators**.

- Moreover, TypeScript offers an enriched configuration, and can tranpile our code in a JavaScript version supported also by older browsers, without installing additional tools like **Babel**.

In this section of the repository, we will not have a look on single feature using examples like in JavaScript, on the other hand we will have a look on the most important features of TypeScript and then we will see all the theoretical concepts in the final project.

## Installation and Setup

If you are going to use TypeScript for the first time, you have to install [`Node.js`](https://nodejs.org/en) since you will need `Npm` to install easily TypeScript. Once you have installed `Node.js`, you can run the command:

```shell
npm install -g typescript
```

to install the latest version of TypeScript globally on your machine. Once TypeScript has been installed successfully, we can use the command:

```shell
tsc file.ts
```

to transpile the file `file.ts` in its JavaScript counterpart. Beside TypeScript, we will use another development tools `lite-server` that allows us to serve JavaScript files attached to an HTML file, listening for updates and applying them to our code.

Up to this point, it is quite difficult to use TypeScript since we have to compile each file individually and manually using the previous command. However, TypeScript can be configured using a `tsconfig.json` file, where in we can specify additional commands and behaviors of the TypeScript compiler, that makes easier our work. Moreover, if you do not want to create that file manually, you can use the commando `tsc --init`, that generates the file automatically.

### TypeScript configuration file (tsconfig.json)

Now that we have configured our `tsconfig.json` file, have to have a look about the configuration keys, defining the TypeScript's compiler behavior:

- while we are compiling a TypeScript file in its JavaScript counterpart, we have to decide which version of ECMAScript we would like to use. That is, the `target` property indicates the ECAScript version used to generate the JavaScript file, in fact, if we would like to generate JavaScript files that have to runnable in older browser using the `es3` value is a good choice, in fact, it is the default values used to TypeScript if we do not specify anything.

- after compile a TypeScript file, we can indicate which library will be used by our files. Therefore, `lib` takes a collection of dependencies that will be injected in our final file.

- if we would like to debug our file from the browser, we have to use only JavaScript files, however, if the output file will grow and begin unreadable, the debugging process will be quite impossible. Thus, we need `.map` files that map our JavaScript file in the original TypeScript, and this kind of files are generated using the `sourceMap` property.

- `rootDir` and `outDir` are used to indicate the root directory and the directory where the output file will be places.

- even if there are errors in out TypeScript files, they will be still compiled in JavaScript, if we would like to avoid this behavior, we have to set the `noEmitOnError` property.

- `exclude` takes a the input file names that must be ignored during the compilation process, while `include` is used to indicate files that must be included, of course if no file is specified, it means that will includes all the files start from the root directory.

- however, the most most important option is `strict` that enables the `use strict` mode in JavaScript, avoiding using `any` and other type's not safe operations.

- there are three additional options, used to for **code quality**. `unusedLocals` avoid using local variables that are not used in the block, on the other hand, `unusedParameters` has the same effect but for parameters. `noImplicitReturns` option reports a warning when we do not always return any implicit value from a function.

## Basis

Since TypeScript is a JavaScript's superset, we will not have a look on types like `string` or `number` because we already saw them in the JavaScript's section. On the other hand, we will have a look on TypeScript's built in types and type's operations that are not implemented in JavaScript.

### Tuples

The first built in type in TypeScript is the **tuple**, if we would write a definition of tuple, we could say that it is a <u>fixed set of elements with a fixed type for each index</u>. Now, there is not a special notation in TypeScript to create a tuple, but we have to use the same notation, with an update, used for `Array`. Let's consider this example, if we would like to create a tuple of three elements, the first is a `number`, and the others are `string` and `number`, we should write something like this:

```typescript
const tuple = [1, 'Mario Rossi', 24];
```

of course we are using the **type inference** mechanism of TypeScript to infer the type to assign to the variable. However, if we would like to specify that there is an object's field that is a tuple, we should write something like this:

```typescript
const myObject: {
      firstName: string;
      lastName: string;
      address: [number, string, number];
} = {
      firstName: 'Mario',
      lastName: 'Rossi',
      address: [1, 'Via Nazionale', 09871],
};
```

Of course, since `tuples` are a form of `array`, we can access its elements using the `destructuring` operator for arrays.

### Enums

Constants values are useful to indicate specific cases in our code, we can regroup constants in classes known as **enums**. We will see that each enum is a sort of (key, value) pair, where the key is the name of the enumerative value, while the value is the actual value that we are going to assign. Of course, if we do not specify any value to the current enumeration, TypeScript will assign an incremental value starting from 0. Let's see in the following example, we would like to store HTTP Status Code in an enum, and use them for different conditions:

```typescript
enum HTTPCode {
      OKAY,
      BAD_REQUEST,
      INTERNAL_SERVER_ERROR,
}

const currentStatus = HTTPCode.OKAY;
if (currentStatus === HTTPCode.OKAY) {
      console.log('HTTP call successfully.');
}
if (currentStatus === HTTPCode.BAD_REQUEST) {
      console.log('HTTP call failure, this is a bar request');
}

if (currentStatus === HTTPCode.INTERNAL_SERVER_ERROR) {
      console.log('HTTP call failure, there is a problem in the server.');
}
```

if we would like to print the value of the current status `console.log(currentStatus)`, we will see some integer between `0` and `2` printed out. In fact, TypeScript will assign the value of the enumerations from its own, starting from `0`. If we would like to force the values' assignment, we can simply specify the value like this:

```typescript
enum HTTPCode {
      OKAY = 200,
      BAD_REQUEST = 400,
      INTERNAL_SERVER_ERROR = 500,
}
```

Moreover, we can assign also `string` to the enum values, just like we saw in the previous example.

### Literal Type

Up to this point, shall we declare a enum every time we would like to use some specific placeholders for a variable? Well, fortunately no, because we can also specify a parameter or a variable to be a new type that we are defining up to this moment. This particular notation is known as **literal type**, and we can see them here by reviewing the previous example:

```typescript
const currentStatus: 'okay' | 'bad-request' | 'internal-error';

// Some stuffs

if (currentStatus === 'okay') {
      console.log('HTTP call successfully.');
}
if (currentStatus === 'bad-request') {
      console.log('HTTP call failure, this is a bar request');
}

if (currentStatus === 'internal-error') {
      console.log('HTTP call failure, there is a problem in the server.');
}
```

it is not possible that the variable `currentStatus` can assume another value that is different from `'okay'` `'bad-request'` or `'internal-error'`, because TypeScript's compiler wont compile our code.

### Any

Undoubtedly, `any` is the most permissible type, and it is use as a workaround if we would not like to specify any type to a variable or a parameter. Of course, even though it is a basic TypeScript type, we should avoid to use it in our programs, because, if we take a look at this example:

```typescript
function sayHello(firstName: any, lastName: any) {
      return `${firstName} ${lastName}`;
}
```

even if we are using TypeScript, we are actually defining a function like in JavaScript, without type checking.

### Union Types

Up to this point, we have a look on examples where we assign a specific type, but we did not saw how to use objects that can be treated in different ways like having different types assigned. Of course we can use the **Polymorphism** between objects, however we would like to work only with primitive types.

Now, TypeScript implements a mechanism known as **Union Type**, where we can specify different types only using the `|`, just like in this example:

```typescript
function add(firstNumber: string | number, secondNumber: string | number) {
      if (typeof firstNumber === 'number' && typeof secondNumber === 'number') {
            return firstNumber + secondNumber;
      }
      if (typeof firstNumber === 'string' && typeof secondNumber === 'string') {
            return `${firstNumber} ${secondNumber}`;
      }
      throw new Error('Invalid types');
}
```

we are allowing the user to specify both parameters to be `number` or `string` but not to mixin them, otherwise an error will be thrown.

### Custom Type Definition

Let's take a look at this example:

```typescript
function checkPassword(user: { username: string; password: string }) {
      if (user.password.length > 0) {
            if (user.password === 'password') {
                  return true;
            }
      }
      throw new Error(`Invalid password: ${user.password}`);
}
```

Up to this point, if we are passing a parameter that is a complex object like in this example, we would like to use a simpler way to define the parameter's type. Fortunately, we can define our custom type in TypeScript using the `type` keyword, and using or exporting this definition in our project.

That is, our `user` parameter's type, will be something like this:

```typescript
type User = { username: string; password: string };
```

now, we can update the previous example, using the following type's definition:

```typescript
function checkPassword(user: User) {
      if (user.password.length > 0) {
            if (user.password === 'password') {
                  return true;
            }
      }
      throw new Error(`Invalid password: ${user.password}`);
}
```

which is, of course, a shorter and simpler way to implement our function.

### Functions & Functions Type

In the previous chapter about JavaScript, we saw that functions can be stored in a variable, now, what is the type of a variable that stores a function? In TypeScript, it is of type `Function`, that represents any type of function. Let's see this example:

```typescript
function add(first: number, second: number) {
      return first + second;
}

function square(value: number) {
      return Math.sqrt(value);
}

const addF: Function = add;

console.log(addF(2, 2)); // 4 ...
```

it seems pretty clear how can we use the `Function` type. However, previously I said that `Function` represents any type of function, that is both `add` and `square` are `Function`, thus, how can we indicate to a variable that its type must match exactly the type of the function `add` respect to the function `square`?

The answer to the previous question is that we have to indicate the exact signature of the function, when we are defining the type of a variable, that is something like this:

```typescript
let addF: (x: number, y: number) => number;
addf = add;
addF = square; // Compile type error ...
```

now TypeScript is unable to assign to the variable `addF` also the the function `square`.

On the other hand, specify the function's signature is quite useful when we are working with callback function, that is, if we are implementing a function that manipulates the input parameters using a callback function, we can ensure the manipulation result specifying the callback signature. Let's take a look at this example:

```typescript
function math(x: number, callback: (y: number) => number) {
      return x + callback(x);
}

console.log(math(1, Math.sqrt)); // 2
console.log(math(-2, Math.abs)); // 0
```

we specify the type of the `callback` function, and then we can pass to the function `math` any function as callback, that takes a number as argument and returns another number.

### Unknown

There is another version of the `any` type, that is much less permissive than the first one, that is `unknown`. By using unknown we are actually tell to TypeScript that we do not know which one will be the type of the variable, and this is quite common in our programs if you think for a while about the user's input.

Now, as we said before, the main difference between `any` and `unknown` is that the latter is less permissive, it can be initialized with any value, but it cannot be assigned to any other variable, as we can see below:

```typescript
let variable: unknown;
variable = 'aString';
variable = 1;

let anotherVariable: string = variable; // Compile time errr ...
```

from another perfective, `unknown` is a safety way to declare a variable as generic, without knowing which one will be the type for it.

### Never

Let's analyse the following code:

```typescript
function aFunction() {
      throw new Error('Invalid function');
}
```

what will be the returned type of that function? If you write this function in a IDE and hover using the mouse, you probably see `void`. However, the function actually returns something, thus `void` does not make sense, instead, the function returns `never`, meaning that neither `void` will be returned.

In fact, if you try to assign the resulting value to a variable, and you print the variable itself, you will see that `undefined` won't be printed, but an error will be thrown in the console.

## Object Oriented Programming

Even thought in JavaScript OOP is a well known concept, in TypeScript it is improved in such a way as introducing concepts like: properties and method's visibility, inheritance and generic programming. In this section, we will not have a look on the basic's OOP concepts, moreover, we will see how these are implemented in TypeScript and how they differ respect to JavaScript.

### Class's basis concepts and visibility operators

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

it is much cleaver right? We can use `private` and `public` keywords to indicate who can access to the class's properties (if we omit the visibility modifier, `public` is the default one).

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

Respect to JavaScript we can also define **constant** properties, simply using the `readonly` modifier before the property's definition, like in this way:

```typescript
class Person {
      public constructor(private readonly _firstName: string, private readonly _lastName: string) {}

      public get firstName() {
            return this._firstName;
      }

      public get lastName() {
            return this._lastName;
      }
}
```

### Inheritance

Like in JavaScript, also in TypeScript we can inherit classes' behaviors using the `extends` keyword, however, inherit's a classes' behavior means that we have to call the parent's class constructor using the `super` method.

Let's take a look at this example:

```typescript
class Person {
      constructor(private readonly _firstName: string, private readonly _lastName: string) {}

      get firstName() {
            return this._firstName;
      }

      get lastName() {
            return this._lastName;
      }
}

class Employee extends Person {
      constructor(private _firstName: string, private _lastName: string, private _department: string) {
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

### Interfaces

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

Up to this point, what is the difference between `interface` and `type` as we saw earlier? Well, the key difference is that interfaces can also be used as **contracts** for classes. According to the last statement, we can use the keyword `implements` to indicate that a class must have the methods and the properties that are defined in the interface that it implements.

Let's consider the following example: we would like to create an interface named `Printable` that contains a method named `print` that prints the classes' description that implements the interface, moreover, we would like to declare the class `Person` that implements that interface:

```typescript
interface Printable {
      print(): void;
}

class Person implements Printable {
      public constructor(private readonly firstName: string, private readonly lastName: string) {}

      public print(): void {
            console.log(`${this.firstName} ${this.lastName}`);
      }
}
```

As we can see, we can use the interface as a contract for a class that **must** expose the interface properties, this behavior would impossible using the normal `type`. Moreover, the interface `Printable` can extends another interface by inherit the behavior of the first one, like this:

```typescript
interface Person {
      firstName: string;
      lastName: string;
}

interface Employee extends Person {
      salary: float;
}
```

of course, a similar behavior can be achieved also with `type` but we have to use the **type intersection**.

Like in classes, also interfaces can declare their fields using the `readonly` modifier. Interface's properties declared using that modifier cannot be updated after assignment.

## Generics

Let's consider this piece of code:

```typescript
function concat(firstArray: string[], secondArray: string[]): string[] {
      const finalArray = firstArray;
      for (const element of secondArray) {
            finalArray.push(element);
      }
      return finalArray;
}

const result = concat(['a', 'b'], ['d', 'f']); //[a, b, d, f]
```

this function works fine, however, it can concatenate only array of strings, it would be better if it can concatenate also strings of numbers or something else, how can we solve this problem? Of course, we can implement different versions of the same function, working with different types, on the other hand it would be a cumbersome solution ... or we can use **generics**.

If you have worked with another object oriented programming language, you probably know that there is a native mechanism to create methods or functions that accept any type of input. In TypeScript, we can create a generic function simply using the angle brackets like this:

```typescript
function concat<T>(firstArray: T[], secondArray: T[]): T[] {
      const finalArray = firstArray;
      for (const element of secondArray) {
            finalArray.push(element);
      }
      return finalArray;
}
```

now we can reuse the same function for different inputs. Of course, in this example we are indicating to TypeScript that the function accepts only one **generic parameter**, on the other hand, we can accept an arbitrary number of parameters specifying them inside the angle brackets.

### Constraints

Now, sometimes we would define some constraints on our generic parameters. Let's consider the following scenario, we implemented a function that prints the information of a `Person`, on the other hand, we would like to print only the information of person that matches the definition of the interface `Person`, we can implement some checks before the function's execution, however this is a quite cumbersome solution. Another simpler and smarter way is to use the `extends` keyword like in the following example:

```typescript
interface Person {
      firstName: string;
      lastName: string;
}

interface Employee extends Person {
      salary: number;
}

function printInfo<T extends Person>(person: T): string {
      return `${person.firstName} ${person.lastName}`;
}

const employee: Employee = {
      firstName: 'Mario',
      lastName: 'Rossi',
      salary: 20000,
};

console.log(printInfo<Employee>(employee));
```

now, the function can accept only type parameters that extends the interface `Person`.

Let's consider now the same example, with a different scenario, in this case we would like to pass to the function two more type parameters that represents the keys of an object that we would like to print. Of course, a faster solution would be something like this:

```typescript
function printInfo<T extends Person, U, K>(person: T, firstField: U, secondField: K): string {
      return `${person[firstField]} ${person[secondField]}`;
}
```

however, this would not work, because TypeScript is not sure about the presence or not of the two parameters in the set of keys of the first one. Once more, another keyword, this time `keyof`, will help us. `keyof` indicates to TypeScript that the following parameter is in the set of the keys of another parameter, that is we have to use `keyof` in conjunction with the `extends`, like this:

```typescript
function printInfo<T extends Person, U extends keyof Person, K extends keyof Person>(
      person: T,
      firstField: U,
      secondField: K
): string {
      return `${person[firstField]} ${person[secondField]}`;
}
```

now TypeScript will compile correctly, because it will understand that `U` and `K` must be keywords in the set of `Person` keywords.

### Utility Types

TypeScript offers some **utility types** that helps us in common programming's task, moreover, you will probably need these working with generic functions while refactoring your code. While the list is quite longer, we will divide each of these built-in types based on the target they are working, that is: working in types and interfaces; on union types; and finally on functions.

### Utility Types working on types and interfaces

The first one is `Partial`, let's consider a classic interface like this one:

```typescript
type Person = {
      firstName: string;
      lastName: string;
};
```

if we want to create a variable from this interface, we have to specify all the fields prior, it means that something like this will not be allowed:

```typescript
const person: Person = {};
person.firstName = 'Mario';
person.lastName = 'Rossi';
```

a simpler solution is to declare all the fields as optional using the `?` operator, however, we can declare the variable `person` as a `Partial<Person>` indicating to TypeScript that the variable can contain parts of the `Person` interface without containing all the fields necessary:

```typescript
type partialPerson = Partial<Person>;
```

The counterpart of `Partial` is `Required`, while the former makes all the fields of an object optional, the latter makes all the optional fields mandatory, as shown below:

```typescript
type requiredPerson = Required<Person>;
```

A similar behavior that declare all the fields of a type as `readonly` is the `Readonly` type, that transforms all the fields contained in the generic parameter as `readonly` without allow the user to reassign the type's fields:

```typescript
type readonlyPerson = Readonly<Person>;
```

While the previous utility types changes object's properties, the following allows us to create new types merging two different types. Moreover, these utility types are typically useful working on union types.
Let's start with the following scenario, we would like to create a new type having a set of well defined keys' names, and whose values can be of a specified type. However, we would like to create a new type dynamically,
we would like to use a single constructor without define each new type all the time. `Record<K, V>` is the built in utility types that creates a type whose keys must be of type `K` and values of type `V`,
using this type, we can create the previous type `Person` in the following way:

```typescript
type Fields = 'firstName' | 'lastName';
type Values = string;
type Person = Record<Fields, Values>;

const aPerson: Person = {
    firstName: 'John',
    lastName: 'Doe',
};
```

the interesting part of this utility type is that you can use it to combine types having a structure. For instance, we can create a new type having values' types of `Person` keys using the `keyof` operator in the following way:

```typescript
type StrangePerson = Record<Values, keyof Person>;
const aStrangePerson = {
      ['John']: 'firstName',
      ['Doe']: 'lastName',
};
```

The next two utility types `Pick<T, K>` and `Omit<T, K>` takes and removes from the input type `T`, its keys contained in the set of keys defined by `K`:

```typescript
type Vehicle = {
    name: string;
    model: string;
    hp: number;
}

type VehicleName = Omit<Vehicle, 'model' | 'hp'>; // VehichleName = { name: string };
type NamelessVehicle = Pick<Vehicle, 'model' | 'hp'>; // VehicleName = { model: string, hp: number}
```

Up to this point, each Utility Type that we saw, works on plain types, and then, the next two Utility Types that we are going to analyze works only on union types. `Exclude<T, K>` and `Extract<T, K>` removes and get a set of values contained in the first union type `T`, based on a certain condition expressed with the union of values defined in the second type parameter:

```typescript
type Names = 'Mario' | 'Maria' | 'Federico';
type OnlyMale = Exclude<Names, 'Maria'>
```

```typescript
type Names = 'Mario' | 'Maria' | 'Federico' | 'Federica';
type OnlyFemale = Extract<Names, 'Maria' | 'Federica'>;
```

## Meta Programming and Decorators

In the JavaScript series, we understand what **Meta Programming** is and how can we use concepts like `Symbol`, `Proxy` and `Reflect` to with the program's data. While these structures are encoded also in TypeScript, it offers also another feature known as **Decorator**.

Before start with Decorator, ensure that you have enabled the `experimentalDecorators` option in the [`tsconfig.json`](./tsconfig.json) file, otherwise you won't be able to use decorators.

Now, a Decorator is an high order function attached to a declaration of a class, a method and more, that is executed as soon as TypeScript detects the declaration of the entity. Let's create a Decorator attached to a class, that logs something as soon as the class declaration is detected, moreover the decorator must receive at least one argument that is represented by the object to which is attached, that is in this example a class which is a `Function` in TypeScript.

```typescript
function Log(obj: Function) {
      console.log('Log ...');
}

@Log()
class Person {
      public firstName: string;
      public lastName: string;

      public constructor(firstName: string, lastName: string) {
            this.firstName = firstName;
            this.lastName = lastName;
      }
}
```

now, if we execute the code, we will see `Log ...` without actually instantiated the class. Of course, it would be better if we can pass some parameters to the decorator, and we can achieve that by using a **factory function**, that is a function returning another function by using the parameters. Let's rewrite the function using a factory:

```typescript
function Log(message: string) {
      return function (obj: Function) {
            console.log(message);
      };
}

@Log('Person class created')
class Person {
      public firstName: string;
      public lastName: string;

      public constructor(firstName: string, lastName: string) {
            this.firstName = firstName;
            this.lastName = lastName;
      }
}
```

Up to this point we used decorator only for class definition, however, we can attach a decorator also to a class's property like `firstName` chaining the decorator's parameters. Indeed, a decorator used for a property receives two parameters, the former is the constructor the constructor function if the property is static, or the class's prototype if the property is an instance one, while the latter parameter is the name of the property itself.

In this example we are going to create a new decorator attaching it to the property `firstName` and we will see how the output is changing, once more we will use a factory function because we want to pass some parameters to the decorator:

```typescript
function Loggable(message: string) {
      return function (target: any, propertyName: string) {
            console.log(`${message} ${propertyName}`, target);
      };
}

class Person {
      @Loggable('Log for ...')
      private firstName: string;
      private lastName: string;

      public constructor(firstName: string, lastName: string) {
            this.firstName = firstName;
            this.lastName = lastName;
      }

      public get personalData() {
            return `${this.firstName} ${this.lastName}`;
      }
}
```

if we execute the code, we will see that `Log for ... firstName` will be printed, with the `Prototype` of the class.

As we mentioned before, decorators can be attached also to other entities besides classes. In fact, we can attach decorator to **accessors**, **methods** and also **parameters**, however the structure of the decorator is quite the same for each of them, the first parameter is the `target` which is the Prototype or the constructor function; the second parameter is the name of the target, and the only parameter that changes is the third one, indeed, for decorators attached to accessor or methods is of type `PropertyDescriptor`, while for decorators attached to parameters is the index of the parameter. Let's define three decorators attached to our `Person` class:

```typescript
function Accessor(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
      console.log(target, name, descriptor);
}

function Method(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
      console.log(target, name, descriptor);
}

function Parameter(target: any, name: string | Symbol, index: number) {
      console.log(target, name, index);
}

class Person {
      private firstName: string;
      private lastName: string;

      public constructor(firstName: string, lastName: string) {
            this.firstName = firstName;
            this.lastName = lastName;
      }

      @Method
      public print(@Parameter printingInfo: string): string {
            return `${printingInfo} - ${this.personalData}`;
      }

      @Accessor
      public get personalData() {
            return `${this.firstName} ${this.lastName}`;
      }
}
```

## Modules and Namespace

In TypeScript just like in JavaScript, each file represents a module, and we can use the ES6 syntax with `import` and `export` keywords to import and export entities definitions from a module. Moreover, TypeScript adds the concept of **namespace**, thanks to we can regroup definitions of variables, classes and other stuffs in the same module, and then exporting a module from a file, instead single elements.

A namespace is TypeScript feature to regroup definitions and share between them between different files, creating a new namespace requires to use the `namespace` keyword, and enclosing our definitions there. Let's consider the following scenario, we would like to create a new namespace named **Company** and declare inside it some interfaces and validators for our application. Now, let's define the models and the validators in two different files `models.ts` for the interfaces and `validators.ts` for the validators, however, both of the files must declare the functions and the interfaces in the same namespace:

```typescript
/* models.ts */
namespace Company {
      export interface Employee {
            firstName: string;
            lastName: string;
      }

      export interface Manager extends Employee {
            department: string;
      }
}
```

```typescript
/// <reference path="models.ts" />
/* validators.ts */
namespace Company {
      export function validateEmployee(employee: Employee) {
            return employee.firstName.trim().length > 0 && employee.lastName.trim().length > 0;
      }

      export function validateManager(manager: Manager) {
            return validateEmployee(manager) && manager.department.trim().length > 0;
      }
}
```

declare a new namespace is quite simple, we have to use the `namespace` keyword with `export` to indicate if we would like to export the definition outside the namespace, however, if we would like to use a namespace from another file, we have to use the following command `/// <reference path="" />` that is not a comment but a TypeScript built-in feature to import of a namespace from another file. Now, if we would like to use the same namespace with its declarations in another file, we have to import the two previous references like this:

```typescript
/// <reference path="models.ts" />
/// <reference path="validators.ts" />

/* index.ts */

namespace Company {
      function main() {
            const employee: Employee = {
                  firstName: 'Mario',
                  lastName: 'Rossi',
            };

            const manager: Manager = {
                  firstName: 'Luigi',
                  lastName: 'Verdi',
                  department: 'Department 1',
            };

            console.log(
                  `${employee.firstName} ${employee.lastName} ` +
                        (validateEmployee(employee) ? `is` : `is not`) +
                        ` a valid employee`
            );
            console.log(
                  `${manager.firstName} ${manager.lastName} ` +
                        (validateManager(manager) ? `is` : `is not`) +
                        ` a valid manager`
            );
      }

      main();
}
```

However, if we compile the following code in different files, it would not run, because a namespace in a TypeScript feature not supported in JavaScript, this means that the declarations will be compiled in different files, but in plain JavaScript they cannot read the declarations defined in another file. If we would like to run this code correctly, we have to bundle the output code in a single file like `bundle.js` and we have to update the `outDir` field in the [`tsconfig.json`](./tsconfig.json).

Namespaces are a useful way to organize code in the same component, however, there is an alternative introduced in ES6, consisting in exporting and importing files' definitions without declaring namespaces, and using the `export` and `import` keywords. In the previous chapter about JavaScript, we saw an example of how that feature works in the final project. Let's take a look at how this works in TypeScript, rewriting the previous example:

```typescript
/* models.ts */
export interface Employee {
      firstName: string;
      lastName: string;
}

export interface Manager extends Employee {
      department: string;
}
```

```typescript
/* validators.ts */

import { Employee, Manager } from './models.js';

export function validateEmployee(employee: Employee) {
      return employee.firstName.trim().length > 0 && employee.lastName.trim().length > 0;
}

export function validateManager(manager: Manager) {
      return validateEmployee(manager) && manager.department.trim().length > 0;
}
```

```typescript
/* index.ts */

import { Employee, Manager } from './models.js';
import { validateEmployee, validateManager } from './validators.js';

function main() {
      const employee: Employee = {
            firstName: 'Mario',
            lastName: 'Rossi',
      };

      const manager: Manager = {
            firstName: 'Luigi',
            lastName: 'Verdi',
            department: 'Department 1',
      };

      console.log(
            `${employee.firstName} ${employee.lastName} ` +
                  (validateEmployee(employee) ? `is` : `is not`) +
                  ` a valid employee`
      );
      console.log(
            `${manager.firstName} ${manager.lastName} ` +
                  (validateManager(manager) ? `is` : `is not`) +
                  ` a valid manager`
      );
}

main();
```

if remove the previous settings from the [`tsconfig.json`](./tsconfig.json), you will see that a JavaScript file has been created for each of its typescript part, moreover, if you would like to execute the code you must ensure that the option `"type": "module"` is set in the [`package.json`](./package.json) or in the `script` tag of the HTML file. Last but not least, you probably notice that we imported the .js counterpart in each import statement, this because the import statement with this configuration won't be converted looking for the .ts file, however, it will look only for the file that are actually compiled, that are the JavaScript files.
