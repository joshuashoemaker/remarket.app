import ItemRepository from "./ItemRepository"
import Item from '../../Entities/Item'
import IItem from "../../Interfaces/Entities/IItem"

let instance: InMemoryItemRepository | null = null

class InMemoryItemRepository extends ItemRepository {
  constructor (items?: IItem[]) {
    if (items) super(items)
    else super()

    if (!instance) instance = this

    return instance

    // this.items = [
    //   new Item({ id: 'XYZ', brand: 'JCPenny', type: 'clothing', cost: 3.01, descriptiveTags: ['silk', 'longsleeve'] }),
    //   new Item({ id: 'ABC', brand: 'Walmart', type: 'clothing', cost: 5.76, descriptiveTags: ['cotton', 'skirt'] }),
    //   new Item({ id: 'QWE', brand: 'JCPenny', type: 'clothing', cost: 1.21, descriptiveTags: ['poly', 'shortleeve'] })
    // ]
  }
}

export default InMemoryItemRepository