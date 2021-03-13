import express, { Express } from 'express'
import session from 'express-session'
import path from 'path'
import apiRouter from './Routes/apiRouter'
import SYS from '../SYS'

let instance: Server | null

class Server {
  readonly service: Express = express()
  constructor () {
    if (!instance) instance = this

    this.setupService()
    this.setupHeaderOptions()
    this.setupRoutes()

    return instance
  }

  setupService = () => {
    this.service.use(express.json({limit: '10000kb'}))
    this.service.use(express.urlencoded({ extended: true }))
    this.service.use(express.static(path.join(process.cwd(), '/dist/webapp')))
    this.service.use(session({
      secret: SYS.sessionSecret,
      resave: true,
      saveUninitialized: true
    }))
  }

  setupRoutes = () => {
    this.service.use('/api', apiRouter)
    this.service.use('/', (request, response) => {
      response.sendFile(path.join(process.cwd(), './dist/webapp/index.html'))
    })
  }

  setupHeaderOptions = () => {
    this.service.use((request, response, next) => {
      response.header('Access-Control-Allow-Origin', request.headers.origin || '*')
      response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,HEAD,DELETE,OPTIONS')
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })
  }
}

export default Server