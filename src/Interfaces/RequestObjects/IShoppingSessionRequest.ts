import IItemRequest from "./IItemRequest";

interface IShoppingSessionRequest {
  id: string,
  createdDate?: Date,
  subtotal: number,
  tax: number,
  total: number
  items: IItemRequest[]
}

export default IShoppingSessionRequest
