<!-- markdownlint-disable MD010-->

# Section 3

## CSS In React (Section 3, lecture 19)

We have few options when it comes down to styling JSX and finally displaying the styles in the DOM.

### JSX inline styling

The first option is using inline styles in the JSX of the component. We need to use the `style` attribute on the element we want to style, and to set it we have to use double curly braces `{{}}`, inside of it we input the properties, and we need to remember that it is still JavaScript under the hood, and so we would not pass properties with a hyphen (-) like in regular CSS, but we have to camelCase them. We set properties like `color`, `fontSize`, and as for the values, we have to put them between quotes. To state number of properties, we will separate them with a coma.

```js
const Header = props => {
	const { branding } = props;
	return (
		<div>
			<h1 style={{ color: 'tomato', fontSize: '50px' }}>{branding}</h1>
		</div>
	);
};
```

### Style variable

Another option is to our styles inside a variable named `headStyle` that will hold the values of the style attribute inside of an object. Inside the variable we will pass on the property and the values, like we did in the inline styling. Then we could just pass on `headingStyle` as the value of the `style` attribute, and it will take the same effect in the DOM.

```js
const Header = props => {
	const { branding } = props;
	return (
		<div>
			<h1 style={headingStyle}>{branding}</h1>
		</div>
	);
};

const headingStyle = {
	color: 'tomato',
	fontSize: '50px',
};
```

### Separate CSS file

Another option is to create a separate CSS file that will hold the styles of a specific component, essentially making that each component will have its own CSS file. For example, we'll create a file called `contact.css`, inside we will pass some regular CSS syntax styles for the Contact componenet.

```css
h4 {
	color: blue;
	text-transform: uppercase;
}
```

then we could link it to the component file with `import`. This will work thanks to the webpack CSS loader that is working behind the scenes as we set the app with Create React App.

```js
import './contact.css';
```

And this will apply the styles set in `contact.css` to `contact.js`.

Throughtout the course we will not be using the separate CSS file, but we will use global styles in one file called `App.css` that is already available with the generation of our app with he Create React App. In this specific project, we will be mostly relying on Bootstrap for the styling.

## Adding Bootstrap (Section 3, lecture 19)

We will be using Bootstrap library to make a nice looking UI fast, and without focusing too much on writing a lot of CSS to make a decent looking app. First we will install bootstrap in our app with npm, typing `npm i bootstrap`, saving it in our app as a dependency. Once it was installed, we can go to `App.js` and `import` Bootstrap from the `node_modules` with `import 'bootstrap/dist/css/bootstrap.min.css';`. Saving this already gives us a small change in the UI by chaning some fonts, margins and paddings.

### Creating a navbar from the header componenet

In the `Header.js` file we will replace the `<div>` tag with the `<nav>` tag as the parent container, and give it a few Bootstrap classes: `<nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0"></nav>`. Inside we put `<div className="container">`, inside of it have an anchor tag which we put the branding prop inside of it `<a href="/" className="navbar-branding">{branding}</a>`, next up we have `<ul className="navbar-nav mr-auto"></ul>` and inside of it `<li className="nav-item">Home</li>`, that holds `<a className="nav-link" href="/">`. These in turn will output a nice looking navbar. We will only have a 'home' link for now, and later we will add some more links for the navbar.

```js
const Header = props => {
	const { branding } = props;
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
			<div className="container">
				<a href="/" className="navbar-brand">
					{branding}
				</a>
				<div>
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<a href="/" className="nav-link">
								home
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
```

### Styling the contacts

We will first put `className= card card-body mb-3` for the paprent `<div>` of the contact component. The `<ul>` will get a `className="list-group"` and every `<li>` will have `className="list-group-item"`. This will create a nic looking cards.

```js
class Contact extends Component {
	render() {
		const { name, email, phone } = this.props;
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

Next up we would like to put a container for anything under the navbar so all the contact items will be more centered and not stretched all the way to the end. To do that, we will simply go to the `App.js` file and put `<div className="container">` under the `Header` and between all of the `Contact` items.

```js
function App() {
	return (
		<div className="App">
			<Header branding="Contact Manager" />
			<div className="container">
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
		</div>
	);
}
```
