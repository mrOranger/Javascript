# Typescript

Now that we had a deeper understand of JavaScript, we have to have a look on TypeScript. In fact, TypeScript is a **superset** of JavaScript, thus it is not a completely programming language, however, is a programming languaged build upon another, in this case JavaScript. In fact, since TypeScript is not a programming language, it cannot be executed by the browser, but it must be **transpilled** in JavaScript's code, meaning that the TypeScript code will be converted in its JavaScript's counterpart, preserving the business login but using only JavaScript's feature.

Up to this point, we have a programming language, that is not a programming language, and that cannot be executed by any JavaScript's engine like V8, so why should we use TypeScript insead of normal JavaScript? Well, to answer this question, we have to use an example, let's consider the following code:

```javascript
function printPersonName (firstName, lastName) {
    return firstName + lastName;
}

console.log(printPersonName(1, 'Rossi'));
```

Despite JavaScript will execute this code correctly, does it means that the output will be the same that we expect? Well, I mean that we suppose that the function `printPersonName` takes as parameter two strings, that are represented by the parameters `firstName` and `lastName`, but we are going to pass as first parameter a number and we would like to avoid that. I won't be a problem if JavaScript can allows us to use type checking,but it can ... that is the reason about why we are going to use TypeScript.
