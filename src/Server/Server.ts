import express, { Express } from 'express'
import session from 'express-session'
import path from 'path'
import apiRouter from './Routes/apiRouter'

let instance: Server | null

class Server {
  readonly service: Express = express()
  constructor () {
    if (!instance) instance = this

    this.setupService()
    this.setupRoutes()
    this.setupHeaderOptions()

    return instance
  }

  setupService = () => {
    this.service.use(express.json())
    this.service.use(express.urlencoded({ extended: false }))
    this.service.use(express.static(path.join(process.cwd(), '/dist/webapp')))
    this.service.use(session({
      secret: '123',
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
      response.header('Access-Control-Allow-Headers', 'Content-Type,x-requested-with')
      next()
    })
  }
}

export default Server