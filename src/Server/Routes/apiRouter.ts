import express from 'express'
import itemRouter from './itemRouter'
import shoppingSessionRouter from './shoppingSessionRouter'

const router = express.Router()

router.use('/item', itemRouter)
router.use('/shoppingSession', shoppingSessionRouter)

export default router