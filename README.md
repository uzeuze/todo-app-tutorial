# Building a To Do List App with React

This is a step-by-step tutorial that teaches you how to build to-do list app with React. After completing this tutorial you will get basic understanding of:

* How to bootstrap a React project with `create-react-app` command-line utility,  
* React-Bootstrap which seems the most popular UI framework.

## Create a new App

Install Create React App globally.

`npm install -g create-react-app`

Use Node >= 6 and npm >= 3 for faster installation speed and better disk usage. This tool doesn’t assume a Node backend. The Node installation is only required for the build tools that rely on it locally, such as Webpack and Babel.

To create a new app, run:

```
create-react-app todo_app
cd todo_app
```

Run the app in development mode with 'npm start' command. Open http://localhost:3000 to view it in the browser.

Change title tag to 'To-Do App' in public/index.html.

## Adding Bootstrap

React Bootstrap is a popular library for integrating Bootstrap with React apps.
Install React Bootstrap and Bootstrap from NPM. React Bootstrap does not include Bootstrap CSS so this needs to be installed as well:

```
npm install react-bootstrap --save
npm install bootstrap@3 --save
```

Import Bootstrap CSS and optionally Bootstrap theme CSS in the src/index.js file:

```
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
```
