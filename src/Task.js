import React, {PropTypes} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import './Task.css';

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
