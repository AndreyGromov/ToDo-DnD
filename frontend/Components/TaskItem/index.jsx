import {isEqual} from 'lodash'
import React, {Component} from 'react'

import {ChangeTaskButton} from './ChangeTaskButton'
import {stateChangeTaskButton} from '../../Consts'

/**
 * Пункт списка задач.
 */
export default class TaskItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: null,
      disabled: true,
      completed: null,
      stateButton: stateChangeTaskButton.EDIT
    }

    this.ItemRefs = React.createRef()
    this.InputValueRefs = React.createRef()
  }

  componentDidMount () {
    const {completed, value} = this.props.task
    const newState = {
      value,
      completed,
      stateButton: completed ? stateChangeTaskButton.REMOVE : stateChangeTaskButton.EDIT
    }

    this.setState(newState)
  }

  /**
   * Обработчик изменения отображения кнопки "редактировать".
   */
  handleEditItem = () => {
    this.setState(prevState => {
        return {
          disabled: !prevState.disabled,
          stateButton: stateChangeTaskButton.SAVE_CHANGES
        }
      },
      () => {
        this.InputValueRefs.current.focus()
      }
    )
  }

  /**
   * Обработчик изменения значения чекбокса "выполнен/не выполнен".
   */
  handleChangeCheckbox = (e) => {
    const {task} = this.props
    const {checked} = e.target
    const newTask = {...task, completed: checked}
    const stateButton = checked ? stateChangeTaskButton.REMOVE : stateChangeTaskButton.EDIT

    this.setState(
      {
        completed: checked,
        stateButton: stateButton
      },
      () => {
        this.props.changeTask(newTask)
      }
    )
  }

  /**
   * Обработчик изменения значения при редактировании пункта из списка задач.
   */
  handleChangeValue = (e) => {
    const {value} = e.target

    this.setState({value})
  }

  /**
   * Сохранение отредактированного значения.
   */
  handleSaveChanges = () => {
    const {value} = this.state
    const {task, changeTask} = this.props
    const newTask = {...task, value}

    this.setState(
      {
        disabled: true,
        stateButton: stateChangeTaskButton.EDIT
      },
      () => {
        if (!isEqual(value, task.value)) {
          changeTask(newTask)
        }
      }
    )
  }

  handleRemoveItem = () => {
    const {task, removeTask} = this.props

    removeTask(task)
  }

  render () {
    const {task: {id}} = this.props
    const {disabled, value, completed, stateButton} = this.state
    const classNameEdit = !disabled ? 'task-edit-active' : ''

    return (
      <div className={`task-todo ${classNameEdit}`} ref={this.ItemRefs}>
        <input
          type='checkbox'
          name={id}
          checked={completed}
          disabled={!disabled}
          className='task-checkbox'
          onChange={this.handleChangeCheckbox}
        />
        <input
          type='text'
          name={id}
          className={`task-value ${completed && 'complete-task'}`}
          value={value}
          onChange={this.handleChangeValue}
          disabled={disabled}
          ref={this.InputValueRefs}
        />

        <ChangeTaskButton
          stateButton={stateButton}
          handleEditItem={this.handleEditItem}
          handleSaveChanges={this.handleSaveChanges}
          handleRemoveItem={this.handleRemoveItem}
        />
      </div>
    )
  }
}
