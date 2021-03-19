import { v4 as uuidv4 } from 'uuid'
import ShoppingSession from '../../../Entities/ShoppingSession/ShoppingSession'
import IItem from '../../../Interfaces/Entities/IItem'

class AddItemToShoppingSessionController {
  private _makeItem: Function
  public readonly itemId: string
  private shoppingSession: ShoppingSession = new ShoppingSession()

  constructor(props: { itemId?: string,  makeItem(itemProps: IItem): IItem }) {
    this._makeItem = props.makeItem
    this.itemId = props.itemId || uuidv4()
  }

  addItem = (itemProps: IItem) => {
    this.shoppingSession.itemRepository.addItem(this._makeItem(itemProps))
  }

  editItem = (item: IItem) => {
    const modifiedItem = this.shoppingSession.itemRepository.editById(item.id, item)
    return modifiedItem
  }

  get currentItem (): IItem | undefined {
    return this.shoppingSession.itemRepository.findById(this.itemId) as IItem
  }

  set makeItemFactory (factory: Function) {
    this._makeItem = factory
  }
}

export default AddItemToShoppingSessionController