import ShoppingSession from '../../../Entities/ShoppingSession/ShoppingSession'
import User from '../../../Entities/User/User'
import axios from 'axios'
// import BucketStorage from '../../../Server/BucketStorage'
import BucketKeyPrefixes from '../../../StaticDataStructures/BucketKeyPrefixes'

class FinalizeShoppingSessionController {
  public shoppingSession = new ShoppingSession()

  submit = async (itemIdsTtFinalize?: string[]): Promise<any> => {
    let shoppingSessionRequest = this.shoppingSession.finalize(itemIdsTtFinalize)

    const imageUploadRequests = shoppingSessionRequest.items.map(async (item, index) => {
      let imageKey: string = ''

      
      if (item.image) {
        let imageMimeType = item.image?.type
        console.log(imageMimeType)
        const uploadedSplitFileName = item?.image.name.split('.')
        const extention = uploadedSplitFileName[uploadedSplitFileName.length - 1]

        imageKey = `${BucketKeyPrefixes.ItemPhoto}-${item.id}.${extention}`

        const presignedUploadUrlResponse = await axios.post('/api/protected/item/getPresignedImageUploadUrl',
          { fileName: imageKey, mimeType: imageMimeType }, {
            headers: {
              Authorization: `Bearer ${User.token}`,
              'Content-Type': 'application/json'
            },
            withCredentials: true
          })

          console.log(presignedUploadUrlResponse)

        if (presignedUploadUrlResponse.status !== 200) {
          imageKey = ''
          return
        }

        const presignedUploadUrl = presignedUploadUrlResponse.data.data.presignedUrl
        console.log(presignedUploadUrl)
        try {
          const uploadToS3Response = await axios.put(presignedUploadUrl,
            item.image,
            { headers: { 'Content-Type': imageMimeType } }
          )

          console.log(uploadToS3Response)
        } catch (err) {
          console.log(err)
        }

      }


      // if (item.image) {
      //   const formData = new FormData()
      //   formData.append('image', item.image)
      //   const uploadImageToBucketResponse = await axios.post(`/api/protected/item/addImage/${item.id}`,
      //     formData,
          
      //   if (uploadImageToBucketResponse.status === 201) {
      //     imageKey = uploadImageToBucketResponse.data.data.imageKey
      //   }
      // }

      delete shoppingSessionRequest.items[index].imageUri
      shoppingSessionRequest.items[index].imageKey = imageKey
    })


    await Promise.all(imageUploadRequests)

    let shoppingSessionResponse = {}
    try {
      shoppingSessionResponse = await axios.post(
        '/api/protected/shoppingSession',
        shoppingSessionRequest, {
        headers: {
          Authorization: `Bearer ${User.token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
    } catch (err) {
      console.log(err)
    }
    return shoppingSessionResponse
  }

  destroyShoppingSession = () => {
    this.shoppingSession.destructor()
  }
}

export default FinalizeShoppingSessionController
