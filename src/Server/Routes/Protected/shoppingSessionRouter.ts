import express from 'express'
import Db from '../../Db'
import errorCodes from '../../../StaticDataStructures/errorCodes'
import IShoppingSessionRequest from '../../../Interfaces/RequestObjects/IShoppingSessionRequest'
import DbItem from '../../Entities/DbItem'
import DbShoppingSession from '../../Entities/DbShoppingSession'
import MongoShoppingSessionResponse from '../../../Interfaces/ResponseObjects/MongoShoppingSessionResponse'
import MongoItemResponse from '../../../Interfaces/ResponseObjects/MongoItemResponse'
import ApiShoppingSessionResponse from '../../../Interfaces/ResponseObjects/ApiShoppingSessionResponse'
import DbItemClothing from '../../Entities/DbItemClothing'
import IItem from '../../../Interfaces/Entities/IItem'

const router = express.Router()
const db = new Db()

router.post('/', async (request, response) => {
  const { userId } = request.session!
  const { id, subtotal, tax, total, items } = request.body as IShoppingSessionRequest

  let responseToClient = {
    message: errorCodes.OK,
    data: {}
  }

  if (!items?.length) {
    responseToClient.message = errorCodes.Err10
    response.status(500)
    response.send(responseToClient)
    return
  }

  const shoppingSession = new DbShoppingSession({ id, subtotal, tax, total, items, userId })
  const itemsInShoppingSession = items.map(i => {
    i.userId = userId
    i.shoppingSessionId = id
    if (i.timeOfProduction) i.timeOfProduction = new Date(i.timeOfProduction)
    if (i.type === 'clothing') return new DbItemClothing(i)
    return new DbItem(i)
  })

  let shoppingSessionDbSaveResponse: MongoShoppingSessionResponse
  try {
    shoppingSessionDbSaveResponse = await db.insertOne(shoppingSession, 'ShoppingSession')
  } catch (err) {
    responseToClient.message = errorCodes.Err10
    response.status(500)
    response.send(responseToClient)
    return
  }

  let itemsDbSaveResponse: MongoItemResponse[]
  try {
    itemsDbSaveResponse = await db.insertMany(itemsInShoppingSession, 'Items')
  } catch (err) {
    responseToClient.message = errorCodes.Err20
    response.status(500)
    response.send(responseToClient)
    return
  }

    const itemsResponse: IItem[] = itemsDbSaveResponse.map(i => {
      return {...i, ...{id: i._id}}
    })

    const shoppingSessionRespone: ApiShoppingSessionResponse = {
      id: shoppingSessionDbSaveResponse._id,
      createdDate: shoppingSessionDbSaveResponse.createdDate,
      modifiedDate: shoppingSessionDbSaveResponse.modifiedDate,
      items: itemsResponse
    }

    responseToClient.data = shoppingSessionRespone
    
    response.status(201)
    response.send(responseToClient)
})

export default router
