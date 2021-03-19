import Record from '../Interfaces/Database/Record'
import IItemRequest from '../../Interfaces/RequestObjects/IItemRequest'
import ItemTypes from '../../StaticDataStructures/ItemTypes'

class DbItem implements Record {
  private readonly _id: string
  private readonly userId?: string
  private readonly shoppingSessionId?: string
  private readonly label?: string
  private readonly brand?: string
  private readonly type?: ItemTypes
  private readonly cost?: number
  private readonly descriptiveTags?: string[]
  private readonly imageUri?: string
  private readonly imageKey?: string
  private _createdDate?: Date
  private isProcessed: boolean
  private isSold: boolean

  constructor (item: IItemRequest) {
    this._id = item.id
    this.userId = item.userId
    this.shoppingSessionId = item.shoppingSessionId
    this.label = item.label
    this.brand = item.brand
    this.type = item.type
    this.cost = item.cost
    this.descriptiveTags = item.descriptiveTags
    this.imageUri = item.imageUri
    this.imageKey = item.imageKey
    this._createdDate = item.createdDate
    this.isProcessed = item.isProcessed || false
    this.isSold = item.isSold || false
  }

  public get createdDate () {
    if(this._createdDate) return this._createdDate
    return new Date()
  }

  public get modifiedDate () {
    return new Date()
  }

  public get record () {
    return {
      _id: this._id,
      userId: this.userId,
      shoppingSessionId: this.shoppingSessionId,
      label: this.label,
      brand: this.brand,
      type: this.type,
      cost: this.cost,
      descriptiveTags: this.descriptiveTags,
      imageUri: this.imageUri,
      imageKey: this.imageKey,
      createdDate: this.createdDate,
      modifiedDate: this.modifiedDate,
      isProcessed: this.isProcessed,
      isSold: this.isSold
    }
  }
}

export default DbItem