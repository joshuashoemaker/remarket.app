import express from 'express'
import ApiItemResponse from '../../../Interfaces/ResponseObjects/ApiItemResponse'
import MongoItemResponse from '../../../Interfaces/ResponseObjects/MongoItemResponse'
import Db from '../../Db'
import errorCodes from '../../StaticDataStructures/errorCodes'
import BucketStorage from '../../BucketStorage'
import fileUpload from 'express-fileupload'

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
    let presignedItemImageUrl: string = ''
    if (i.imageKey) {
      presignedItemImageUrl = BucketStorage.getPresignedUrl({
        bucketName: 'remarket',
        key: i.imageKey,
        expiresInSeconds: 600
      })
    }
    return { ...i, ...{ id: i._id, imageUri: presignedItemImageUrl } }
  })

  responseToClient.data = itemsResponse
  response.status(200)
  response.send(responseToClient)
})


router.post('/_find', async (request, response) => {
  const { userId } = request.session!
  const query = request.body

  let responseToClient = {
    message: errorCodes.OK,
    data: {}
  }

  let itemDbFindResponse: MongoItemResponse[]
  try {
    itemDbFindResponse = await db.find({ ...query, userId }, 'Items')
  } catch (err) {
    responseToClient.message = errorCodes.Err20
    response.status(500)
    response.send(responseToClient)
    return
  }

  const itemsResponse: ApiItemResponse[] = itemDbFindResponse.map(i => {
    let presignedItemImageUrl: string = ''
    if (i.imageKey) {
      presignedItemImageUrl = BucketStorage.getPresignedUrl({
        bucketName: 'remarket',
        key: i.imageKey,
        expiresInSeconds: 600
      })
    }
    return { ...i, ...{ id: i._id, imageUri: presignedItemImageUrl } }
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
    itemDbFindResponse = await db.findOne({ _id: itemId }, 'Items')
  } catch (err) {
    responseToClient.message = errorCodes.Err20
    response.status(500)
    response.send(responseToClient)
    return
  }

  
  let presignedItemImageUrl: string = ''
  if (itemDbFindResponse.imageKey) {
    presignedItemImageUrl = BucketStorage.getPresignedUrl({
      bucketName: 'remarket',
      key: itemDbFindResponse.imageKey,
      expiresInSeconds: 600
    })
  }
  // return { ...i, ...{ id: i._id, imageUri: presignedItemImageUrl } }

  const itemResponse: ApiItemResponse = {
    ...itemDbFindResponse,
    ...{ id: itemDbFindResponse._id, imageUri: presignedItemImageUrl }
  }

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

  let imageBucketKey: string = ''
  if (request.files?.image) {
    const itemImage = request.files!['image'] as fileUpload.UploadedFile

    const uploadedSplitFileName = itemImage.name.split('.')
    const extention = uploadedSplitFileName[uploadedSplitFileName.length - 1]
    const fileName = `ItemPhoto-${item.id}.${extention}`

    try {
      imageBucketKey = await BucketStorage.upload({
        bucketName: 'remarket',
        fileName: fileName,
        file: Buffer.from(itemImage.data)
      })
    } catch (err) {
      console.log(err)
      responseToClient.message = errorCodes.Err20
      response.status(500)
      response.send(responseToClient)
      return
    }
  }

  let itemDbEditResponse: MongoItemResponse
  try {
    let itemProps = { ...item, ...{ imageKey: imageBucketKey } }

    delete itemProps._id

    for (let key in itemProps) {
      if (itemProps[key] === 'undefined' || itemProps[key] === 'null') itemProps[key] = undefined
      else if (!isNaN(itemProps[key])) itemProps[key] = parseFloat(itemProps[key])
      else if (itemProps[key] === 'true') itemProps[key] = true
      else if (itemProps[key] === 'false') itemProps[key] = false
    }

    itemDbEditResponse = await db.findOneAndUpdate({ _id: itemId }, 'Items', itemProps)
  } catch (err) {
    responseToClient.message = errorCodes.Err20
    response.status(500)
    response.send(responseToClient)
    return
  }

  const itemResponse: ApiItemResponse = { ...itemDbEditResponse, ...{ id: itemDbEditResponse._id } }

  responseToClient.data = itemResponse
  response.status(201)
  response.send(responseToClient)
})

export default router
