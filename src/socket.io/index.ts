import { Server } from 'socket.io'

export default class Socket {
  constructor(io: Server) {
    this.start(io)
  }

  private start(io: Server) {
    io.on('connection', socket => {
      console.log(`Client ${socket.id} connected`)

      socket.on('SEND_MESSAGE', msg => {
        console.log('SEND_MESSAGE', msg)
      })

      socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnected`)
      })
    })
  }
}
