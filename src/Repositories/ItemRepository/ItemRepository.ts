import IItem from '../../Interfaces/Entities/Item/IItem'
import ItemConstructor from '../../Interfaces/Contructors/ItemConstructor'
import IItemRepository from '../../Interfaces/Repositories/IItemRepository'

class ItemRepository implements IItemRepository {
  public items: IItem[]

  constructor (items?: IItem[]) {
    if (items) this.items = items
    else this.items = []
  }

  addItem = (item: IItem) => this.items.push(item)

  editById = (id: string, modifications: ItemConstructor) => {
    let item = this.findById(id)
    item = Object.assign(item, modifications)
    return item
  }

  findById = (id: string) => this.items.find(i => id === i.id)

  findByBrand = (brand: string) => this.items.filter(i => i.brand?.toLowerCase() === brand.toLowerCase())

  findByLabel = (label: string) => this.items.filter(i => i.label?.toLowerCase() === label.toLowerCase())

  findByType = (type: string) => this.items.filter(i => i.type?.toLowerCase() === type.toLowerCase())

  findByCostRange = (min: number, max: number) => {
    let items = this.items.filter(i => i.cost)
    items = items.filter(i => i.cost! >= min)
    items = items.filter(i => i.cost! <= max)
    return items
  }

  findByDescriptedTag = (tag: string) => this.items.filter(i => i.descriptiveTags?.includes(tag))

  removeItemById = (id: string) => {
    const itemIndex = this.items.findIndex(i => i.id === id)
    this.items.splice(itemIndex, 1)
  }
}

export default ItemRepository
