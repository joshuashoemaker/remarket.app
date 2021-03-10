import { v4 as uuidv4 } from 'uuid'
import ShoppingSessionConstructor from '../../Interfaces/Contructors/ShoppingSessionConstructor'
import IItem from '../../Interfaces/Entities/IItem'
import IShoppingSession from '../../Interfaces/Entities/IShoppingSession'
import IItemRepository from '../../Interfaces/Repositories/IItemRepository'
import IItemRequest from '../../Interfaces/RequestObjects/IItemRequest'
import IShoppingSessionRequest from '../../Interfaces/RequestObjects/IShoppingSessionRequest'
import InMemoryItemRepository from '../../Repositories/ItemRepository/InMemoryItemRepository'

let instance: ShoppingSession | null

class ShoppingSession implements IShoppingSession {
  readonly id: string
  public itemRepository: IItemRepository
  private _tax?: number
  private _subtotal?: number
  private _total?: number

  constructor (props?: ShoppingSessionConstructor) {
    if (!instance) instance = this

    this.id = props?.id || uuidv4()
    this.itemRepository = new InMemoryItemRepository(props?.items)
    this._tax = props?.tax
    this._subtotal = props?.subtotal
    
    return instance
  }

  destructor = () => {
    instance = null
  }

  get items (): IItem[] {
    return this.itemRepository.items!
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

  finalize = (idsOfItemsToKeep?: string[]): IShoppingSessionRequest => {
    const itemIds = idsOfItemsToKeep || this.itemRepository.items!.map(i => i.id)
    const items = this.items.filter(i => itemIds.includes(i.id))
    return {
      id: this.id,
      subtotal: this.subtotal,
      tax: this.tax,
      total: this.total,
      items: items as IItemRequest[]
    }
  }
}

export default ShoppingSession
