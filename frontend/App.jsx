import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {TodoActions} from './Actions';
import {DispatchServices} from './Services/DispatchServices';
import {ServiceProvider} from './Services/ServiceProvider';

import {InputCreateItemTodoTask} from './Components/InputCreateTodoTask';
import {TasksContainer} from './Components/TasksContainer';

class App extends Component {
  constructor (props) {
    super(props)

    this.serviceProvider = new ServiceProvider()
  }

  componentDidMount () {
    this.props.todoActions.getTodoList()
  }

  /**
   * Вызов сервиса создания новой задачи.
   */
  createTask = (task) => {
    this.serviceProvider.createTaskInTodo(task)
  }

  /**
   * Вызов сервиса изменения задачи.
   */
  changeTask = (task) => {
    this.serviceProvider.saveTaskValueChange(task)
  }

  /**
   * Вызов сервиса сохранения сортировки ToDo листа.
   */
  saveSortTodoList = (todoList) => {
    this.serviceProvider.saveSortTodoList(todoList)
  }

  /**
   * Вызов сервиса удаления задачи.
   */
  removeTask = (task) => {
    this.serviceProvider.removeTaskFromTodo(task)
  }

  render () {
    const {todoList} = this.props

    return (
      <div className='main'>
        <InputCreateItemTodoTask createTask={this.createTask} />
        <TasksContainer
          todoList={todoList}
          changeTask={this.changeTask}
          removeTask={this.removeTask}
          sortTodoList={this.saveSortTodoList}
        />
      </div>
    )
}
}

const mapStateToProps = (state) => ({
  todoList: state.todoList
})

const dispatchToProps = (dispatch) => {
  const todoActions = bindActionCreators(new TodoActions(new DispatchServices()), dispatch)

  return {todoActions}
}

const ConnectedApp = connect(
  mapStateToProps,
  dispatchToProps
)(App)

export default ConnectedApp
