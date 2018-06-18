import {cloneDeep} from 'lodash'
import {handleActions} from 'redux-actions'
import {ActionTypesForToDo} from '../Actions/ActionTypes'

function getDefaultState () {
  const newState = {
    todoList: []
  }

  return newState
}

const ReducerToDo = handleActions({

  [ActionTypesForToDo.GET_TODO_LIST]: (state, action) => {
    const newState = cloneDeep(state)

    newState.todoList = action.payload

    return newState
  }

}, getDefaultState())

export default ReducerToDo
