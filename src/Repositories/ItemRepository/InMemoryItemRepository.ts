import ItemRepository from "./ItemRepository"
import Item from '../../Entities/Item'

class InMemoryItemRepository extends ItemRepository {
  constructor () {
    super()

    this.items = [
      new Item({ id: 'XYZ', brand: 'JCPenny', type: 'clothing', cost: 3.01, descriptiveTags: ['silk', 'longsleeve'] }),
      new Item({ id: 'ABC', brand: 'Walmart', type: 'clothing', cost: 3.01, descriptiveTags: ['silk', 'longsleeve'] }),
      new Item({ id: 'XYZ', brand: 'JCPenny', type: 'clothing', cost: 3.01, descriptiveTags: ['silk', 'longsleeve'] })
    ]
  }
}

export default InMemoryItemRepository