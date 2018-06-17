import React, {Component} from 'react';
import {createIdForTodoTask} from '../Utils';

export class InputCreateItemTodoTask extends Component {
    state = {
        value: ''
    }

    /**
     * Обработчик отбравки значения на клавишу Enter.
     */
    handleEnter = (e) => {
        e.preventDefault()

        const {value} = this.state;

        if (e.keyCode === 13 && !!value) {
            this.createTask()
        }
    }
    
    /**
     * Обработка ввода значения в поле инпут.
     */
    handleInput = (e) => {
        const {value} = e.target;
        
        this.setState({value: value})
    }
    
    /**
     * Вызов метода создания новой задачи в списке.
     */
    createTask = () => {
        const {value} = this.state;
        const newTask = {
            value,
            id: createIdForTodoTask(),
            completed: false
        }
        
        this.props.createTask(newTask)
        this.setState({value: ''});
    }

    render () {
        return (
            <input 
                value={this.state.value}
                type="text"
                className="input-create-todo"
                onInput={this.handleInput}
                onKeyUp={this.handleEnter}
                placeholder="Введите задачу..."
                autoFocus="true"
            />
        )
    }
}