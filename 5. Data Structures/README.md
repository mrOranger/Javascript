# Data Structures in JavaScript

In JavaScript there are few built-in data structures, just the most common one: _Array_, _Set_ and _Map_. We will introduce first Array, since this data structure is wild used and we will move later on the remaining ones.

Technically, all these data structures could be named _iterable_, like in Java where most of linear data structures implements the _Collection_ interface. An iterable is an object that has the _@@iterator_ method (i.e. the _Symbol.interator_).

## Arrays

An array is a linear collection of non-unique elements. Since JavaScript is a _weakly-types_ language, there are no limitations on array's elements' types. However, there are different ways to declare a new array as we can see in this example:

```javascript
const aCommonArray = [1, 2, 3, 4];
const aNewArray = new Array(1, 2, 3, 4);
const anArrayFactory = Array.of(1, 2, 3, 4);
const anArrayFromAnother = Array.from([1, 2, 3, 4]);
```

as we can see, the commones way to create an array is declaring it as a list of items, like with _aCommonArray_ variable.

While declaring an array using the _new_ operator is still an allowed operation, we must be careful in passing numbers as parameters. In fact, declerating an array as _new Array(5)_ will create an array of 5 elements uninitialized, not an array containing just the element 5.

_Array.of_ is a generic _factory_ method to create a new array, starting from a variable number of parameters that can be passed to the method and then transformed in a new array's instance.

Since now, these methods creates a new array's instance starting from some elements, however, we would be interested in creating a new instance of array from another iterable's instance like a _Set_ or a _Map_. Then, _Array.from_ has been created for this purpose, in fact, it takes in input an instance of an iterable element, returing a new instance of an array. An interesting behaviour of this methods is that we can pass a function mapping all the elements of the input iterable object, in the new elements to be added to the new array.

### Splice

A common operator used for insert/update or remove elements from array is _splice_, that updates the array in-place without returning a copy of it. There are three parameters used in this method:

1. The _startingIndex_ from where to start the update operation.

2. The _numberOfElementsToRemove_ from the array.

3. The _elementsToAdd_ in the array.

It is quite easy to understand that the right combination of these parameters can replace any operation that can be done in the array, for example:

```javascript
const months = ['Feb', 'Mar', 'Apr', 'Jul', 'Sep'];

months.splice(0, 0, 'Jan'); // Add Jan

months.splice(4, 1, 'Jun'); // Update Jul with Jun

months.splice(5, 1); // Removes Sep
```

### Slice

As we already know, in JavaScript objects like arrays are treated by reference, therefore this last steatement means that storing an array and assigning it to a new variable will not copy the content of the array but just the reference:

```javascript
const anArray = [1, 2, 3, 4];
const anArrayCopy = anArray;

anArray.push(5);

// [1, 2, 3, 4, 5] [1, 2, 3, 4, 5]
console.log(anArray, anArrayCopy);
```

How can we do if we want to make a copy of an array? If we take a look on the documentation of the _slice_ method, it takes two parameters:

1. The _starting_ index from where copy the array's content-
2. And the _ending_ index to stop the copy process.

If we would not pass any parameter to the function, the whole array will be copied and returned from the function. Therefore, calling _slice()_ on an array, will return an indipendent copy of the original array.

### Reduce

Facing with collection of elements, we would like to merge all the elements in a new object. The most common and easy approach is to iterate over all the elements of the collcetion, and merging them using another variable. For example, if we would merge all the elements of an array of string in a string, it would be a natural approach writing a code like the following:

```javascript
const months = ['Jan', 'Feb', 'Mar', 'Apr'];
let concatenation = '';

for (const month of months) {
      concatenation += ' ' + month;
}
```

this is a right approach, however we could make it better.

The _reduce_ method, in fact, is an _iterative method_ that reduces all the elements of a collection is a single one. It is taken from the _functional programming_ taking into account that no value is actually stored but is returned as an accumulator to the next iteration. Therefore, we could refactor the previous code in the following way:

```javascript
const months = ['Jan', 'Feb', 'Mar', 'Apr'];

months.reduce((currentValue, nextValue) => {
      return currentValue + ' ' + nextValue;
}, '');
```

the first argument is the callback function executed for each element of the array and returing a value passed as parameter to the next instance, while the second argument is the _accumulator_ value used as initial value in first callback's exection.

## Spread operator

Facing with iterables is quite commn to have seen at least one time these three dots _..._, for example:

```javascript
const anArray = [1, 2, 3, 4];
const anArrayCopy = [...anArray];
```

these three dots represent the _spread operator_ a built-in operator in JavaScript that allows us to _expand_ an iterable in its elements withou actually returning a copy of the container! Back in the previous example, in fact, we are actually performing these operations in this exact order:

1. Take each element separately and putting them in a sort of _in-between_ variable.
2. Add each element to a new collection.

However, differently from the _slice_ operator, that returns an new copy of the original container, the spred operator returns a _shallow copy_ that preserves the same references of the elements. Therefore, declaring a new array of objects and updating one element in them, the same value will be updated also in the orginal container.

## Destructuring an Iterable

While the _spread_ operator will unpack an array in its elements without actually returning a new array or a new variable, the _destructuring operator_ allows us to assign parts of an iterable in different variables.

Let's consider the following scenario, we would like to access to the first and the second elements of an array, assigning them to two variables and the rest of the array must be assigned to a third variable. If we would use a _classic_ approach, something like this would be produced:

```javascript
const anArray = [1, 2, 3, 4, 5, 6];
const firstElement = anArray[0];
const secondElement = anArray[1];
let remainingElements = [];

anArray.forEach((element, index) => {
      if (index > 1) {
            remainingElements.push(element);
      }
});
```

is there a better way to do this? Yes, of course, using the destructuring operator in combination with the spread operator.

```javascript
const anArray = [1, 2, 3, 4, 5, 6];
const [firstElement, secondElement, ...remainingElements] = anArray;
```

## Sets & Maps

There are two more Data Strctures in JavaScript in addiction to Array, that are _Set_ and _Map_. Both of these structures does not allow duplicates, however, while a Set is just a collection index and value, the Map is more complex allowing us to store any key-value pairs of data.

Moreover, both Map and Set have a counterpart: the _WeakMap_ and the _WeakSet_. Differently from the original Data Structures, in these special strctures the _Garbage Collector_ can delete elements in these if there are no references.

### Map vs Objects

Someone can notice that Object and Map are quite similarly Data Structures, thus why JavaScript uses both of them? The answer is quite complex, and we can sum up it in these points:

- While an Object can store only string values as keys, the Map can store any value as a key.

- Map is a more efficient Data Structure for larger collection of elements, while is more complex to create respect to Object.

- Diffrently from Object, we can create a _WeakMap_, that is a Map affected by the _Garbage Collection_. Therefore, its elements can be deleted while in normal Map cannot.
