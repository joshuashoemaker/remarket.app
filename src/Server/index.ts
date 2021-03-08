import http from 'http'
import Server from './Server'
import Db from './Db'

const main = () => {
  const port: number = normalizePort(process.env.PORT || '5005')
  const webService: http.Server = createServer()

  webService.listen(port, async () => {
    console.log(`Server is listening on ${port}`)

    const db = new Db()
    await db.connect()
    console.log('Database is Connected')
  })
}

const createServer = () => {
  const server = new Server()
  return http.createServer(server.service)
}

const normalizePort = (port: string | number): number => {
  if (typeof port === 'string') port = parseInt(port)
  return port
}

main()