# JavaScript

<p align="center">
<img src = "./assets/javascript-logo.jpg" alt = "JavaScript Logo (from Wikipedia)" style = "width: 50%"/>
</p>

JavaScript is weird ... I mean this is what I though before, however when I started to work I understood that JavaScript is not weird, it is just a little bit different from other programming languages like Java or C++. JavaScript is _weakly typed_ programming language, used both for frontend and backend development, and compiled at runtime (_JIT_ compilation). A JavaScript's code can be exectuted on a Web Browser or in a Web Server, by using a _JavaScript Engine_. The most popular JavaScript engine is used in Google Chrome, and known as _V8_.

I hope that this short guide will help you in have a deeper undestand of how JavaScript work and why is important to learn it in 2024. The repository in chapters starting from the basics like to adavanced concepts like Symbols, Memory Management and so and so forth ...

## History

JavaScript was born in 1995 when _Netscape_, one of the first Web Browser, adopted _LiveScript_ (this is the initial name of JavaScript, however, due the popularity of Java it was renamed in this way). In 1996, Microsoft adopt JavaScript for the first version of Internet Explorer, and JavaScript started to gain popularity.

However, only in the late of 1996 JavaScript started its standardizazion process, by submitting to _ECMA_ (European Computer Manufactures Association) Internalization. One year later, the first version of _ECMAScript_ was released, and JavaScript is the most famous implementation of this language. Between 2006 and 2011 huge progresses in JavaScript standardization were made, and finally Microsoft supported the standardization process. Finally, in 2009 the first version of JavaScript outside a web browser was released, and soon it would be known as _Node.js_. Nowadays, Javascript is the most populare languages for frontend development, and one of the most importat in backend.

## ECMAScript

The ECMAScript is a set of standard for scripting languages like JavaScript developed by ECMA (_European Computer Manufactures Association_). Nowadays, the major release for ECMAScript is the v6, known as ES6, released in 2016.

### var vs let & const

One of the most obvious difference between ES& and the previous versions, consists in new variable's keywords declarations. In the previous version, indeed, there was only one keyword to declare variables, that is var_, since now there are also _let_ and _const_, but what are the differences between them?

Well, the most important difference stands in the _scope_ of the variables declarations. Since, `var` declares variables with global and function scope, `let` and `const` declare variables with block scope. Let's take a look at the following example:

```javascript
var name = 'Mario';
let surname = 'Rossi';

if (name == 'Mario') {
      var sex = 'M';
}

function aFunction() {
      let age = 30;
      console.log(name, surname, age, sex);
}

aFunction();
console.log(name, surname, age, sex);
```

this code will throw an exception ... the error is that, since the variable `age` is defined with the _let_ keyword, its scope will be restricted to the function itself, on the other hand, the variable `sex` that is defined with the _var_ keyword, will be accessible also outside the _if_ block. If the `sex` variable would be defined with the _let_ keyword, an error would be thown, because the scope of the variable is limited to the block.

### Hoisting

With the term _hoisting_ we are refering to the JavaScript's ability to move variables' declarations to the top of the script. Let's take a look at the following example:

```javascript
var variable = 'Mario';
console.log(variable);
console.log(anotherVariable);
var anotherVariable = 'Rossi';
```

even if the variable `anotherVariable` is declared after its use, JavaScript will take its' definition and moves to the top of the script, allowing us to access it. However, the same example example, written using the _let_ keyword would not work, since <u> _let_ force the JavaScript's interpreter to leave the variable's declaration in the exact point as it is</u>.

### Strict Mode

There are two ways to execute JavaScript's code, that is using _strict mode_ or not. Enabling the <u>strict mode, will cause JavaScript interpeter to not allowing some behaviours that are too much flexible for the programming language</u>, such as:

- Declaring a variable without a keyword.
- Declaring a variable using a reserved keyword.

and so on and so forth. We can enable the strict mode by inserting the string `'use strict'` at the beginning of the script, that is:

```javascript
'use strict';
let undefined = 'undefined';
aVariable = 'Another Variable';
```

if we try to execute the following script, it would not work, since `undefined` is a reserved keyword of JavaScript and `aVariable` it is not the right way to declare the variable.

### Primitive vs Reference Values

If you have ever worked with a language like Java, you probabily know that in most of programming languages there are two types of values: _primitive_ and _reference_ values. In the first category we encounter values such as: String, Number, Boolean and Symbol; while in the latter set, are all other objects of the language.

One of the most important difference between primitive and reference values in JavaScript, is the assignment process of their values, let's take a look at this example:

```javascript
let name = 'Mario';
let anotherName = name;

console.log(name, anotherName); // Mario, Mario
name = 'Luigi';

console.log(name, anotherName);
```

the assigning process in the expression `anotherName = name` just copy the value of the first variable, in the second one. Therefore, creates two independent variables. On the other hand, the assignment process for types like objects are quite different:

```javascript
let person = { name: 'Mario', age: 40 };
let anotherPerson = person;

anotherPerson.age = 40;

console.log(person); // {name  : 'Mario', age : 40 }
```

how is it possible that updating another variable we also update the first variable? This happens since <u>objects' variables are store by reference, therefore, when we try to acccess to one of these variables, we are actually access to the memory address of it, and if we update the reference of a variable, automatically we are update all the references of that variable</u>.
