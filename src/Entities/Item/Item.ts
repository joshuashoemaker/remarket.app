import IItem from '../../Interfaces/Entities/IItem'
import MarketPlatforms from '../../StaticDataStructures/MarketPlatforms'
import ItemTypes from '../../StaticDataStructures/ItemTypes'

class Item implements IItem {
  readonly id: string
  readonly shoppingSessionId?: string
  public brand?: string
  public type?: ItemTypes
  public cost?: number
  public label?: string
  public descriptiveTags: string[]
  public image?: File
  public imageUri?: string
  public imageKey?: string
  public isProcessed: boolean
  public isSold: boolean
  public marketPlatform: MarketPlatforms
  public listedPrice?: number
  public sellPrice?: number

  constructor(props: IItem) {
    this.id = props.id
    this.brand = props.brand
    this.type = props.type
    this.cost = props.cost
    this.label = props.label
    this.descriptiveTags = props.descriptiveTags || []
    this.image = props.image
    this.imageUri = props.imageUri
    this.imageKey = props.imageKey
    this.isProcessed = props.isProcessed || false
    this.isSold = props.isSold || false
    this.marketPlatform = props.marketPlatform || MarketPlatforms.none
    this.listedPrice = props.listedPrice
    this.sellPrice = props.sellPrice
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
