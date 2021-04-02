import axios from "axios";
import User from "../../../Entities/User/User";
import IItem from "../../../Interfaces/Entities/IItem";
import MongoDbItemRepository from "../../../Repositories/ItemRepository/MongoDbItemRepository";
import BucketKeyPrefixes from "../../../StaticDataStructures/BucketKeyPrefixes";

class InventoryController {
  private itemsRepository = new MongoDbItemRepository()

  getItems = async () => {
    return await this.itemsRepository.getAllItems()
  }

  getItemById = async (id: string) => {
    return await this.itemsRepository.findById(id)
  }

  editItem = async (item: IItem) => {
    let imageKey: string = item.imageKey || ''

    if (item.image) {
      let imageMimeType = item.image?.type
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

    item.imageKey = imageKey
    return await this.itemsRepository.editById(item.id, item)
  }

  getItemsByQuery = async (query: any) => {
    return await this.itemsRepository.findByQuery(query)
  }
}

export default InventoryController
