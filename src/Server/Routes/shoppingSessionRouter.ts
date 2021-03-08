import express from 'express'
import Db from '../Db'
import IItemRequest from '../../Interfaces/RequestObjects/IItemRequest'
import IShoppingSessionRequest from '../../Interfaces/RequestObjects/IShoppingSessionRequest'
import DbItem from '../Entities/DbItem'
import DbShoppingSession from '../Entities/DbShoppingSession'
import MongoShoppingSessionResponse from '../../Interfaces/ResponseObjects/MongoShoppingSessionResponse'
import MongoItemResponse from '../../Interfaces/ResponseObjects/MongoItemResponse'
import ApiItemResponse from '../../Interfaces/ResponseObjects/ApiItemResponse'
import ApiShoppingSessionResponse from '../../Interfaces/ResponseObjects/ApiShoppingSessionResponse'

const router = express.Router()
const db = new Db()

router.post('/', async (request, response) => {
  const { userId } = request.headers
  const { id } = request.body as IShoppingSessionRequest
  const items = request.body.items as IItemRequest[]

  const shoppingSession = new DbShoppingSession({ id })
  const itemsInShoppingSession = items.map(i => new DbItem(i))

  await db.connect()
  const shoppingSessionDbSaveResponse: MongoShoppingSessionResponse = await db.insertOne(shoppingSession, 'ShoppingSession')
  const itemsDbSaveResponse: MongoItemResponse[] = await db.insertMany(itemsInShoppingSession, 'Items')

  const itemsResponse: ApiItemResponse[] = itemsDbSaveResponse.map(i => {
    return {...i, ...{id: i._id}}
  })

  const shoppingSessionRespone: ApiShoppingSessionResponse = {
    id: shoppingSessionDbSaveResponse._id,
    createdDate: shoppingSessionDbSaveResponse.createdDate,
    modifiedDate: shoppingSessionDbSaveResponse.modifiedDate,
    items: itemsResponse
  }

  response.send(shoppingSessionRespone)
})

export default router
