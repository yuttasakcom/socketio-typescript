import { route, HttpMethod } from '@spksoft/koa-decorator'
import { Context } from 'koa'
import io from 'socket.io-client'

@route('/broadcast')
class Broadcast {
  @route('/', HttpMethod.GET)
  async broadcast(ctx: Context) {
    const socket = io('ws://0.0.0.0:8080')
    socket.emit('test', { id: 1, name: 'YoYea' })
    ctx.body = 'OK'
  }
}
