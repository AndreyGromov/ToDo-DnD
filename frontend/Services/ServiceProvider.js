import {DispatchServices} from './DispatchServices'
/**
 * Сервисы по взаимодействию с ToDo листом.
 */
export class ServiceProvider extends DispatchServices {
  constructor (props) {
    super(props)
  }
  /**
   * Создание новой задачи.
   */
  createTaskInTodo = (task) => {
    this.socket.emit('createTaskInTodo', task)
    this.socket.off('createTaskInTodo')
  }

  /**
   * Сохранение измененной задачи.
   */
  saveTaskValueChange = (task) => {
    this.socket.emit('saveTaskValueChange', task)
    this.socket.off('saveTaskValueChange')
  }

  /**
   * Удаление задачи из ToDo листа.
   */
  removeTaskFromTodo = (task) => {
    this.socket.emit('removeTaskFromTodo', task)
    this.socket.off('removeTaskFromTodo')
  }

  /**
   * Сохранение отсортированного ToDo листа.
   */
  saveSortTodoList = (todoList) => {
    this.socket.emit('saveSortTodoList', todoList)
    this.socket.off('saveSortTodoList')
  }
}
