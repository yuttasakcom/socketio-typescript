import { route, HttpMethod } from '@spksoft/koa-decorator'
import { Context } from 'koa'

@route('/system')
class System {
  @route('/health', HttpMethod.GET)
  async health(ctx: Context) {
    ctx.body = 'OK'
  }
}
