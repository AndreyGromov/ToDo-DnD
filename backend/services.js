const fs = require('fs-extra')
const _ = require('lodash')

const dataPath = __dirname + '/data/todoList.json'
/**
 * Сервисы для изменения и взаимодействия данных в ToDo листе.
 */
module.exports = todoServices = {
  /**
   * Получение списка задач.
   */
  getTodoList: (exists) => {
      if (!exists) {
        fs.createFileSync(dataPath)
        fs.outputFileSync(dataPath, '[]')
      } else {
        const todoList = fs.readJsonSync(dataPath)

        return todoList;
      }
  },

  /**
   * Добавление новой задачи в ToDo лист.
   */
  createTaskInTodo: (task) => {
    const todoList = fs.readJsonSync(dataPath) || []
    const newTodoList = [task, ...todoList]

    fs.writeJsonSync(dataPath, newTodoList)

    return newTodoList;
  },

  /**
   * Сохранение измененной задачи.
   */
  saveTaskValueChange: (task) => {
    const todoList = fs.readJsonSync(dataPath) || []
    const indexTask = _.findIndex(todoList, (item) => item.id === task.id)

    todoList[indexTask] = task

    fs.writeJsonSync(dataPath, todoList)

    return todoList;
  },

  /**
   * Удаление задачи из ToDo листа.
   */
  removeTaskFromTodo: (task) => {
    const todoList = fs.readJsonSync(dataPath) || []
    const indexTask = _.findIndex(todoList, (item) => item.id === task.id)

    todoList.splice(indexTask, 1)

    fs.writeJsonSync(dataPath, todoList)

    return todoList;
  },

  /**
   * Сохранение отсортированного ToDo листа.
   */
  saveSortTodoList: (todoList) => {
    fs.writeJsonSync(dataPath, todoList)
  }
}