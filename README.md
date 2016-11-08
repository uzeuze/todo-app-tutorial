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

## Compose Components

####App Component

Update src/App.js file with the following code:

```javascript
import React, { Component } from 'react';
import Task from './Task.js';
import {Grid, Row, Col, Button, FormGroup, InputGroup, FormControl} from 'react-bootstrap';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        {_id: 1, text: 'Create a Github account', done: false},
        {_id: 2,  text: 'Follow uzeuze on Github', done: false},
        {_id: 3,  text: 'Create a Codepen account', done: false},
        {_id: 4,  text: 'Finish all tutorials', done: false}
      ],
      textValue: '',
      hideDone: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
  }

  handleChange(event) {
    this.setState({textValue: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.textValue) {
      let newTasks = this.state.tasks.slice();
      let text = this.state.textValue;
      let newId;
      if (newTasks.length >= 1) {
        newId = Math.max.apply(Math,newTasks.map(function(o){return o._id;})) + 1;
      } else {
        newId = 1;
      }
      newTasks.push({
        text: text.trim(),
        done: false,
        _id: newId
      });
      this.setState({
        tasks: newTasks,
        textValue: ''
      });
    }
  }

  toggleDone(id) {
    var newTasks = this.state.tasks.slice();
    newTasks.map((task) => {
      if(task._id === id) {
          task.done = !task.done;
      }
      return task;
    });
    this.setState({tasks: newTasks});
  }

  deleteTask(id) {
      let newTasks = this.state.tasks.slice();
      for(let i=0; i < newTasks.length; i++){
        if(newTasks[i]._id === id) {
          newTasks.splice(i, 1);
        }
      }
      this.setState({tasks: newTasks});
  }

  toggleHide() {
    this.setState({hideDone: !this.state.hideDone});
  }

  getIncompleteCount() {
    let tasks = this.state.tasks.slice();
    tasks = tasks.filter((task) => {
      return task.done === false;
    });
    return tasks.length;
  }

  render() {
    let taskArray;
    if (this.state.hideDone){
      taskArray = this.state.tasks.slice();
      taskArray = taskArray.filter((task) => {
        return task.done === false;
      });
    } else {
      taskArray = this.state.tasks;
    }
    let tasks = taskArray.map((task, index) => {
      return (
        <Task key={task._id}
              task={task}
              deleteTask={this.deleteTask.bind(this, task._id)}
              toggleDone={this.toggleDone.bind(this, task._id)}
        />
      );
    });
    return (
      <div className="App">
        <header className="App__header">
          <Grid fluid={true}>
            <Row>
              <Col sm={4}>
                <h1 className="header-title">To Do List ({this.getIncompleteCount()})</h1>
              </Col>
              <Col sm={8}>
                <Button className="button-hide" onClick={this.toggleHide}>
                  {this.state.hideDone ?
                    "SHOW COMPLETED TASKS"
                    :
                    "HIDE COMPLETED TASKS"
                  }
                </Button>
              </Col>
            </Row>
          </Grid>
        </header>

        <form className="App__form" onSubmit={this.handleSubmit} >
          <FormGroup>
            <InputGroup>
              <FormControl type="text"
                           className="task-input"
                           placeholder="Type to add new tasks"
                           value={this.state.textValue}
                           onChange={this.handleChange}
              />
              <InputGroup.Addon onClick={this.handleSubmit}>+</InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </form>

        <ul className="task-list">
          {tasks}
        </ul>
      </div>
    );
  }
}

export default App;
```

####Task Component

Create Task.js file in src folder and put below code inside it.

```javascript
import React, {PropTypes} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';

export default function Task(props) {
  const taskClassName = props.task.done ? 'done Task' : 'Task';
  return (
    <li className={taskClassName}>
      <input
        className="checkbox-done"
        type="checkbox"
        checked={props.task.done}
        onChange={props.toggleDone}
      />
      <span className="text">{props.task.text}</span>
      <Button className="delete" onClick={props.deleteTask}>
        <Glyphicon glyph="trash" />
      </Button>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  toggleDone: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
};
```

##Add styles
Update App.css file.
```
.App {
  max-width: 400px;
  margin: 10px auto;
}

.App__header {
  background-color: #2E7D32;
  color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
}

.header-title {
  font-size: 14px;
  margin-top: 7px;
  margin-bottom: 0;
}

.App__header .button-hide,
.App__header .button-hide:focus,
.App__header .button-hide:hover,
.App__header .button-hide:active:focus {
  font-size: 12px;
  float: right;
  background-color: #81C784;
  background-image: none;
  border: 0;
  border-radius: 0;
  color: #fff;
  letter-spacing: 1px;
}



.App__form {
  margin-top: 5px;
}

.App__form .form-group {
  margin-bottom: 5px;
}

.App__form .task-input,
.App__form .input-group-addon {
  background-color: #43A047;
  color: #fff;
}

.App__form .task-input {
  border-right: 0;
  border-top: 2px;
  border-bottom: 2px;
}

.App__form .input-group-addon {
  border: 0;
  font-size: 22px;
  padding: 4px 12px 8px 12px;
  cursor: pointer;
}

input[type="text"].task-input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #fff;
}
input[type="text"].task-input::-moz-placeholder { /* Firefox 19+ */
  color: #fff;
}
input[type="text"].task-input:-ms-input-placeholder { /* IE 10+ */
  color: #fff;
}
input[type="text"].task-input:-moz-placeholder { /* Firefox 18- */
  color: #fff;
}

.task-list {
  padding: 0;
}

@media (max-width: 768px) {
  .header-title {
    text-align: center;
    margin-bottom: 10px
  }
  .row {
    text-align: center;
  }
  .App__header .button-hide, .App__header .button-hide:focus, .App__header .button-hide:hover,.App__header .button-hide:active:focus  {
    float: none;
  }
}
```

Create Task.css file and import it to Task.js.

`import './Task.css';`

src/Task.css :
```
.Task {
  list-style-type: none;
  background-color: #f1f1f1;
  margin-top: 5px;
  padding: 10px;
}

.Task .checkbox-done {
  margin-right: 10px;
}

.done {
  text-decoration: line-through;
}

.Task .delete, .Task .delete:active:focus, .Task .delete:hover, .Task .delete:focus {
  position: relative;
  top: -8px;
  background-image: none;
  background-color: red;
  color: #fff;
  float: right;
}
```
