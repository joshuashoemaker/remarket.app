import express, { request, response } from 'express'
import MongoItemResponse from '../../../Interfaces/ResponseObjects/MongoItemResponse'
import Db from '../../Db'
import errorCodes from '../../../StaticDataStructures/errorCodes'
import BucketStorage from '../../BucketStorage'
import fileUpload from 'express-fileupload'
import BucketKeyPrefixes from '../../../StaticDataStructures/BucketKeyPrefixes'
import IItem from '../../../Interfaces/Entities/IItem'

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

  const itemsResponse: IItem[] = itemDbFindResponse.map(i => {
    let presignedItemImageUrl: string = ''
    if (i.imageKey) {
      presignedItemImageUrl = BucketStorage.getDownloadPresignedUrl({
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

  const itemsResponse: IItem[] = itemDbFindResponse.map(i => {
    let presignedItemImageUrl: string = ''
    if (i.imageKey) {
      presignedItemImageUrl = BucketStorage.getDownloadPresignedUrl({
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
    presignedItemImageUrl = BucketStorage.getDownloadPresignedUrl({
      bucketName: 'remarket',
      key: itemDbFindResponse.imageKey,
      expiresInSeconds: 600
    })
  }

  const itemResponse: IItem = {
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

  let itemDbEditResponse: MongoItemResponse
  try {
    let itemProps = { ...item }

    delete itemProps._id
    itemProps.timeOfProduction = new Date(itemProps.timeOfProduction)
    itemProps.modifiedDate = new Date()

    itemDbEditResponse = await db.findOneAndUpdate({ _id: itemId }, 'Items', itemProps)
  } catch (err) {
    responseToClient.message = errorCodes.Err20
    response.status(500)
    response.send(responseToClient)
    return
  }

  const itemResponse: IItem = { ...itemDbEditResponse, ...{ id: itemDbEditResponse._id } }

  responseToClient.data = itemResponse
  response.status(201)
  response.send(responseToClient)
})

router.post('/getPresignedImageUploadUrl', async (request, response) => {
  const { fileName, mimeType } = request.body

  let responseToClient = {
    message: errorCodes.OK,
    data: {}
  }

  let presignedUrl = ''
  try {
    presignedUrl = BucketStorage.getUploadPresignedUrl({
      bucketName: 'remarket',
      key: 'test.jpeg',//fileName,
      expiresInSeconds: 90,
      contentType: mimeType
    })
  } catch (err) {
    console.log(err)
    responseToClient.message = errorCodes.Err20
    response.status(500)
    response.send(responseToClient)
    return
  }

  responseToClient.data = { presignedUrl }
  response.status(200)
  response.send(responseToClient)
})

router.post('/addImage/:id', async (request, response) => {
  const { userId } = request.headers
  const itemId = request.params.id

  let responseToClient = {
    message: errorCodes.OK,
    data: {}
  }

  let imageKey: string = ''
  if (request.files?.image) {
    const itemImage = request.files!['image'] as fileUpload.UploadedFile

    const uploadedSplitFileName = itemImage.name.split('.')
    const extention = uploadedSplitFileName[uploadedSplitFileName.length - 1]
    const fileName = BucketStorage.createBucketKey({
      entityId: itemId,
      prefix: BucketKeyPrefixes.ItemPhoto,
      extention: extention
    })

    try {
      imageKey = await BucketStorage.upload({
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

  responseToClient.data = { imageKey }
  response.status(201)
  response.send(responseToClient)

})

export default router
