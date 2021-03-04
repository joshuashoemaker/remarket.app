import IItemRepository from "../Interfaces/Repositories/IItemRepository"
import InMemoryItemRepository from "../Repositories/ItemRepository/InMemoryItemRepository"

const makeInMemoryItemRepository = (): IItemRepository => {
  return new InMemoryItemRepository()
}

export default makeInMemoryItemRepository
