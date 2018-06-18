const fs = require('fs-extra')
const path = require('path')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const todoServices = require('./services')

const port = 6060
const rootPath = path.join(__dirname, '../dist')

app.use(express.static(rootPath))

app.get('/', (req, res) => {
  res.sendFile('/index.html', {root: rootPath})
})


io.on('connection', (socket) => {
  let name = 'U' + (socket.id).toString().substr(1, 4)
  console.log(`${name} connected`)

  /**
   * Отправка списка задач запрашивающему пользователю.
   */
  socket.on('getTodoList', () => {
    fs.pathExists(__dirname + '/data/todoList.json', (err, exists) => {
      const todoList = todoServices.getTodoList(exists);

      socket.emit('getTodoList', todoList)
    })
  })

  /**
   * Добавление новой задачи и возврат всем пользователям обновленного списка задач.
   */
  socket.on('createTaskInTodo', (task) => {
    const todoList = todoServices.createTaskInTodo(task);

    io.emit('getTodoList', todoList)
  })

  /**
   * Сохранение измененной задачи и возврат всем пользователям обновленного списка задач.
   */
  socket.on('saveTaskValueChange', (task) => {
    const todoList = todoServices.saveTaskValueChange(task);

    io.emit('getTodoList', todoList)
  })

  /**
   * Удаление задачи из ToDo листа и возврат всем пользователям обновленного списка задач.
   */
  socket.on('removeTaskFromTodo', (task) => {
    const todoList = todoServices.removeTaskFromTodo(task);

    io.emit('getTodoList', todoList)
  })

  /**
   * Сохранение отсортированного ToDo листа и возврат его всем пользователям кроме отправителя.
   */
  socket.on('saveSortTodoList', (todoList) => {
    todoServices.saveSortTodoList(todoList)
    socket.broadcast.emit('getTodoList', todoList)
  })

  socket.on('disconnect', () => {
    console.log(`${name} disconnected`)
  })
})

server.listen(port, () => {console.log(`Listening on port ${port}`)})
