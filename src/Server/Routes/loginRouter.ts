import express from 'express'
import Db from '../Db'
import ErrorCodes from '../../StaticDataStructures/errorCodes'
import { v4 as uuidv4 } from 'uuid'
import base64 from 'base-64'
import crypto from 'crypto'

const router = express.Router()
const db = new Db()

router.post('/', async (request, response) => {
  let responseToClient = {
    message: ErrorCodes.OK,
    data: {}
  }

  const authorizationHeader = request.headers['authorization'] as String
  if (!authorizationHeader) {
    responseToClient.message = ErrorCodes.Err900
    response.status(401)
    response.send(responseToClient)
    return
  }

  const authorizationType = authorizationHeader.split(' ')[0]
  const token = authorizationHeader.split(' ')[1]

  if (authorizationType !== 'Basic') {
    responseToClient.message = ErrorCodes.Err900
    response.status(401)
    response.send(responseToClient)
    return
  }
  
  if (!token) {
    responseToClient.message = ErrorCodes.Err900
    response.status(401)
    response.send(responseToClient)
    return
  }

  const decodedToken = base64.decode(token)
  const credentialsArray = decodedToken.split(':')
  const username = credentialsArray[0]
  const password = credentialsArray[1]

  if (!username || !password) {
    responseToClient.message = ErrorCodes.Err900
    response.status(401)
    response.send(responseToClient)
    return
  }

  const userRecord = await db.findOne({username}, 'Users')
  const hashedPasswordfromInput = crypto.createHmac('sha512', `${userRecord._id}`)
    .update(password)
    .digest('base64')

  if (hashedPasswordfromInput !== userRecord.password) {
    responseToClient.message = ErrorCodes.Err900
    response.status(401)
    response.send(responseToClient)
    return
  }

  const tokenToStoreInSession = crypto.createHmac('sha512', `${userRecord._id}`)
    .update(uuidv4())
    .digest('base64')

  request!.session!.remarketToken = tokenToStoreInSession
  request!.session!.userId = userRecord._id
  
  response.setHeader('remarketToken', tokenToStoreInSession)

  responseToClient.message = ErrorCodes.OK
  responseToClient.data = { token: tokenToStoreInSession }
  response.status(200)
  response.send(responseToClient)
  
})

export default router
