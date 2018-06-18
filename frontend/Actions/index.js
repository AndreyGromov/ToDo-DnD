import {ActionTypesForToDo} from './ActionTypes'

export class TodoActions {
  constructor (service) {
    this.service = service
  }

  /**
   * Получение списка задач с бека.
   */
  getTodoList = () => {
    return this.service.getTodoList(ActionTypesForToDo.GET_TODO_LIST)
  }

  /**
   * Создание новой задачи в списке задач.
   */
  createTaskInTodo = (task) => {
    return this.service.createTaskInTodo(
      ActionTypesForToDo.GET_TODO_LIST,
      task
    )
  }

  /**
   * Сохранение измененного значения в задаче.
   */
  saveTaskValueChange = (task) => {
    return this.service.saveTaskValueChange(
      ActionTypesForToDo.GET_TODO_LIST,
      task
    )
  }

  /**
   * Удаление задачи из списка задач.
   */
  removeTaskFromTodo = (task) => {
    return this.service.removeTaskFromTodo(
      ActionTypesForToDo.GET_TODO_LIST,
      task
    )
  }

  /**
   * Сохранение измененного
   */
  saveSortTodoList = (todoList) => {
    return this.service.saveSortTodoList(
      ActionTypesForToDo.GET_TODO_LIST,
      todoList
    )
  }
}
