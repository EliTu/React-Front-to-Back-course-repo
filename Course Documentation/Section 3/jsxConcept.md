# Section 3 - Componenets, JSX & Props

## What is JSX? (Section 3, lecture 13)

JSX **is** a JavaScript extention that will basically allow us to put HTML syntax into our JavaScript. Of course, under the hood it is not real HTML being passed, as when it is being compiled to vanilla JavaScript it will be compiled into standard JavaScript, and so the JSX is really just a syntactic sugar, and we will see how it looks in actual JavaScript later in this lecture (and why we would use JSX over JavaScript to write HTML in React).

### Couple of rules to follow when using JSX

When we use JSX, we have to keep couple of things in mind:

- We can't use the HTML `class` attribute, but we need to use `className`. Similarly, there are more HTML attributes we can't use in their HTML format, for example the `for` of the `<label>` tag needs to be changed to `htmlFor`. If we set the `<label>` with the `for` attribute, it will still be rendered to the page, but if we will open our React tools, we will get an error.
- We must apply '/' for tags that has no closing tags. In HTML5 we could have single tags without closing slash, for example `<br>` or `<input>`, but in JSX we must specify the closing '\', so it will be `<br />` and `<input />`, otherwise we will get errors and the compiler will fail to compile.
- The JSX we `return` must return a single parent element, meaning we cannot return multiple elements. However, inside that single parent element, we could have as many nested elements as we would like. This is per with the JavaScript rules, since we could return only a single value per function.
  
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