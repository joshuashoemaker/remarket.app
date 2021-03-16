import express from 'express'
import ApiItemResponse from '../../../Interfaces/ResponseObjects/ApiItemResponse'
import MongoItemResponse from '../../../Interfaces/ResponseObjects/MongoItemResponse'
import Db from '../../Db'
import errorCodes from '../../StaticDataStructures/errorCodes'

const router = express.Router()
const db = new Db()

router.get('/', async (request, response) => {
  const { userId } = request.session!

  let responseToClient = {
    message: errorCodes.OK,
    data: {}
  }

  let itemDbFindResponse: MongoItemResponse[]
  try {
    itemDbFindResponse = await db.find({ userId }, 'Items')
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

router.get('/:id', async (request, response) => {
  const { userId } = request.headers
  const itemId = request.params.id

  let responseToClient = {
    message: errorCodes.OK,
    data: {}
  }

  let itemDbFindResponse: MongoItemResponse
  try {
    itemDbFindResponse = await db.findOne({_id: itemId}, 'Items')
  } catch (err) {
    responseToClient.message = errorCodes.Err20
    response.status(500)
    response.send(responseToClient)
    return
  }

  const itemResponse: ApiItemResponse = {...itemDbFindResponse, ...{id: itemDbFindResponse._id}}
  
  responseToClient.data = itemResponse
  response.status(200)
  response.send(responseToClient)
})

router.post('/edit/:id', async (request, response) => {
  const { userId } = request.headers
  const itemId = request.params.id
  const item = request.body

  let responseToClient = {
    message: errorCodes.OK,
    data: {}
  }

  let iteDbEditResponse: MongoItemResponse
  try {
    let itemProps = {...item}
    delete itemProps._id
    iteDbEditResponse = await db.findOneAndUpdate({_id: itemId}, 'Items', item)
  } catch (err) {
    responseToClient.message = errorCodes.Err20
    response.status(500)
    response.send(responseToClient)
    return
  }

  
  const itemResponse: ApiItemResponse = {...iteDbEditResponse, ...{id: iteDbEditResponse._id}}
  
  responseToClient.data = itemResponse
  response.status(201)
  response.send(responseToClient)
})

export default router
