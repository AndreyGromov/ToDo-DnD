const fs = require('fs');
const _ = require('lodash');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 6060;

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

io.on('connection', (socket) => {
    let name = 'U' + (socket.id).toString().substr(1, 4);
    console.log(`${name} connected`);

    /**
     * Отправка списка задач.
     */
    socket.on('getTodoList', () => {
        fs.exists('./data/todoList.json', (isDataFile) => {
            const data = isDataFile ?
                fs.readFileSync('./data/todoList.json', 'utf8') :
                createDataFile() && fs.readFileSync('./data/todoList.json', 'utf8');
            const todoList = (data && JSON.parse(data)) || [];
    
            socket.emit('getTodoList', todoList);
        });
    });

    /**
     * Создание новой задачи.
     */
    socket.on('createTaskInTodo', (task) => {
        const data = fs.readFileSync('./data/todoList.json', 'utf8');
        const todoList = (data && JSON.parse(data)) || [];
        const newTodoList = [task, ...todoList];
        
        fs.writeFileSync('./data/todoList.json', JSON.stringify(newTodoList));
        io.emit('createTaskInTodo', newTodoList);
    });

    /**
     * Сохранение измененной задачи.
     */
    socket.on('saveTaskValueChange', (task) => {
        const data = fs.readFileSync('./data/todoList.json', 'utf8');
        const todoList = (data && JSON.parse(data)) || [];
        const indexTask = _.findIndex(todoList, (item) => item.id === task.id);

        todoList[indexTask] = task;

        fs.writeFileSync('./data/todoList.json', JSON.stringify(todoList));
        io.emit('saveTaskValueChange', todoList);
    });

    /**
     * Удаление задачи из ToDo листа.
     */
    socket.on('removeTaskFromTodo', (task) => {
        const data = fs.readFileSync('./data/todoList.json', 'utf8');
        const todoList = (data && JSON.parse(data)) || [];
        const indexTask = _.findIndex(todoList, (item) => item.id === task.id);

        todoList.splice(indexTask, 1);

        fs.writeFileSync('./data/todoList.json', JSON.stringify(todoList));
        io.emit('removeTaskFromTodo', todoList);
    });

    /**
     * Сохранение по новому отсортированного ToDo листа.
     */
    socket.on('saveSortTodoList', (todoList) => {
        fs.writeFileSync('./data/todoList.json', JSON.stringify(todoList));
    });

    socket.on('disconnect', () => {
        console.log(`${name} disconnected`)
    })
});

function createDataFile () {
    if (!fs.existsSync('./data')) {
        fs.mkdirSync('./data')
        fs.writeFile('./data/todoList.json', '[]', (err) => {
            if (err) throw err;
        })
    } else {
        fs.writeFile('./data/todoList.json', '[]', (err) => {
            if (err) throw err;
        })
    }
}

server.listen(port, () => {console.log(`Listening on port ${port}`)});
