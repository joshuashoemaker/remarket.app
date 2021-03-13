import express from 'express'
import loginRouter from './loginRouter'
import protectedApiRouter from './Protected/protectedApiRouter'

const router = express.Router()

router.use('/login', loginRouter)
router.use('/protected', protectedApiRouter)

export default router