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
