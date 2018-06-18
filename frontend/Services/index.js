import socketIoClient from 'socket.io-client'
import {port} from '../Consts'

export class DispatchServices {
  constructor () {
    this.socket = socketIoClient(`http://localhost:${port}`)
  }

  /**
   * Получение списка задач.
   */
  getTodoList = (typeAction) => {
    return (dispatch) => {
      this.socket.emit('getTodoList')
      this.socket.on('getTodoList', (list) => {
        dispatch({
          type: typeAction,
          payload: list
        })
      })
    }
  }

  /**
   * Создание новой задачи.
   */
  createTaskInTodo = (typeAction, task) => {
    return (dispatch) => {
      this.socket.emit('createTaskInTodo', task)
      this.socket.on('createTaskInTodo', (list) => {
        dispatch({
          type: typeAction,
          payload: list
        })
      })
    }
  }

  /**
   * Сохранение измененной задачи.
   */
  saveTaskValueChange = (typeAction, task) => {
    return (dispatch) => {
      this.socket.emit('saveTaskValueChange', task)
      this.socket.on('saveTaskValueChange', (list) => {
        dispatch({
          type: typeAction,
          payload: list
        })
      })
    }
  }

  /**
   * Удаление задачи из ToDo листа.
   */
  removeTaskFromTodo = (typeAction, task) => {
    return (dispatch) => {
      this.socket.emit('removeTaskFromTodo', task)
      this.socket.on('removeTaskFromTodo', (list) => {
        dispatch({
          type: typeAction,
          payload: list
        })
      })
    }
  }

  /**
   * Сохранение отсортированного ToDo листа.
   */
  saveSortTodoList = (typeAction, todoList) => {
    return (dispatch) => {
      this.socket.emit('saveSortTodoList', todoList)
      dispatch({
        type: typeAction,
        payload: todoList
      })
    }
  }
}
