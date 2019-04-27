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
