import express from 'express'
import ApiItemResponse from '../../Interfaces/ResponseObjects/ApiItemResponse'
import MongoItemResponse from '../../Interfaces/ResponseObjects/MongoItemResponse'
import Db from '../Db'
import errorCodes from '../StaticDataStructures/errorCodes'

const router = express.Router()
const db = new Db()

router.get('/', async (request, response) => {
  const { userId } = request.headers

  let responseToClient = {
    message: errorCodes.OK,
    data: {}
  }

  let itemDbFindResponse: MongoItemResponse[]
  try {
    itemDbFindResponse = await db.find({}, 'Items')
  } catch (err) {
    responseToClient.message = errorCodes.Err20
    response.status(500)
    response.send(responseToClient)
    return
  }

  const itemsResponse: ApiItemResponse[] = itemDbFindResponse.map(i => {
    return {...i, ...{id: i._id}}
  })

  responseToClient.data = itemsResponse
  response.status(200)
  response.send(responseToClient)

})

export default router
