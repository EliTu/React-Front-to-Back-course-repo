<!-- markdownlint-disable MD010 -->

# Section 4 - State & The Context API

## Changing `state` from another component (Section 4, lecture 24)

The next feature we would like to add is the ability to delete a contact, by pressing on an 'X' sign that we will place in using FontAwesome. This is a bit tough, because right now, without using any global state, the `Contact` component is not where the state is, which located at the `Contacts` component, its parent element. We would like to create a delete button that will have an event handler attached to it, and upon clicking will modify the `state` and remove that contact, based on its ID. Basically, because how the `state` works now in app, we will need to assign the event handler as a prop and pass it up to `Contacts`, where we would be able to access the `Contacts` state and modify it. This is how we would do it without a global state system like Context or Redux.

### Creating an 'X' button

First thing we would do is to add a pointer icon to the drawer arrow so we will have a better input for when clicking the arrow button. We will use inline styles to add the CSS property right inside the JSX, this could be done with the `style` prop, similar to HTML, and we will pass on the style rules inside a double curly braces: {{}}, and the value should be inside quotes.

```js
<i
	onClick={this.handleOpenClick}
	className="fas fa-sort-down"
	style={{ cursor: 'pointer', marginLeft: '0.5rem' }}
/>
```

As for the delete button, we will put it under the arrow icon, and use FontAwesome to get the relevant X icon with `i.fas.fa-times`. We will also style it, give it a cursor pointer, put it oo the very right of the input field with `float`, and give it a color.

```js
<i
	className="fas fa-times"
	style={{
		cursor: 'pointer',
		float: 'right',
		color: 'tomato',
	}}
/>
```

### Adding the click handler

We will add it right after the `style` prop, like before, using `onClick`, and since we will be setting the actual delete function, that would basically setting the `state`, we will have an access to the callback function from `props`, as it being passed from `Contacts`.

```js
<i
	className="fas fa-times"
	style={{
		cursor: 'pointer',
		float: 'right',
		color: 'tomato',
	}}
	onClick={() => handleDeleteClick()}
/>
```

Since we will be getting `handleDeleteClick` from the `props`, we will also want to set its PropType, and so we will do it right after the `contact` prop we already have. Because it is a function, we will set its `PropTypes` to `func`.

```js
Contact.propTypes = {
	contact: PropTypes.object.isRequired,
	handleDeleteClick: PropTypes.func.isRequired,
};
```

At this point, if we will look in the React dev tools we will get a warning that says that `handleDeleteClick` is marked as required be its value is `undefined`, and that is because we haven't passed it as a `prop` as of yet.

### Adding the handler to the `prop` and defining the callback function

Now we can go to `Contacts` and add the `handleDeleteClick` as a `prop` of the of the `Contacts` component, inside we would like to pass on a callback function, `deleteContact`, that will be fired on a click of the delete button, and as this is a function that is part of `Contacts`, we will use `this`. This function will take the contact ID as an argument, as set in the `state`, and will use this ID to modify the `state` to reflect the removal of a contact. This will also remove the warning that was prompt by the PropTypes.

```js
<React.Fragment>
	{contacts.map(contact => (
		<Contact
			key={contact.id}
			contact={contact}
			handleDeleteClick={() => this.deleteContact(contact.id)}
		/>
	))}
</React.Fragment>
```

Now we can define `deleteContact` and has access to the `state`, as this is the component that holds the `state` of all the contacts in our app. First of all, we will deconstruct `contacts` from the `state` so we would be able to loop over the array of contacts, then we will create a new variable named `newContacts` which will `return` a new array that contains all the contacts that does not match the `id` that is being passed in the argument,thus containing a modified array without the deleted contact.

Then we could use `setState` to modify our state to match the `newContacts` array. Basically we will be matching between the 'old' `state` and the 'new' `state`, essentially removing the contact that wasn't filtered out of the original `contacts` array, and removing him both from `state` and the UI.

```js
deleteContact = id => {
	const { contacts } = this.state;

	const newContacts = contacts.filter(contact => contact.id !== id);

	this.setState({
		contacts: newContacts,
	});
};
```

Now, we can try and click on the delete button in the UI, upon a click the contact dissapears both from the UI and from the `state`. Whenever we refresh the app, they will be back since the contacts in the `state` are hardcoded (for now). This means we can delete contacts by using a button on the `Contact` component, and through propagating to the parent element, `Contacts` we are able to access he state and remove a contact.

If this was embedded 3 levels down, this whole process would've been much more complicated and annoying. Or another scenario, is if we wanted to share `state` between componenets, it would be very hard. In this scenario, state manager tools come in, like Context and Redux. Though for smaller apps Context could be better, while in larger apps Redux is the way to go.

## Using The Context API & Provider State(Section 4, lecture 25)

In the last lecture we've the delete functionality, but it was rather difficult since we had to set the `state` from the `Contacts` componenet in order to be able to implement a removal of a singal `Contact` component, basically propagating up to the parent element.

In order to make this process easier, we will implement the Context API, so we could have a single place where we could store our `state` and easily share it between different components.

### Creating the Context

First we will create a separate file to hold the content of the Context API, outside of the `componenets` folder, but inside the `src` folder. We'll create a file called `context.js`.

We can look at the Context as our store, or a provider, with an actual class named 'Provider', which we will wrap around the entire app inside thr `App.js` file.

We will first `import React` and `{Component}` as we ususally do, and then go ahead and initialize Context by declaring `const Context = React.createContext()`.

```js
import React, { Component } from 'react';

const Context = React.createContext();
```

Now we can create a class based componenet which we will call `Provider`, and it will be a standard React component, and inside we will place our 'global' `state`, which we want to pull out of `Contacts` and place it within the `Provider` component.

```js
export class Provider extends Component {
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
}
```

This component will also hold a `render` function, which will `return` a JSX object with the name `<Context.Provider>`, as a prop we will pass `value` and it can take anything that we want to be available throughout our application as a value, and so in our case we will pass the `this.state` so we can have access to the `state` from anywhere we would like to consume it. Between the `<Context.Provider>` tags we will pass `{this.props.children}`.

```js
export class Provider extends Component {
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

	render() {
		return (
			<Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>
		);
	}
}
```

### Exporting a Consumer

At the end, we would like to `export` a Consumer, which is what will be used inside any component that we want to access the `state` or any action methods, that will be used to set the `state` of the Context.

```js
export const Consumer = Context.Consumer;
```

### Importing and inputing the `Provider` in the `App.js` file

We will first use `import` to get access to the `Provider` class.

```js
import { Provider } from './context';
```

Now we will have to wrap the entire app, including the main parent `<div>` tags, with the `<Provider>` component tags.

```js
function App() {
	return (
		<Provider>
			<div className="App">
				<Header branding="Contact Manager" />
				<div className="container">
					<Contacts />
				</div>
			</div>
		</Provider>
	);
}
```

### Importing and inputing the `Consumer` in the component

Now that we have settled the `Provider` in the main App component, now we can use the `Consumer` in the different app components to allow them access the state. We would `import` the `Consumer` into `Contacts`, where the state used to live in, and so we will grant that component access to `state` again.

```js
import { Consumer } from '../context';
```

What we would render from the component will basically remain the same, the only thing we will change in the component is how we access the `state` and get the contacts out of the state. The `return` of the `render` function will return the `Consumer` tag, inside of it we will have an expression that returns a `value`, which is the same `value` prop we have in the `Context.Provider`, which we set to `this.state`, and so this will give us an access to the value of `value`, the state that we put in the Context, and so we would be able to access `value.contacts`, for example. To get an easier access to the contacts, we will fist destructure it out of `value`, right before the `return` expression.

```js
render() {
		return (
			<Consumer>

				{value => {
					const { contacts } = value;

					return ();
				}}
			</Consumer>
		);
	}
```

Now what we would like to `return` is basically the whole fragment, and so we will put it all back into the `return` statement inside of the `<Consumer>` tag.

```js
	render() {
		return (
			<Consumer>

				{value => {
					const { contacts } = value;

					return (
						<React.Fragment>
							{contacts.map(contact => (
								<Contact
									key={contact.id}
									contact={contact}
									handleDeleteClick={() =>
										this.deleteContact(contact.id)
									}
								/>
							))}
						</React.Fragment>
					);

				}}

			</Consumer>
		);
	}
```

Now as we reload the app, the contacts come back rendered to the page as they were, meaning that the component does read the state that is passed to the Context. Though, if we will try to delete one of the contacts, the app would break, and that is because we will also need refactor the `handleDeleteClick` function, as it still operates as if we take the `state` of the `Contacts` component, which isn't there anymore. In order to manipulate the `state` of the COntext, we will have to create a Reducer function with actions, which are basically manipulate the state, and the Reducer would use these to handle the change of the state.

## Adding a Context Reducer for Actions (Section 4, lecture 26)
