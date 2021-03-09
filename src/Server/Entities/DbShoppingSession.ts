import IItemRequest from '../../Interfaces/RequestObjects/IItemRequest'
import IShoppingSessionRequest from '../../Interfaces/RequestObjects/IShoppingSessionRequest'
import Record from '../Interfaces/Database/Record'

class DbShoppingSession implements Record {
  public readonly _id: string
  private _createdDate?: Date
  private itemIds: string[]

  constructor (shoppingSession: IShoppingSessionRequest) {
    this._id = shoppingSession.id
    this._createdDate = shoppingSession.createdDate
    this.itemIds = shoppingSession.items.map(i => i.id)
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
      createdDate: this.createdDate,
      modifiedDate: this.modifiedDate,
      itemIds: this.itemIds
    }
  }
}

export default DbShoppingSession
