import IShoppingSessionRequest from '../RequestObjects/IShoppingSessionRequest'
import IItem from './IItem'

interface IShoppingSession {
  id: string,
  items: IItem[],
  subtotal: number,
  tax: number,
  total: number,
  finalize(): IShoppingSessionRequest
}

export default IShoppingSession