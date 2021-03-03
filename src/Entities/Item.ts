import IItem from '../Interfaces/Entities/IItem'
import ItemConstructor from '../Interfaces/Contructors/ItemConstructor'

class Item implements IItem {
  readonly id: string
  public brand: string | undefined
  public type: string | undefined
  public cost: number | undefined
  public descriptiveTags: string[]

  constructor(props: ItemConstructor) {
    this.id = props.id
    this.brand = props.brand
    this.type = props.type
    this.cost = props.cost
    this.descriptiveTags = props.descriptiveTags || []
  }

  addDescriptiveTag = (tag: string): void => {
    if (this.descriptiveTags.includes(tag)) return

    this.descriptiveTags.push(tag)
  }

  removeDescriptiveTag = (tag: string): void => {
    if (!this.descriptiveTags.includes(tag)) return

    const tagIndex = this.descriptiveTags.findIndex(t => t === tag)
    this.descriptiveTags.splice(tagIndex, 1)
  }
}

export default Item
