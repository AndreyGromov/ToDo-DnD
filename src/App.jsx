import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TodoActions} from './Actions';
import {DispatchServices} from './Services';
import {InputCreateItemTodoTask} from './Components/InputCreateTodoTask';
import {TasksContainer} from './Components/TasksContainer';

class App extends Component {

    componentWillMount () {
        this.props.todoActions.getTodoList();
    }

    /**
     * Вызов экшена создания новой задачи.
     */
    createTask = (task) => {
        this.props.todoActions.createTaskInTodo(task);
    }

    /**
     * Вызов экшена изменения задачи.
     */
    changeTask = (task) => {
        this.props.todoActions.saveTaskValueChange(task);
    }

    /**
     * Вызов экшена сохранения сортировки ToDo листа.
     */
    saveSortTodoList = (todoList) => {
        this.props.todoActions.saveSortTodoList(todoList);
    }

    /**
     * Вызов экшена удаления задачи.
     */
    removeTask = (task) => {
        this.props.todoActions.removeTaskFromTodo(task);
    }

    render () {
        const {todoList} = this.props;

        return (
            <div className="main">
                <InputCreateItemTodoTask createTask={this.createTask} />
                <TasksContainer 
                    todoList={todoList}
                    changeTask={this.changeTask}
                    removeTask={this.removeTask}
                    sortTodoList={this.saveSortTodoList}
                />
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    todoList: state.todoList
});

const dispatchToProps = (dispatch) => {   
    const todoActions = bindActionCreators(new TodoActions(new DispatchServices()), dispatch)

    return {todoActions};
}

const ConnectedApp = connect(
    mapStateToProps,
    dispatchToProps
)(App)

export default ConnectedApp;