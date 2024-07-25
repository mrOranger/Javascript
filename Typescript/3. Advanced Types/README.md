# Advanced Typing Concepts

## Intersection Type

As we mentioned in the previous chapter, `type` and `interface` can be both used to declare new types, however, while an interface can inherit the properties from another interface using the `extends` keyword, with `type` we have to use the `intersection operators` `&` and `|`.

Let's consider this example using the interfaces:

```typescript
interface Person {
      firstName: string;
      lastName: string;
}

interface Id {
      id: string:
}

interface Employee extends Person, Id {}

const employee: Employee = {
      id: '1',
      firstName: 'Mario',
      lastName: 'Rossi',
}
```

if we would like to create a new type that is the conjucton between two interfaces, we have to declare another interface that extending the previous two. However, the same example can be written using types in the following way, by using the `&` operator:

```typescript
type Person = {
      firstName: string;
      lastName: string;
}

type Id = {
      id: string:
}

type Employee = Person & Id;

const employee: Employee = {
      id: '1',
      firstName: 'Mario',
      lastName: 'Rossi',
}
```

While `&` can be used the conjuct to types, the `|` can be used for intersection. For example, if we would like to create a new type that can be used in place of two, we can use the following syntax:

```typescript
type aType = number | string;
type anotherType = string | boolean;

type intersection = aType | anotherType; // string
```

## Type Casting

Sometimes we would like to treat something as something else, for example, let's consider the following interfaces:

```typescript
interface Animal {
      name: string;
}

interface Dog extends Animal {
      size: number;
}
```

is it possible to treat an object declared as `Animal` as it would be a `Dog`? The answer of course is yes, and it can be achieved using the `casting` operator. There are two ways to use the casting operator, the former consists in use the angle brackets before an expression, and putting inside them the new type that have to be assigned to the expression; while the latter consists in use the `as` keyword after an expression.

The following example will clarify all the doubts:

```typescript
interface Animal {
      name: string;
}

interface Dog extends Animal {
      size: number;
}

interface Cat extends Animal {
      gender: string;
}

function getDogSize(animal: Animal): number {
      const dog = <Dog>animal;
      return dog.size;
}

function getCatGender(animal: Animal): string {
      const cat = animal as Cat;
      return cat.gender;
}

const dog = { name: 'Dog', size: 32 };
const cat = { name: 'Cat', gender: 'M' };

console.log(`Dog size: ${getDogSize(dog)}`);
console.log(`Cat sex: ${getCatGender(cat)}`);
```

declaring the parameter as `Animal` we can cast it into its specific type that is `Dog` or `Cat`. On the other hand, passing a `Cat` to the function `getDogSize` will print the message `Dog size: undefined`, because, typescript will cast the `Cat` in a dog, assigning the value `undefined` to the missing properties.

## Optional Chaining
Working with interfaces, we can also indicate that a field can be optional, by using the prefix `?`, however, when we declare a field like this, we have also to deal the `null` value that can be assumed by that field expecially when that field contains nested values. Let's take a look at the following example:

```typescript
interface Employee {
      firstName: string;
      lastName: string;
      address?: {
            street: string;
            zipCode: string;
      }
}
const employee: Employee = {
      firstName: 'Mario',
      lastName: 'Rossi',
      address: {
            street: 'Main Street, 1",
            zipCode: '0981'
      }
}

employee.address.zipCode = '0982'; // A compile error will thrown 
```

a workaround consists in checking the existence of the field, using an if statement, before access to it, however, there is a more useful operator in typescript to check the existence of the field in a secure way, before access to it. That operator is the `optional chaining` `?` that can be used in the following way: `employee?.address.zipCode = '0982';` without throwing an error.

## Nullish Coalescing
Last but not least, the `nullish coalescing` operator `??` checks whenever a value is null or undefined with respect to another, and returns the first value that is not nullish, like in the following example:

```typescript
interface Employee {
      firstName: string;
      lastName: string;
      address?: {
            street: string;
            zipCode: string;
      }
}
const employee: Employee = {
      firstName: 'Mario',
      lastName: 'Rossi',
}

const zipCode =  employee?.address.zipCode ?? '0982'; // 0982 will be assigned
```