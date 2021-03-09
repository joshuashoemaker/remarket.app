import express from 'express'

const router = express.Router()

router.get('/', (request, response) => {
  const { userId } = request.headers
})