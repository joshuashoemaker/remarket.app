import IShoppingSessionRequest from '../RequestObjects/IShoppingSessionRequest'
import IItem from './IItem'

interface IShoppingSession {
  id: string,
  items: IItem[],
  subtotal: number,
  tax: number,
  total: number,
  createdDate?: Date,
  modifiedDate?: Date,
  destructor(): void,
  finalize(idsOfItemsToKeep?: string[]): IShoppingSessionRequest
}

export default IShoppingSession