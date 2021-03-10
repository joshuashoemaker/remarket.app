import IItem from '../../Interfaces/Entities/IItem'
import ItemConstructor from '../../Interfaces/Contructors/ItemConstructor'
import MarketPlatforms from '../../StaticDataStructures/MarketPlatforms'

class Item implements IItem {
  readonly id: string
  readonly shoppingSessionId?: string
  public brand?: string
  public type?: string
  public cost?: number
  public label?: string
  public descriptiveTags: string[]
  public imageUri?: string
  public isProcessed: boolean
  public isSold: boolean
  public marketPlatform: MarketPlatforms
  public listedPrice?: number

  constructor(props: ItemConstructor) {
    this.id = props.id
    this.brand = props.brand
    this.type = props.type
    this.cost = props.cost
    this.label = props.label
    this.descriptiveTags = props.descriptiveTags || []
    this.imageUri = props.imageUri
    this.isProcessed = props.isProcessed || false
    this.isSold = props.isSold || false
    this.marketPlatform = props.marketPlatform || MarketPlatforms.none
    this.listedPrice = props.listedPrice
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
