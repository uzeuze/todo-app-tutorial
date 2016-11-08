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
