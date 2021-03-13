import express from 'express'
import Db from '../Db'
import ErrorCodes from '../StaticDataStructures/errorCodes'
import { v4 as uuidv4 } from 'uuid'
import base64 from 'base-64'

const router = express.Router()
const db = new Db()

router.post('/', async (request, response) => {
  const authorizationHeader = request.headers['authorization'] as String

  if (!authorizationHeader) {
    response.status(401)
    response.send(ErrorCodes.Err900)
    return
  }

  const authorizationType = authorizationHeader.split(' ')[0]
  const token = authorizationHeader.split(' ')[1]

  if (authorizationType !== 'Basic') {
    response.status(401)
    response.send(ErrorCodes.Err900)
    return
  }
  
  if (!token) {
    response.status(401)
    response.send(ErrorCodes.Err900)
    return
  }

  const decodedToken = base64.decode(token)
  const credentialsArray = decodedToken.split(':')
  const username = credentialsArray[0]
  const password = credentialsArray[1]

  if (!username || !password) {
    response.status(401)
    response.send(ErrorCodes.Err900)
    return
  }

  const userRecord = await db.findOne({username}, 'Users')
  const hashedPasswordfromInput = base64.encode(`${userRecord._id}:${password}`)
  
  if (hashedPasswordfromInput !== userRecord.password) {
    response.status(401)
    response.send(ErrorCodes.Err900)
    return
  }

  const tokenToStoreInSession = base64.encode(uuidv4())
  request!.session!.remarketToken = tokenToStoreInSession
  response.setHeader('remarketToken', tokenToStoreInSession)

  response.status(200)
  response.send(ErrorCodes.OK)
  
})

export default router