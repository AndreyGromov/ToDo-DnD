import {ActionTypesForToDo} from './ActionTypes'

export class TodoActions {
  constructor (service) {
    this.service = service
  }

  /**
   * Получение текущего списка задач с бека.
   */
  getTodoList = () => {
    return this.service.getTodoList(ActionTypesForToDo.GET_THE_CURRENT_TODO_LIST)
  }
}
