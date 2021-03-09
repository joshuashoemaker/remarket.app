import ItemRepository from "./ItemRepository"
import IItem from "../../Interfaces/Entities/IItem"

class InMemoryItemRepository extends ItemRepository {
  constructor (items?: IItem[]) {
    super(items)
  }
}

export default InMemoryItemRepository