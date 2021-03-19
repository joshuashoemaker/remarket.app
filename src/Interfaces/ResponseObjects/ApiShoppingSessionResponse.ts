import IItem from "../Entities/IItem";

interface ApiShoppingSessionResponse {
  id: string,
  createdDate: Date,
  modifiedDate: Date,
  items: IItem[]
}

export default ApiShoppingSessionResponse
