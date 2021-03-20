import { v4 as uuidv4 } from 'uuid'
import ShoppingSession from '../../../Entities/ShoppingSession/ShoppingSession'
import makeItem from '../../../Factories/Item/makeItem'
import makeItemClothing from '../../../Factories/Item/makeItemClothing'
import IItem from '../../../Interfaces/Entities/IItem'
import ItemTypes from '../../../StaticDataStructures/ItemTypes'

class AddItemToShoppingSessionController {
  public readonly itemId: string
  private shoppingSession: ShoppingSession = new ShoppingSession()

  constructor(props: { itemId?: string }) {
    this.itemId = props.itemId || uuidv4()
  }

  addItem = (itemProps: IItem) => {
    let item: IItem | null = null
    if (itemProps.type === ItemTypes.Clothing) item = makeItemClothing(itemProps)
    else item = makeItem(itemProps)

    this.shoppingSession.itemRepository.addItem(item)
  }

  editItem = (item: IItem) => {
    const modifiedItem = this.shoppingSession.itemRepository.editById(item.id, item)
    return modifiedItem
  }

  get currentItem (): IItem | undefined {
    return this.shoppingSession.itemRepository.findById(this.itemId) as IItem
  }
}

export default AddItemToShoppingSessionController