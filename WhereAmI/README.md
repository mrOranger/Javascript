# WhereAmI

## Basics JavaScript project's limitations

Up to this moment we saw the main features of JavaScript and we learned how to use them, on the other hand, by developing these small projects for each chapter we encountered many limitations that slows the entire development process. First of all, the **code is not optimized**, I'm not referring to how we used JavaScript to develop the solution but the script's size that could be smaller.

Moreover, we do not face with **compatibility issues** since we are developing for ourselves, however in an enterprise environment, we must consider that it is probable that our program won't be executed in the browser that we are using. In addition, we have to consider the fact the probabily other developers will work on our project later, that we produce a code that is also easy to read and understandable if someone have to work on it, therefore we have to take into account also the **code quality**.

Last but not least, it would be preferable that our updates will be propagated immediately while we are working on the application, that is we do not need to **refresh the page** all the time.

## Helpful Tools

Let's start with a list of tools whose purpose is to solve the problems above. Of course, **refreshing the page** is a simple task that can be solves by using a **Web Server**, there are different types of Web Servers like _Nginx_, however in this project we will use [**webpack-dev-server**](https://webpack.js.org/configuration/dev-server/). We will use this program because [**webpack**](https://webpack.js.org/) is used also for **code optimization**, in fact it is also a **bundling tool** that combines multiple files in a unique and smaller one, removing extra spaces and making the whole application smaller and ready to be deployed.

However, **webpack** does not provide any configuration to ensure the code's quality, for this reason we will use another tool known as [**eslint**](https://eslint.org/). Moreover, eslint is nor just a code quality checker, it also find and report errors in our code, which is an great feature for a language like JavaScript, since it is a _weakly typed language_.

Last but not least, we will use [**Babel**](https://babeljs.io/docs/), to ensure that our code is also compatible with older browser's versions. This is a key feature if we are programming to deploy our code in a production environment. Babel in fact, _transpile_ (that is convert) our code with newer features (like `let`, `const` and `async/await`)in a code that can be executed in a browser which does not support these features.

Moreover, there is an additional tool that we will use to _orchestrate the development process_, that is [**npm**](https://docs.npmjs.com/about-npm). By using npm we will separate the development from the deploy process, creating two workflows to execute in different times.
