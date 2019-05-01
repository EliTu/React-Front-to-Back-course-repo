# Section 3 - Componenets, JSX & Props

## Creating Your First Component (Section 3, lecture 15)

Now we will create our own custom component, which is seperated from the main App componenet we've been working with so far.
Inside the `src` folder we will want to create a new folder called `componenets`, which will host all of our custom components, and we will create a file named `Contact.js`. **Important to note that we specify our component files, as well as the class name we're exporting, with a capital first letter, and that is because lowercase tag names are considered to be HTML tags, and so the `React.createElement` function will generate an HTML string, and not a JavaScript componenet that can be rendered out.**

We would want to basically mimic the same structure that the Create React App generated for us in the main App component: We want to `import` the required React files, and create a class of a new component. Since we have the "ES7 React snippets" extention, we could do it easily with the `rcc` or `rce` abbreviation, and it will generate a complete class based component skeleton. We input `rcc` into our `Contact.js` file and generate the component, complete with the `import` statement, class and `render()` function.

```js
import React, { Component } from 'react';

export default class Contact extends Component {
	render() {
		return <div />;
	}
}
```

This looks very similar to our App component, only here we get to `export` our class directly in the class declaration line, while in our App component we `export` the class at the bottom, and that is basically the better practice, since that way, we could keep track of our components and exports, and so we will move it to the bottom. **It will be better to use `rce` snipper next time, since it will generate the same class based component but with the `export` at the bottom**.

```js
import React, { Component } from 'react';

class Contact extends Component {
	render() {
		return <div />;
	}
}

export default Contact;
```

### Inputing some JSX into the component

We will input some simple JSX into the component render function. It already comes with a `<div>` tag by default, so inside of it we will just add a `<h4>` with a name, a `<ul>` and inside of it 2 `<li>` tags that contain email and a phone number. This for now will just be a hardcoded data, later we will change the data into information coming from `state`.

```js
import React, { Component } from 'react';

class Contact extends Component {
	render() {
		return (
			<div>
				<h4>Aegon Targeryan</h4>
				<ul>
					<li>Email: jonsnow@gmail.com</li>
					<li>Phone: 123-456-321</li>
				</ul>
			</div>
		);
	}
}

export default Contact;
```

### Displaying the component in our application

In order to display this component in our application, we have to bring it in into our main App component, which is our "meeting place" for all the components. And so, back in the `App.js` file, we will first need to `import` our component, and sicne we're exporting it as `default`, we do not need to put our curly braces around it.

```js
import Contact from './componenets/Contact';
```

Now we can use this component in our App class and input the whole component inside the `render` function. Under the `<h1>` tag we simply input `<Contact />`, and that way the Contact component will be rendered on our page.

```js
import React from 'react';
import './App.css';
import Contact from './componenets/Contact';

function App() {
	return (
		<div className="App">
			<h1>The App Component</h1>
			<Contact />
		</div>
	);
}

export default App;
```

We can actually put as many `<Contact />` as we would like and it will render more contacts into the DOM. If we look in the React tools, we could see that we have the contact components and their content, later we will also be able to see their `props` and `state` too.

## Functional Componenets (Section 3, lecture 15)

Now we would want to create a functional component for the header section of the app, which is basically a dumb component that does not hold `state`, in other words does not have its own inner data but just displaying static markup though JSX, and for now it will only hold an `<h1>`.

### Generating a functional component

And so we will go to our `components` folder and create `Header.js` file. Because we want to create a functional component, and not a class based component, we will use the `rafce` abbreviation to create an arrow function based component that also `esport` itself at the bottom.

```js
import React from 'react';

const Header = () => {
	return <div />;
};

export default Header;
```

We will then add an `<h1>` tag that contains the name of the app inside of the parent `<div>`.

```js
import React from 'react';

const Header = () => {
	return (
		<div>
			<h1>Contact manager</h1>
		</div>
	);
};

export default Header;
```

### Importing the functional component to `App.js`

Now we can `import` the header functional component to the main `App.js` file and put it into the main component `render` function. We do that just as we did with the `Contact` component. We will then would like to input `<Header />` above the `<Contact />` component. Now our `<h1>` will be displayed above the contact in the DOM.

```js
import React from 'react';
import './App.css';
import Contact from './componenets/Contact';
import Header from './componenets/Header';

function App() {
	return (
		<div className="App">
			<Header />
			<Contact />
		</div>
	);
}

export default App;
```
