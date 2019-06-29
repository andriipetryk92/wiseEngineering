import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { addTask, doneTask, renameValue, createNewTasks } from '../../redux/toDoList/actions';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Points from './points'
import './style.scss';

class ToDoList extends React.Component {
  state = {
    valueTask: '',
    renameValueTask: '',
    clicked: false,
    clickedTask: false,
    indexInput: null,
    indexTask: null,
  }

  handleChange = (event) => {
    this.setState({
      valueTask: event.target.value,
    })
  }

  newTask = () => {
    const newData = {
      valueTask: this.state.valueTask.charAt(0).toUpperCase() + this.state.valueTask.slice(1),
      points: []
    }
    this.props.addTask(newData);
    this.setState({
      valueTask: ''
    })
  }

  doneTask = (index) => {
    this.props.doneTask(index);
  }

  renameTask = (index) => {
    this.setState(prevState => ({
      clicked: !prevState.clicked,
      indexInput: index
    }))
  }

  doRename = (index) => {
    const { renameValueTask } = this.state;
    this.props.renameValue({ renameValueTask, index })
    this.setState(prevState => ({
      clicked: !prevState.clicked,
    }))
  }

  openPoints = (index) => {
    this.setState(prevState => ({
      clickedTask: !prevState.clickedTask,
      indexTask: index
    }))
  }

  renameInput = (e) => {
    this.setState({
      renameValueTask: e.target.value,
    })
  }
  newTasks = () => {
    this.props.createNewTasks()
  }
  render() {
    const { tasks } = this.props;
    const { clicked, indexInput, clickedTask, indexTask } = this.state;

    return (
      <Grid
        className="list-wrapper"
        alignItems="center"
        justify="center"
        direction="column"
        container>
        <Button onClick={this.newTasks}>New Tasks</Button>
        <div className="content">
          <div className="new-to-do">
            <Typography>Enter new task</Typography>
            <div className="new-task">
              <input type="text" value={this.state.valueTask} onChange={(e) => this.handleChange(e)} />
              <Button onClick={this.newTask}>Add Task</Button>
            </div>
          </div>
          {!!tasks.length && <div className="list-to-do">
            <Typography>Your Tasks:</Typography>
            {tasks.map((task, index) => (
              <div className="task" key={index}>
                {clicked && index === indexInput ?
                  <div className="rename-task">
                    <input type="text" value={this.state.renameValue} onChange={this.renameInput} />
                    <Button onClick={() => this.doRename(index)}>OK</Button>
                  </div>
                  : <Typography onClick={() => this.openPoints(index)}>{index + 1}.{task.valueTask}</Typography>}
                {clickedTask && index === indexTask ?
                  <Points
                    task={task}
                    indexTask={index}
                  />
                  : null
                }
                <Button onClick={() => this.doneTask(index)}>Done</Button>
                <Button onClick={(e) => this.renameTask(index, e)}>Rename</Button>
              </div>
            ))}
          </div>
          }
        </div>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const tasks = state.toDoList.tasks ? state.toDoList.tasks : null;
  return {
    tasks
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ addTask, doneTask, renameValue, createNewTasks }, dispatch)
);

ToDoList.propTypes = {
  valueTask: PropTypes.string,
  renameValueTask: PropTypes.string,
  clicked: PropTypes.bool,
  clickedTask: PropTypes.bool,
  indexInput: PropTypes.bool,
  indexTask: PropTypes.bool,
  task: PropTypes.array,
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);

