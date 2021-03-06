<!-- markdownlint-disable MD010 -->

# Section 3

## Working with Props (Section 3, lecture 17)

Props are an abbreviation of properties, basically talking about properties of JSX tags, and we can pass them into our JSX components like HTML attributes, like we saw in our main `App` class, the parent div has a `className` prop. We will first set prop for our `Header` component, and we will simply want to have the `<h1>` text as the prop value. We can set the prop with whatever name we want, this time we will pass `branding` and give it the value of `Contact Manager`.

```js
function App() {
	return (
		<div className="App">
			<Header branding="Contact Manager" />
			<Contact />
		</div>
	);
}
```

### Accessing props in functional components

The way we access props are not entirely the same between functional components and class based components. To get the props of `Header`, which is our functional component, we pass it as the argument of the `Header` function, and then we could go to the `<h1>` instead of the hardcoded text we will pass `{props.branding}`, as the "branding" comes from the props name we passed.

```js
const Header = props => {
	return (
		<div>
			<h1>{props.branding}</h1>
		</div>
	);
};
```

If we reload the page, we will get the same result as we had when we had the hardcoded text. If we go back to the `App.js` file and change the value of `branding`, it will also get updated in the component and be displayed on the DOM. If we will look at the React dev tools, we can see that the `Header` props value got updated to `branding: Contact Manager`

### Accessing props in class based components

Currently our contacts have hardcoded data inside of them, which we don't really want. We would probably want to pass the data the component displays as props, and so we will go to `App.js` and add `name`, `email` and `phone` as properties, and set their values as the contact we set before.

```js
function App() {
	return (
		<div className="App">
			<Header branding="Contact Manager" />
			<Contact
				name="Aegon Targeryan"
				email="jonsnow@gmail.com"
				phone="123-456-321"
			/>
		</div>
	);
}
```

Now we will go to `Contact.js`, and as this is a class component, we access the props using the `this` keyword, and so we will access them by inputing `this.props.name` for example.

```js
class Contact extends Component {
	render() {
		return (
			<div>
				<h4>{this.props.name}</h4>
				<ul>
					<li>{this.props.email}</li>
					<li>{this.props.phone}</li>
				</ul>
			</div>
		);
	}
}
```

We reload the page and get the same exact result as we had before with the hardcoded data. We look at the React dev tools and see the existing props has been updated. We can also go ahead and create another component with different props values in the `App.js` file, this way we will have 2 different components with 2 different prop values.

```js
function App() {
	return (
		<div className="App">
			<Header branding="Contact Manager" />
			<Contact
				name="Aegon Targeryan"
				email="jonsnow@gmail.com"
				phone="123-456-321"
			/>
			<Contact
				name="Arya Stark"
				email="aryas@gmail.com"
				phone="123-456-789"
			/>
		</div>
	);
}
```

### Using ES6 destructuring to better access props

We could apply the ES6 destructuring feature to better access the props both in the functional component and in the class components. We can go to the `Contact.js` file and above the `return` statement we pass in destructuring statement and assign `name`, `email`, and `phone` out of the `this.props` object, like this: `const { name, email, phone } = this.props;`. Then we can simply replace the values with the destructured variables.

```js
class Contact extends Component {
	render() {
		const { name, email, phone } = this.props;
		return (
			<div>
				<h4>{name}</h4>
				<ul>
					<li>{email}</li>
					<li>{phone}</li>
				</ul>
			</div>
		);
	}
}
```

In the `Header.js` we do the same thing basically, we destructure `branding` out of `props` (this time no need for the `this` keyword), like this: `const { branding } =`,Then we apply it in the `return` statement data.

```js
const Header = props => {
	const { branding } = props;
	return (
		<div>
			<h1>{branding}</h1>
		</div>
	);
};
```

## Typechecking With PropTypes (Section 3, lecture 17)

### Setting default props

Default props are like default parameters in JavaScript, where we basically set a default value for a specific prop, so if anything happens to the value we set to the prop, we have this as a fallback value. A good candidate for a default prop is our header, since we would like to input a default value to be displayed in any way.

We go to the `Header.js` file and under the `Header` function, we set an object `Header.defaultProps` and inside of it, we pass `branding` and give it its default value, in our case we input `My App`.

```js
const Header = props => {
	const { branding } = props;
	return (
		<div>
			<h1>{branding}</h1>
		</div>
	);
};

Header.defaultProps = {
	branding: 'My App',
};
```

As long as we have a value for our prop, we won't see the default prop value, as the value we input to the prop overrides it, even an empty value, but if we are to remove the the entire prop we set in the `App.js`, we will see that the `<h1>` is changed to `My App`.

### Setting PropTypes

PropTypes are for validating the prop types we pass in, in order to have consistant data and to avoid unexpected errors that happen due to a gap between the expected prop type and the passed value.

To do that, we will first need to `import` a property called `PropTypes` from `prop-types`. With the snippets plugin we use, we can simply pass `impt`, and it will pass on the `import` request.

```js
import PropTypes from 'prop-types';
```

Next we go down under the `Header` function, above or bellow the `defaultProps` function, and pass on `Header.propTypes` object (prop with a lowcase 'p'). Inside of it we pass the prop name, and as for the value we pass the `PropType` property and then input the data type we expect the prop result to be, like `.string` and then add `.isRequired` to add the option to receive a warning in the React dev tools in case the wrong type is passed as the value.

```js
class Contact extends Component {
	render() {
		const { name, email, phone } = this.props;
		return (
			<div>
				<h4>{name}</h4>
				<ul>
					<li>{email}</li>
					<li>{phone}</li>
				</ul>
			</div>
		);
	}
}
Contact.propTypes = {
	name: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
};
```

If we are to pass on the a value that is different than the expected value, or change the existing value type to a different one, we will receive a warning in the dev tools console that states that we have a different value than what was expected.

### Setting `PropTypes` in the compinenet function

It is also possible to pass the PropTypes object inside the component function, as long as we set it as a `static` method. We can choose one way or the other. The same thing could be done with `defaultProps`.

```js
class Contact extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		phone: PropTypes.string.isRequired,
	};

	render() {
		const { name, email, phone } = this.props;
		return (
			<div>
				<h4>{name}</h4>
				<ul>
					<li>{email}</li>
					<li>{phone}</li>
				</ul>
			</div>
		);
	}
}

export default Contact;
```
