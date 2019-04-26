# Section 3 - Componenets, JSX and Props

## Thinking In Components (Section 3, lecture 12)

We need to get into the habit of thinking in the React way, meaning looking at React generated apps and websites as a bundle of separate componenets that communicate with each other, instead of a page with HTML and some JavaScript code to make it interactive.

### How the React app works

React is different in that it is component based. The output of the code is part of the component, and each componenet also includes our functionality (JavaScript), state (the data of that component) and props (custom component properties). If we look at a Twitter profile for example, we won't look at it as a single page of HTML, CSS and JavaScript, but a collection of different component bundled together at the deployment phase. Each section of the page is its own component: Nav bar component, Header component, Profile bio component, sign up component, Twitter feed component that nest many post components, etc.

### State

We will briefly mention what is state: It's basically a piece of data attached to a component. For example, the profile bio component holds a few pieces of data in its state: Name, username, a brief introduction, links, photos etc. They are all part of that that specific component state, and if we will go to a different Twitter profile, that profile bio component state will be different, since it holds a different set of data.

### 'Smart components' and 'Dumb componenets'

We classify components as 'smart' and 'dumb' by if they hold state or not. Smart components are components that hold state, and therefor could have a change in them, while dumb components do not hold any state. For example, the profile bio component is a smart component since it holds the data about the user and changes it according to the user, while the sign up component is a dumb component because it does not hold any data, but a simple text field and an input button that sends us to the registration page, it does not hold any data and will be the same on every single Twitter page.

With a dumb component, we could simply use a single `function`, a stateless functional component, but any smart component will be its own `Class`, and inside that `Class` it will also hold the state.

### Sharing state between components - Redux and the Context API

In many cases we will need to share state between components, for example if the Twitter feed component needs to access the information that the profile bio component holds, or a component on one route needs to access the state of a different component on a different route. In that case that's where a state managing tools come into play, like Redux or the Context API. They allow us to have 'application level state', basically allowing us to keep the state in the application level, and then from any component we need to access that state we could do that easily by reaching to the application state.

### a look at the Contact Manager project and its componenets

In the app that we will be building, the Contact Manager, we will have different componenets. For example, we have the header component, which is a dumb component since it does not hold any state, just a nav bar with some links. We have the contacts component, which holds state of all the contacts, and thus it is a smart componenet. Inside the contacts component we're basically looping through the state and outputing a contact component, which is a singular contact that also holds its own state. The way it gets its data is though something called 'props', a property: it takes a `contact` property which is an object that contains all the information of that contact.

Each one of those contacts hold a state that is called `showContactInfo`, basically a boolean that could be set between deisplaying and hiding the contact information. In React we could have events that will enable us to manipulate the state of the component, for example: The default value of the `showContactInfo` is `false`, meaning the information is hidden, if we click on the contact in the DOM, it will trigger an event and set the state to `true`, showing the information on the DOM. Basically by clicking on the component we toggle the state between `true` and `false`, ,and it will render it to the UI.

Another smart component we have in the app is the Add contact component, which hold different state properties like `name`, `phone`, `email` and `error`. Every input is attached to piece of state in that component. The `error` component basically holds an object that inputs errors that occur while trying to input a contact, like illegal keys, empty submits etc. If we will look in the React tools, we could see those state and what they are holding, if we will go to the `name` input field and start typing, we will see the state of `name` being updated dynamically with every key stroke.

### What is JSX? (Section 3, lecture 13)
