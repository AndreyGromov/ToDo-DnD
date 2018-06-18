import socketIoClient from 'socket.io-client'

import {port} from '../Consts'

export class DispatchServices {
  constructor () {
    this.socket = socketIoClient(`http://localhost:${port}`)
  }

  /**
   * Получение текущего списка задач.
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
}
