const {PythonShell} = require('python-shell')
const pyshell = new PythonShell('spacy-listen.py')
const express = require('express')
const http = require('http')
const app = express()
const socketio = require('socket.io');
const server = http.createServer(app)
const cors = require('cors');
const DDG = require('duck-duck-scrape')

app.use(cors()); // add this line

const io = socketio(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


server.listen(4000, () => {
    console.log('Spacy server listening on 4000')
})

io.on('connection', (socket) => {
    console.log('connection start')

    socket.on('message', (message) => {
        pyshell.send(message)
    })

    pyshell.on('message', (message) => {
        console.log(message)
        socket.emit('message', message)
    })

    socket.on('search', (keyword) => {
        keyword = keyword.replace(' ', '+')
        console.log(keyword)
        const searchResults = DDG.search(keyword, {
            safeSearch: DDG.SafeSearchType.STRICT
        }).then(function (res) {
            console.log(res[0])
            socket.emit('search', res[0])
        })
    })

    socket.on('disconnect', () => {
        console.log('connection end')
    })
})
