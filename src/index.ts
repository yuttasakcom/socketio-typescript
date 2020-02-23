import http from 'http'
import { resolve } from 'path'

import koa from 'koa'
import redis from 'redis'
import dotenv from 'dotenv'
import cors from '@koa/cors'
import socketIO from 'socket.io'
import compress from 'koa-compress'
import bodyParser from 'koa-bodyparser'
import redisAdapter from 'socket.io-redis'
import { load } from '@spksoft/koa-decorator'

import Socket from './socket.io'

dotenv.config()

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort: number = 6379

const pub = redis.createClient(redisPort, redisHost)
const sub = redis.createClient(redisPort, redisHost)

const app = new koa()
const router = load(resolve(__dirname, 'controllers'), '.controller.ts')

const server = http.createServer(app.callback())
const io = socketIO(server)

app.use(compress())
app.use(cors())
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

io.adapter(redisAdapter({ pubClient: pub, subClient: sub }))
new Socket(io)
server.listen(3000)

console.log('Server is running on port:3000')
