# Basic Types

Since TypeScript is a JavaScript's superset, we will not have a look on types like `String` or `Number` because we already saw them in the JavaScript's section. On the other hand, we will have a look on TypeScript's built in types and type's operations that are not implemented in JavaScript.

## Tuples

The first built in type in TypeScript is the `tuple`, if we would write a definiton of tuple, we could say that it is a <u>fixed set of elements with a fixed type for each index</u>. Now, there is not a special notation in TypeScript to create a tuple, but we have to use the same notation, with an update, used for `Array`. Let's consider this example, if we would like to create a tuple of three elements, the first is a `number`, and the others are `string` and `number`, we should write something like this:

```typescript
const tuple = [1, 'Mario Rossi', 24];
```

of course we are using the `type inference` mechanism of TypeScript to infer the type to assign to the variable. However, if we would like to specify that there is an object's field that is a tuple, we should write something like this:

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

## Enums

Constants values are useful to indicate specific cases in our code, we can regroup constants in classes known as `Enums`. We will see that each `Enum` is a sort of (`key`, `value`) pair, where the `key` is the name of the enumerative value, while the `value` is the actual value that we are going to assign. Of course, if we do not specify any value to the current enumeration, TypeScript will assign an incremental value starting from 0. Let's see in the following example, we would like to store HTTP Status Code in an `Enum`, and use them for different conditions:

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

## Literal Type

Up to this point, shall we declare a `Enum` every time we would like to use some specific placeholders for a variable? Well, fortunately no, because we can also specify a parameter or a variable to be a new type that we are defining up to this moment. This particular notation is known as `literal type`, and we can see them here by reviewing the previous example:

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

## Any

Undoubtedly, `any` is the most permissibe type, and it is use as a workaround if we would not like to specity any type to a variable or a parameter. Of course, even though it is a basic TypeScript type, we should avoid to use it in our programs, because, if we take a look at this example:

```typescript
function sayHello(firstName: any, lastName: any) {
      return `${firstName} ${lastName}`;
}
```

even if we are using TypeScript, we are actually defining a function like in JavaScript, without type checking.

## Union Types

Up to this point, we have a look on examples where we assign a specific type, but we did not saw how to use objects that can be treated in different ways like having different types assigned. Of course we can use the `Polymorphism` between objects, however we would like to work only with `primitive types`.

Now, TypeScript implements a mechanism known as `Union Type`, where we can specify different types only using the `|`, just like in this example:

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

## Custom Type Definition

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

Up to this point, if we are passing a parameter that is a complex object like in this example, we would like to use a simplier way to define the parameter's type. Fortunately, we can define our custom type in TypeScript using the `type` keyword, and using or exporting this definition in our project.

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

which is, of course, a shorter and simplier way to implement our function.

## Functions & Functions Type

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

it seems pretty clear how can we use the `Function` type. However, previously I said that `Function` represents any type of function, that is both `add` and `square` are `Function`, thus, how can we indicate to a variable that its type must match exaclty the type of the function `add` respect to the function `square`?

The answer to the previous question is that we have to indicate the exact signature of the function, when we are defining the type of a variable, that is something like this:

```typescript
let addF: (x: number, y: number) => number;
addf = add;
addF = square; // Compile type error ...
```

now TypeScript is unable to assign to the variable `addF` also the the function `square`.

On the other hand, specify the function's signature is quite useful when we are working with `callback` function, that is, if we are implementing a function that manipulates the input parameters using a callback function, we can ensure the manipulation result specifying the callback signature. Let's take a look at this example:

```typescript
function math(x: number, callback: (y: number) => number) {
      return x + callback(x);
}

console.log(math(1, Math.sqrt)); // 2
console.log(math(-2, Math.abs)); // 0
```

we specify the type of the `callback` function, and then we can pass to the function `math` any function as callback, that takes a number as argument and returns another number.

## Unknown

There is another version of the `any` type, that is much less permessive than the first one, that is `unknown`. By using `unknown` we are actully tell to TypeScript that we do not know which one will be the type of the variable, and this is quite common in our programs if you think for a while about the user's input.

Now, as we said before, the main difference between `any` and `unknown` is that the latter is less permissive, it can be initialized with any value, but it cannot be assigned to any other variable, as we can see below:

```typescript
let variable: unknown;
variable = 'aString';
variable = 1;

let anotherVariable: string = variable; // Compile time errr ...
```

from another persective, `unknown` is a safety way to declare a variable as generic, without kwnowing which one will be the type for it.

## Never

Let's analyse the following code:

```typescript
function aFunction() {
      throw new Error('Invalid function');
}
```

what will be the returned type of that function? If you write this function in a IDE and hover using the mouse, you probably see `void`. However, the function actually returns something, thus `void` does not make sense, insted, the function returns `never`, meaning that neither `void` will be returned.

In fact, if you try to assign the resulting value to a variable, and you print the variable itself, you will see that `undefined` won't be printed, but an error will be thrown in the console.
