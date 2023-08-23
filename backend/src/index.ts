const app = require('express')()
const cors = require("cors")
app.use(cors())
const server = require('https').createServer(app)
require('dotenv').config()

const FRONT_URL = process.env.FRONT_URL
const io = require('socket.io')(server, {cors: {origin: "*"}})

const PORT = 8080

io.on('connection', (socket:any) => {
  console.log('Usuário conectado!', socket.id);
  socket.on('disconnect', (reason:any) => {
    console.log('Usuário desconectado!', socket.id)
  })
  socket.on('set_username', (username:string) => {
    socket.data.username = username
  })
  socket.on('message', (text:string) => {
    io.emit('receive_message', {
      text,
      authorId: socket.id,
      author: socket.data.username
    })
  })
})

server.listen(PORT, () => console.log('Server running...'))