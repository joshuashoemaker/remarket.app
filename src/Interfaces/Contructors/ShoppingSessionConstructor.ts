import IItem from '../Entities/IItem'
import IItemRepository from '../Repositories/IItemRepository'

interface ShoppingSessionConstructor {
  id?: string,
  items?: IItem[],
  itemRepository?: IItemRepository,
  subtotal?: number,
  total?: number,
  tax?: number,
}

export default ShoppingSessionConstructor