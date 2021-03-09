import { v4 as uuidv4 } from 'uuid'
import ShoppingSession from '../../../Entities/ShoppingSession/ShoppingSession'
import ItemConstructor from '../../../Interfaces/Contructors/ItemConstructor'
import IItem from '../../../Interfaces/Entities/IItem'

class AddItemToShoppingSessionController {
  private _makeItem: Function
  public readonly itemId: string
  private shoppingSession: ShoppingSession = new ShoppingSession()

  constructor(props: { itemId?: string,  makeItem(itemProps: ItemConstructor): IItem }) {
    this._makeItem = props.makeItem
    this.itemId = props.itemId || uuidv4()
  }

  addItem = (itemProps: ItemConstructor) => {
    this.shoppingSession.itemRepository.addItem(this._makeItem(itemProps))
  }

  editItem = (item: ItemConstructor) => {
    const modifiedItem = this.shoppingSession.itemRepository.editById(item.id, item)
    return modifiedItem
  }

  get currentItem (): IItem | undefined {
    return this.shoppingSession.itemRepository.findById(this.itemId)
  }

  set makeItemFactory (factory: Function) {
    this._makeItem = factory
  }
}

export default AddItemToShoppingSessionController