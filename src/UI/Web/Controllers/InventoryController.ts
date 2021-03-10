import MongoDbItemRepository from "../../../Repositories/ItemRepository/MongoDbItemRepository";

class InventoryController {
  private itemsRepository = new MongoDbItemRepository()

  getItems = async () => {
    return await this.itemsRepository.getAllItems()
  }
}

export default InventoryController
