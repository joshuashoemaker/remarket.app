import express from 'express'
import errorCodes from '../../StaticDataStructures/errorCodes'

const router = express.Router()

router.use('/', (request, response, next) => {
  const authorizationHeader = request.headers['authorization'] as String

  if (!authorizationHeader) {
    response.status(401)
    response.send(errorCodes.Err901)
    return
  }

  const authorizationType = authorizationHeader.split(' ')[0]
  const token = authorizationHeader.split(' ')[1]

  if (authorizationType !== 'Bearer') {
    response.status(401)
    response.send(errorCodes.Err901)
    return
  }
  
  const tokenInSession = request.session!.remarketToken

  if (!tokenInSession || !token || tokenInSession !== token) {
    response.status(401)
    response.send(errorCodes.Err901)
    return
  }

  next()
})

export default router