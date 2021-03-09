import express from 'express'
import shoppingSessionRouter from './shoppingSessionRouter'

const router = express.Router()

router.use('/shoppingSession', shoppingSessionRouter)

export default router