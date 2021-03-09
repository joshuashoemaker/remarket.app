import { v4 as uuidv4 } from 'uuid'
import makeItem from '../../Factories/Item/makeItem'
import makeItemClothing from '../../Factories/Item/makeItemClothing'
import ShoppingSessionConstructor from '../../Interfaces/Contructors/ShoppingSessionConstructor'
import IItem from '../../Interfaces/Entities/IItem'
import IShoppingSession from '../../Interfaces/Entities/IShoppingSession'
import IItemRequest from '../../Interfaces/RequestObjects/IItemRequest'
import IShoppingSessionRequest from '../../Interfaces/RequestObjects/IShoppingSessionRequest'

class ShoppingSession implements IShoppingSession {
  readonly id: string
  private _items: IItem[]
  private _tax?: number
  private _subtotal?: number
  private _total?: number

  constructor (props: ShoppingSessionConstructor) {
    this.id = props.id || uuidv4()
    this._items = props.items || props.itemRepository?.items || []
    this._tax = props.tax
    this._subtotal = props.subtotal
  }

  get items (): IItem[] {
    return this._items.map(i => {
      if (i.type === 'clothing') return makeItemClothing(i)
      return makeItem(i)
    })
  }

  get subtotal () {
    if (this._subtotal) return this._subtotal
    if (this.items.length <= 0) return 0

    let subtotal = 0
    this.items.forEach(i => {
      if (i.cost) subtotal = subtotal + i.cost
    })

    return subtotal
  }

  set subtotal (value: number) {
    this._subtotal = value
  }

  get tax () {
    if (!this.subtotal) return 0
    return this._tax ?? this.subtotal * 0.10
  }

  set tax (value: number) {
    this._tax = value
  }

  get total () {
    if (this._total) return this._total
    let subtotal = this.subtotal || 0
    let tax = this.tax || 0
    return subtotal + tax
  }

  set total (value) {
    this._total = value
  }

  finalize = (): IShoppingSessionRequest => {
    return {
      id: this.id,
      subtotal: this.subtotal,
      tax: this.tax,
      total: this.total,
      items: this.items as IItemRequest[]
    }
  }
}

export default ShoppingSession
