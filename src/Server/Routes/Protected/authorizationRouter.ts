import express from 'express'

const router = express.Router()

router.use('/', (request, response, next) => {
  console.log('auth', request.headers['authorization'])
  const authorizationHeader = request.headers['authorization'] as String

  if (!authorizationHeader) {
    response.status(401)
    response.redirect('/login')
    return
  }

  const authorizationType = authorizationHeader.split(' ')[0]
  const token = authorizationHeader.split(' ')[1]

  if (authorizationType !== 'Bearer') {
    response.status(401)
    response.redirect('/login')
    return
  }
  
  const tokenInSession = request.session!.remarketToken

  if (!tokenInSession || !token || tokenInSession !== token) {
    response.status(401)
    response.redirect('/login')
    return
  }

  next()
})

export default router