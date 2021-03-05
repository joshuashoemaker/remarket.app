import ItemConstructor from '../../../Interfaces/Contructors/ItemConstructor'
import IItem from '../../../Interfaces/Entities/IItem'
import IItemRepository from '../../../Interfaces/Repositories/IItemRepository'

class AddItemToShoppingSessionController {
  private itemRepository: IItemRepository
  private makeItem: Function

  constructor(props: { makeItemRepository(): IItemRepository, makeItem(itemProps: ItemConstructor): IItem }) {
    this.itemRepository = props.makeItemRepository()
    this.makeItem = props.makeItem

  }

  addItem = (itemProps: ItemConstructor) => {
    this.itemRepository.addItem(this.makeItem(itemProps))
  }

  editItem = (item: IItem) => {
    const modifiedItem = this.itemRepository.editById(item.id, item)
    return modifiedItem
  }
}

export default AddItemToShoppingSessionController