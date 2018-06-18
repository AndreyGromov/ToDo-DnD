import React from 'react'

import {stateChangeTaskButton} from '../../Consts'

/**
 * Кнопка изменения состояния задачи.
 */
export const ChangeTaskButton = (props) => {
  const {stateButton, handleEditItem, handleSaveChanges, handleRemoveItem} = props

  switch (stateButton) {
    case stateChangeTaskButton.EDIT:
      return (
        <button className='edit-todo' onClick={handleEditItem}>
          <i className='material-icons'>create</i>
        </button>
      )

    case stateChangeTaskButton.SAVE_CHANGES:
      return (
        <button className='edit-todo' onClick={handleSaveChanges}>
          <i className='material-icons'>done</i>
        </button>
      )

    case stateChangeTaskButton.REMOVE:
      return (
        <button className='edit-todo' onClick={handleRemoveItem}>
          <i className='material-icons'>clear</i>
        </button>
      )
  }
}
