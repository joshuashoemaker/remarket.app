import ItemConstructor from '../../../Interfaces/Contructors/ItemConstructor'
import IItem from '../../../Interfaces/Entities/IItem'
import IItemRepository from '../../../Interfaces/Repositories/IItemRepository'

class AddItemToShoppingSessionController {
  private itemRepository: IItemRepository
  private _makeItem: Function

  constructor(props: { makeItemRepository(): IItemRepository, makeItem(itemProps: ItemConstructor): IItem }) {
    this.itemRepository = props.makeItemRepository()
    this._makeItem = props.makeItem
  }

  addItem = (itemProps: ItemConstructor) => {
    this.itemRepository.addItem(this._makeItem(itemProps))
  }

  editItem = (item: ItemConstructor) => {
    const modifiedItem = this.itemRepository.editById(item.id, item)
    return modifiedItem
  }

  set makeItemFactory (factory: Function) {
    this._makeItem = factory
  }
}

export default AddItemToShoppingSessionController