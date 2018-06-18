import {cloneDeep} from 'lodash'
import React, {Component} from 'react'
import {Container, Draggable} from 'react-smooth-dnd'
import TaskItem from './TaskItem'

export class TasksContainer extends Component {
  state = {
    todoList: []
  }

  componentWillReceiveProps (nextProps) {
    const {todoList} = nextProps

    if (todoList) {
      this.setState({
        todoList: nextProps.todoList
      })
    }
  }

  /**
   * Обрабатываем перетаскивание элемента списка задач.
   */
  handleDrop = (dropResult) => {
    const {sortTodoList} = this.props
    const {removedIndex, addedIndex, payload} = dropResult
    const newTodoList = cloneDeep(this.state.todoList)
    let taskToAdd = payload

    if (removedIndex === null || addedIndex === null) return

    taskToAdd = newTodoList.splice(removedIndex, 1)[0]
    newTodoList.splice(addedIndex, 0, taskToAdd)

    this.setState(
      {todoList: newTodoList},
      () => {
        sortTodoList(newTodoList)
      }
    )
  }

  /**
   * Получаем список компонентов задач.
   */
  getTasks = () => {
    const {changeTask, removeTask} = this.props
    const {todoList} = this.state

    return todoList.map((itemTask) => {
      return (
        <Draggable key={itemTask.id}>
          <TaskItem
            task={itemTask}
            changeTask={changeTask}
            removeTask={removeTask}
          />
        </Draggable>
      )
    })
  }

  render () {
    const isTodoList = !!this.state.todoList.length

    return (
      <div className={`container-tasks ${isTodoList && 'container-tasks-active'}`}>
        <Container onDrop={this.handleDrop}>
          {this.getTasks()}
        </Container>
      </div>
    )
  }
}
