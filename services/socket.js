const socket = require('socket.io')

module.exports = server => {
  const io = socket(server)
  const connectedUsers = {}
  const rooms = new Set()

  io.on('connection', socket => {
    const username = socket.request.headers.username
    const user = { id: username, username }
    connectedUsers[username] = user

    rooms.add(username)
    socket.join(username)

    socket.emit('all users', connectedUsers);

    [...rooms].forEach(room => {
      if (room !== username)
        socket.to(room).emit('new user', user)
    })

    socket.on('chat message', (msg, receiver) => {
      socket.to(receiver).emit('chat message', msg, username)
    })

    socket.on('disconnect', () => {
      socket.leave(username)

      const room = io.sockets.adapter.rooms[username]
      if (!room || room.length === 0) rooms.delete(username)

      io.sockets.emit('delete user', username)
      delete connectedUsers[username]
    })
  })
}
