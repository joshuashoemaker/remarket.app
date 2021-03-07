import ItemRepository from "./ItemRepository"
import IItem from "../../Interfaces/Entities/IItem"

let instance: InMemoryItemRepository | null = null

class InMemoryItemRepository extends ItemRepository {
  constructor (items?: IItem[]) {
    super(items)

    if (!instance) instance = this

    return instance
  }
}

export default InMemoryItemRepository