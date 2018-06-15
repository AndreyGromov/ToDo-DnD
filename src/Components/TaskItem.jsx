import {isEqual} from 'lodash';
import React, {Component} from 'react';

/**
 * Пункт списка задач.
 */
export class TaskItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: true,
            value: null,
            completed: null
        }

        this.ItemRefs = React.createRef();
        this.InputValueRefs = React.createRef();
    }

    componentWillMount () {
        const {completed, value} = this.props.task;

        this.setState({value, completed});
    }

    /**
     * Обработчик изменения отображения кнопки "редактировать".
     */
    handleEditItem = () => {
        this.setState(prevState => {
                return {disabled: !prevState.disabled}
            },
            () => {
                this.InputValueRefs.current.focus();
            }
        )
    }

    /**
     * Обработчик изменения значения чекбокса "выполнен/не выполнен".
     */
    handleChangeCheckbox = (e) => {
        const {task} = this.props;
        const {checked} = e.target;
        const newTask = {...task, completed: checked};

        this.setState(
            {completed: checked},
            () => {
                this.props.changeTask(newTask);
            }
        )
    }

    /**
     * Обработчик изменения значения при редактировании пункта из списка задач.
     */
    handleChangeValue = (e) => {
        const {value} = e.target;

        this.setState({value})
    }

    /**
     * Сохранение отредактированного значения.
     */
    handleSaveChanges = () => {
        const {value} = this.state;
        const {task, changeTask} = this.props;
        const newTask = {...task, value};

        this.setState(
            {disabled: true},
            () => {
                if (!isEqual(value, task.value)) {
                    changeTask(newTask);
                }
            }
        )
    }

    handleRemoveItem = () => {
        const {task, removeTask} = this.props;

        removeTask(task);
    }

    /**
     * Получение кнопки редактировать/сохранить.
     */
    getButtonEdit = () => {
        const button = this.state.disabled ?
            <button className="edit-todo" onClick={this.handleEditItem}>
                <i class="material-icons">create</i>
            </button> :
            <button className="edit-todo" onClick={this.handleSaveChanges}>
                <i class="material-icons">done</i>
            </button>;

        return button;
    }

    render () {
        const {task: {id}} = this.props;
        const { disabled, value, completed} = this.state;
        const classNameEdit = !disabled ? 'task-edit-active' : '';

        return (
            <div className={`task-todo ${classNameEdit}`} ref={this.ItemRefs}>
                <input 
                    type="checkbox"
                    name={id}
                    checked={completed}
                    className="task-checkbox"
                    onChange={this.handleChangeCheckbox}
                />
                <input 
                    type="text"
                    name={id}
                    className={`task-value ${completed && 'complete-task'}`}
                    value={value}
                    onChange={this.handleChangeValue}
                    disabled={disabled}
                    ref={this.InputValueRefs}
                />

                {completed ? null : this.getButtonEdit()}
                {completed &&
                    <button className="edit-todo" onClick={this.handleRemoveItem}>
                        <i class="material-icons button-remove-task">clear</i>
                    </button> 
                }
            </div>
        )
    }
}
