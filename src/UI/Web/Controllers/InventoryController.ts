import axios from "axios";
import User from "../../../Entities/User/User";
import IItem from "../../../Interfaces/Entities/IItem";
import MongoDbItemRepository from "../../../Repositories/ItemRepository/MongoDbItemRepository";

class InventoryController {
  private itemsRepository = new MongoDbItemRepository()

  getItems = async () => {
    return await this.itemsRepository.getAllItems()
  }

  getItemById = async (id: string) => {
    return await this.itemsRepository.findById(id)
  }

  editItem = async (item: IItem) => {
    let imageKey: string = ''

    if (item.image) {
      const formData = new FormData()
      formData.append('image', item.image)
      const uploadImageToBucketResponse = await axios.post(`/api/protected/item/addImage/${item.id}`,
      formData,
      { headers: {
          Authorization: `Bearer ${User.token}`,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
      if (uploadImageToBucketResponse.status === 201) {
        imageKey = uploadImageToBucketResponse.data.data.imageKey
      }
    }

    item.imageKey = imageKey
    return await this.itemsRepository.editById(item.id, item)
  }
}

export default InventoryController
