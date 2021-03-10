import ItemConstructor from "../../../Interfaces/Contructors/ItemConstructor";
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

  editItem = async (item: ItemConstructor) => {
    return await this.itemsRepository.editById(item.id, item)
  }
}

export default InventoryController
