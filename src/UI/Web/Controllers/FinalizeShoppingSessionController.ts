import ShoppingSession from '../../../Entities/ShoppingSession/ShoppingSession'
import User from '../../../Entities/User/User'
import axios from 'axios'

class FinalizeShoppingSessionController {
  public shoppingSession = new ShoppingSession()

  submit = async (itemIdsTtFinalize?: string[]): Promise<any> => {
    let shoppingSessionRequest = this.shoppingSession.finalize(itemIdsTtFinalize)

    const imageUploadRequests = shoppingSessionRequest.items.map(async (item, index) => {
      let imageKey: string = ''

      if (item.image) {
        const formData = new FormData()
        formData.append('image', item.image)
        const uploadImageToBucketResponse = await axios.post(`/api/protected/item/addImage/${item.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${User.token}`,
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
          })
        if (uploadImageToBucketResponse.status === 201) {
          imageKey = uploadImageToBucketResponse.data.data.imageKey
        }
      }

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
