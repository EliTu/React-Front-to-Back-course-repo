# Section 3 - Componenets, JSX & Props

## What is JSX? (Section 3, lecture 13)

JSX **is** a JavaScript extention that will basically allow us to put HTML syntax into our JavaScript. Of course, under the hood it is not real HTML being passed, as when it is being compiled to vanilla JavaScript it will be compiled into standard JavaScript, and so the JSX is really just a syntactic sugar, and we will see how it looks in actual JavaScript later in this lecture (and why we would use JSX over JavaScript to write HTML in React).

### Couple of rules to follow when using JSX

When we use JSX, we have to keep couple of things in mind:

-   We can't use the HTML `class` attribute, but we need to use `className`. Similarly, there are more HTML attributes we can't use in their HTML format, for example the `for` of the `<label>` tag needs to be changed to `htmlFor`. If we set the `<label>` with the `for` attribute, it will still be rendered to the page, but if we will open our React tools, we will get an error.
-   We must apply '/' for tags that has no closing tags. In HTML5 we could have single tags without closing slash, for example `<br>` or `<input>`, but in JSX we must specify the closing '\', so it will be `<br />` and `<input />`, otherwise we will get errors and the compiler will fail to compile.
-   The JSX we `return` must return a single parent element, meaning we cannot return multiple elements. However, inside that single parent element, we could have as many nested elements as we would like. This is per with the JavaScript rules, since we could return only a single value per function.

### The JavaScript behind JSX

As we saw, our JSX syntax is as follows:

```js
function App() {
	return (
		<div className="App">
			<h1>The App Component</h1>
		</div>
	);
}
```

But as we've said before, this is just a syntactic sugar, not an actual HTML markup text, and is the JSX is just being put on top of the actual code that generates it. Behind the JSX there is actually JavaScript code. It looks like this:

```js
function App() {
	return React.createElement(
		'div',
		{ className: 'App' },
		React.createElement('h1', null, 'The App Component')
	);
}
```

Basically we use the React library `createElement` method to generate a new HTML component, and we pass into it all the relevant information in the appropriate argument structure. Right now it doesn't look too terrible, but the moment we have many nested elements with many properties and content, it becomes a complete mess and impossible to work with, and so JSX is the obvious way to go.

## JSX Expressions (Section 3, lecture 14)

In this lecture we will look at JSX expressions: variables, conditionals, keywords that we could put inside our JSX that will also be rendered to the DOM.

In the `render` method of our component, anything above the `return` statement that returns us the JSX that will be rendered to the page, we could input regular JavaScript data: set variables, set `if` statements, functions, conditionals etc. **Note that this is an unnecessary and a bad practice, the `render` function should only return the JSX, and all the logic and expressions should come from `props` or `state`,** but for this lecture, for demonstration sake, we will input our logic inside the `render` function.

### Declaring data and assigning the expressions in the JSX

Now we can just add some variables and conditionals in the components `render` function, above the `return` statement. To output our variables in our code, we will just add them into (or between) a JSX tag using curly braces. Any JavaScript expression could go into these curly braces, and so we could add a `.toUpperCase()` method to our name variable, as long as it is within the curly braces.

```js
function App() {
	const name = 'Barry';

	return (
		<div className="App">
			<h1>The App Component</h1>
			<h4>Hello {name.toUpperCase()}</h4>
		</div>
	);
}
```

### Arithmetic logic

We can also assign numbers and perform calculations within the JSX code. We could create a JSX tag, for example `<h4>1 + 1</h4>`, and in order to calculate it we could just insert curly braces that will calculate the arithmetical expression: `<h4>1 + 1 = {1 + 1}</h4>`, In turn, this will render `1 + 1 = 2` to the DOM. Same can go with variables that hold numbers, they could be calculated in the same method.

```js
function App() {
	const name = 'Barry';
	let num1 = Math.floor(Math.random() * 10);
	let num2 = Math.floor(Math.random() * 10);

	return (
		<div className="App">
			<h1>The App Component</h1>
				<h4>Hello {name.toUpperCase()}</h4>
				<h4>
					{num1} + {num2} = {num1 + num2}
				</h4>
		</div>
	);
```

### Conditionals

Of course, we could also set conditional statements and apply them to our JSX. We can create boolean variables, and set them with an expression, using a ternary operator inside the JSX. For example, we will create a variable `const showHello = true;` and then put it in the JSX, if the expression is `true`, the name will show, if `false` then output `null`.

```js
function App() {
	const name = 'Barry';
	const showHello = true;

	return (
		<div className="App">
			<h1>The App Component</h1>
			{showHello ? <h4>Hello {name.toUpperCase()}</h4> : null}
		</div>
	);
}
```

Now we can toggle between `true` and `false`, and then the `<h4>` with the name variable will render or not.

### Apply pieces of JSX into variables

We will create another conditional `const showMath = true;` and initiate a variable `let math`. We will then create and `if` statement: if `showMath` is true, we will set `math` to an `<h4></h4>` tag that evaluates a math expression, if set to false, `math = null`. This way we basically set our conditional `if` statement to return JSX expression if it set to `true`. We can simply input `{math}` into the JSX code, and it will render an `<h4>` tag with the value of `num1` and `num2`, as well as the calculated result,as long as the boolean is set to `true`.

```js
function App() {
	const name = 'Barry';
	const showHello = true;
	const showMath = true;
	let num1 = Math.floor(Math.random() * 10);
	let num2 = Math.floor(Math.random() * 10);

	let math;
	if (showMath) {
		math = (
			<h4>
				{num1} + {num2} = {num1 + num2}
			</h4>
		);
	} else {
		math = null;
	}

	return (
		<div className="App">
			<h1>The App Component</h1>
			{showHello ? <h4>Hello {name.toUpperCase()}</h4> : null}
			{math}
		</div>
	);
}
```
