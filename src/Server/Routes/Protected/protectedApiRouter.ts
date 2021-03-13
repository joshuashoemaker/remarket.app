import express from 'express'
import itemRouter from './itemRouter'
import shoppingSessionRouter from './shoppingSessionRouter'
import authorizationRouter from './authorizationRouter'

const router = express.Router()

router.use('/', authorizationRouter)
router.use('/item', itemRouter)
router.use('/shoppingSession', shoppingSessionRouter)

export default router