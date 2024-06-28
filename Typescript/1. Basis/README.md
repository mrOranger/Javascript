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

## Any
