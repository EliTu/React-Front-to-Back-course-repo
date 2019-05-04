<!-- markdownlint-disable MD010 -->

# Section 4 - State & Context API

## Events In React (Section 4, lecture 22)

We would like to create an event handler that will listen to click events on a small arrow icon that we will set, and it will trigger an opening and closing of the `Contact` component details.

To get the icon we will use FontAwesome library to get the icon. On their main site we will copy the `<link>` code and paste it inside the `index.html` file, inside the `<head>` element.

Now we can create an icon using FontAwesome. We would like to place it inside the `Contact` component, right next to the name that is marked with the `<h4>` tag. We specify it with the `i.fas.fa-sort-down`, and this will create the `<i>` tag with the relevant classes.

```js
<h4>
	{name} <i onClick={this.handleClick} className="fas fa-sort-down" />
</h4>
```

### Setting up the event listener

The way we set up event listeners in React, is by placing them inline as a prop, within the element we're targeting. In our case we're targeting the arrow, and so we will place the event listener in the `<i>` tag. We will be listening to a `click` event, and so in React we will specify it with the syntax of `on<Event>`, so in our case its `onClick`, then inside we can pass the logic. Usually, we pass in a callback method, that we specify outside the `render` method. We could also directly pass on logic inside of the curly braces, for example set an inline arrow method, but that's less recommended.

```js
<i onClick={this.handleClick} className="fas fa-sort-down" />
```

We pass on `this` as well, because it is reffering to a method within this class.

### Setting up `handleClick`

We go above the `render` method and initiate a method called `handleClick`, which we already set as the callback method of the `onClick` prop. Because this is a custom method, meaning that it does not directly connected to the `Component` class we're extending from, like the `render` method for example, so the `this` value will not be defined within the method, and to avoid the wierd `this` keyword behavior. we will set it as an arrow function, which will allow us to use the `this` keyword without an error.

```js
// Incorrect:
function handleClick() {}
// Correct:
handleClick = () => {};
```

On a side note: We can use the `bind` method to bind `this` to a specific method, making us able to use `this` while maintaning the `function` keyword, but this makes the code looks more clumsy and it is unnecessary, as long as we have the arrow function option.

We will use the `this` keyword as we will set up `state` that will hold a boolean value, to check if the the `Contact` drawer is opened or closed, and when we click we would like to access that state, and be able to change it.

And so we will add an empty `state` object for that purpose, which we will set in the future.

```js
state = {};

handleClick = () => {};
```

To test we will simply pass a console log, click on the little arrow and see if we get the (empty) `state` object.

```js
state = {};

handleClick = () => console.log(this.state); // {}
```

Another thing that we can pass here, similarly to vanilla JavaScript, is the `event` object, which is an object of the event listener, and we can pass it as a parameter in the callback function and it will give us access to various properties of the `event`, for example `target`, which will give us access to the element that is being clicked.

```js
state = {};

handleClick = e => console.log(e.target); // <i ... >
```

### Passing parameters into the inline event listener

If we would like to pass on an argument into the event listener, which will usually be something like some sort of ID, we could do this in several ways. The easiest and cleanest way is again to use the arrow function and pass on the callback function call with parantheses, and inside insert the argument.

```js
<i onClick={() => this.handleClick(id)} className="fas fa-sort-down" />
```

Another way is to use the `bind` method, and to bind `this`, and in the second argument pass the argument we will pass on to the callback function.

```js
<i onClick={this.handleClick.bind(this, id)} className="fas fa-sort-down" />
```

## Changing State (Section 4, lecture 22)

### `React.Fragment`

Before we will look at changing the `state` of a component, we would like to address a small thing in our `Contacts` component, and that is the `<div>` that is being rendered with the component. We don't actually need it for anything, it is not holding any classes, props or anything that justifying us leaving it there. And so, to clean our output code a bit and not output unnecessary elements, we will remove it.

But as we've said before, each JSX component that is being rendered to the page must have a parent element, and so instead of rendering `<div>` we will use something React 16 introduced, and that is Fragments. Fragments are kind of like a pseudo-element, that will not be actually added to the DOM. And so, to utilize that, we will pass `<React.Fragment>` instead of `<div>`. If we reload and look at the elements in the dev tools, we will see that the `<div>` tags are gone, and we're simply rendering `Contacts` with the 3 `Contact` elements.

### Setting up the `state`

Back to the `Contact` component, we will add a variable to the `state` which will hold a boolean value, and we will use this variable to check if the contact drawer is opened or closed. We will set it with the default of `false`, as we would like all of our contacts to be closed initially.

```js
state = {
	isContactOpen: false,
};
```

### Updating the `state`

Now we go back to the `handleClick` callback function and pass on the logic that will happen when we click on the arrow. When it comes to updating the `state`, we need to remember that `state` is immutable, and any attempt to directly mutate the state object will result in errors. And so, to change the `state` in React, we use the `setState` method.

And so we will use `this.setState`, as we're handling the `state` of the component, and inside the parentheses we pass curly braces and update the state variable. Since we're interested in making the open-closed state toggled, we will not simply set it to `false`, but we will set it to the NOT condition of the current `state`, meaning that on click it will allways toggle to the opposite value to what is was set at that moment.

```js
handleClick = () => {
	this.setState({
		isContactOpen: !this.state.isContactOpen,
	});
};
```

### Toggling the contact drawer in the UI

Now that we have the functions set up, we would like to update the UI to hide the contact details, and display them only upon a click on the arrow, and close it again upon another click. We will do that in the `render` function, and we will use our boolean from the `state`. To access it, we will use destructuring to get the value of the `usContactOpen`.

```js
const { isContactOpen } = this.state;
```

Now that we have the boolean that is by default set to `false`, what we can do is after the `<h4>` tag that holds the name and the button, open a JavaScript expression with curly braces, and insert the rest of the rendered tags inside of it. Before the tags we will pass the boolean, if the boolean is `true` then the tags will render, if not, they will stay "hidden".

We can do this in different ways: Use the `&&` operator to check if `isContactOpen` is true:

```js
return (
	<div className="card card-body mb-3">
		<h4>
			{name} <i onClick={this.handleClick} className="fas fa-sort-down" />
		</h4>{' '}
		{isContactOpen && (
			<ul className="list-group">
				<li className="list-group-item">{email}</li>
				<li className="list-group-item">{phone}</li>
			</ul>
		)}
	</div>
);
```

Another way is to use the ternary operator to check if `isContactOpen` is true:

```js
return (
	<div className="card card-body mb-3">
		<h4>
			{name} <i onClick={this.handleClick} className="fas fa-sort-down" />
		</h4>{' '}
		{isContactOpen ? (
			<ul className="list-group">
				<li className="list-group-item">{email}</li>
				<li className="list-group-item">{phone}</li>
			</ul>
		) : null}
	</div>
);
```
