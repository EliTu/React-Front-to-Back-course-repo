<!--markdownlint-disable MD010 -->

# Section 4 - State & Context API

## Creating State (Section4, lecture 21)

We will start by dealing with state, and embedding components into other componenets. Right now we have a component named `Contact`, inside of it we input all of our contacts that we want to display in our UI. We would like to have a state that will hold all of our different contacts, basically an object that will have all of our contacts and their props: name, email and a phone number. We would then would like to loop over the contacts inside the `Contacts` componenet and output a `Contact` component for each one. So for that, we will create a new component named `Contacts`, which will hold the contacts state.

### The new `Contacts` component

This will definitely be a class based component, because it will have state. Once again, we will initialize with the `rce` snippet command, which will create the React componenet skeleton format, with the `default` export at the bottom.

```js
import React, { Component } from 'react';

export class Contacts extends Component {
	render() {
		return <div />;
	}
}

export default Contacts;
```

Now we can use a `constructor` function, inside of it a `super` function as this is a subclass, and inside of the `constructor` we will add our state with `this.state`. The state of this component will be an object that takes an array of contact objects, all hold the properties of the contacts we've seen before. Right now we will hardcode some inside of our state. We will also want to add an `id` property for each contact, so each will have a unique ID, as with any real item in a real app that deals with a database of objects.

```js
export class Contacts extends Component {
	constructor() {
		super();
		this.state = {
			contacts: [
				{
					id: 1,
					name: 'Nickolas Cage',
					email: 'nicksc@gmail.com',
					phone: '555-555-5555',
				},
				{
					id: 2,
					name: 'Danny DeVito',
					email: 'dand@gmail.com',
					phone: '555-222-5555',
				},
				{
					id: 3,
					name: 'William DeFoe',
					email: 'willied@gmail.com',
					phone: '555-555-3366',
				},
			],
		};
	}
}
```

### The `render` function

Now that we have our `state` set, we have our 3 hardcoded contacts, we will go to the `render` function, that responsible for rendering the JSX, and we would basically like to loop over the contacts in the `state` and output each one of them into a `Contact` component, inserting the properties through the object.

We will first go ahead and use destructuring to get the contacts from the `state` and put them into a `contacts` variable, which will be an array of the contacts.

```js
const { contacts } = this.state;
```

Now inside the `<div>` we can perform the loop, and in React we would usually do this with the `map` array function. We will initialize a new JavaScript statement first with 2 curly braces, and then pass on `contacts.map()`. Inside the parentheses we will pass the current element, and we would want to return what we want to render on the UI for each component, for now we will just `return` an `<h1>` with the contact name by passing `{component.name}`.

```js
	render() {
		const { contacts } = this.state;

		return (
			<div>
				{contacts.map(contact => (
					<h1>{contact.name}</h1>
				))}
			</div>
		);
	}
```

### Displaying the `Contacts` component in the UI

Now we can include it in `App.js` so we could display the result in the UI. We will first swap the `Contact` component we're importing with `Contacts`, as this is the component we will display in the UI, and `Contact` will be used just for allowing us to display contacts with the `Contacts` component.

```js
import Contacts from './componenets/Contacts';
```

Now we can get rid of the hardcoded components we set in the `render` function of `App.js` and bring in `<Contacts />`, as what we would like to render to the UI.

```js
function App() {
	return (
		<div className="App">
			<Header branding="Contact Manager" />
			<div className="container">
				<Contacts />
			</div>
		</div>
	);
}
```

Now we get the names of the contacts we set in the `state` of the `Contacts` component in the app UI. Ultimately, we would like to display the whole component card with the details of the component, including the email, phone etc, and so we will go and do that.

### Setting the `Contact` component inside `Contacts`

We will go to `Contacts` and first use `imp` snippet to import `Contact`. Now that we could use the `Contact` component, that basically renders the contact card, instead of returning an `<h1>` with the contact name, we would like to to pass `<Contact />`, and since it takes some props, we will have to insert them too, using the data we have in our `state`.

```js
	render() {
		const { contacts } = this.state;

		return (
			<div>
				{contacts.map(contact => (
                    <Contact
                    name={contact.name}
                    email={contact.email}
                    phone={contact.phone} />
				))}
			</div>
		);
	}
```

Now we're looping through the `state`, grabbing each contact object and injecting its data into the `Contact` component, which renders it to the page, through the `App.js`.

### The unique `key` warning

At this point, if we will look in our console and the React dev tools, we will see a warning that states: "Each child in an array or iterator should have a unique "key" prop". Basically we need to input a `key` prop for each contact, which supposed to be unique, and so we could do just that with the `id` property we set for each contact, and so we will input `key={contact.id}`, and that should solve this issue.

```js
	render() {
		const { contacts } = this.state;

		return (
			<div>
				{contacts.map(contact => (
                    <Contact
                    key={contact.id}
                    name={contact.name}
                    email={contact.email}
                    phone={contact.phone} />
				))}
			</div>
		);
	}
```

### simplifying some of code

There is an easier way to set our `state` actually. We do not need the `constructor` function to set the state, as we will need it only for creating instacnes or something of that sort, and so we will remove it and just leave `state=...`, and it will work the same way, and we can confirm this by looking at the React dev tools and see that `<Contacts>` holds an array inside its `state`.

```js
state = {
	contacts: [
		{
			id: 1,
			name: 'Nickolas Cage',
			email: 'nicksc@gmail.com',
			phone: '555-555-5555',
		},
		{
			id: 2,
			name: 'Danny DeVito',
			email: 'dand@gmail.com',
			phone: '555-222-5555',
		},
		{
			id: 3,
			name: 'William DeFoe',
			email: 'willied@gmail.com',
			phone: '555-555-3366',
		},
	],
};
```

Another thing we could do to clean up the code a bit is inside the `Contacts` component `render` function, instead of passing each prop, we could simply pass an entire individual contact that represented by the `map` method current element, that's already holding all these props. But we would like to leave the `key` property there, as it is not part of the `Contact` component props.

```js
	render() {
		const { contacts } = this.state;

		return (
			<div>
				{contacts.map(contact => (
					<Contact key={contact.id} contact={contact} />
				))}
			</div>
		);
	}
```

Now we will need to fix the `Contact` component `render`, since it expects us to `return` each individual prop, and not the whole component. To do this we will simply have to adjust the destructuring and what is being rendered. For the destructuring, we will pass in `contact` to `this.props` so the `render` function could have access to the value of the `contact` in the props.

```js
lass Contact extends Component {
	render() {
		const { name, email, phone } = this.props.contact;
		return (
			<div className="card card-body mb-3">
				<h4>{name}</h4>
				<ul className="list-group">
					<li className="list-group-item">{email}</li>
					<li className="list-group-item">{phone}</li>
				</ul>
			</div>
		);
	}
}
```

Now we get a warning that states an error in the PropTypes, and that is because we're no longer having `name`, `email` and `phone` individually as our props, but a `contact` object instead, we will have to adjust that too. We will simply pass `contact` as the PropType and set its data type to `object`, since its not longer a string.

```js
Contact.propTypes = {
	contact: PropTypes.object.isRequired,
};
```
