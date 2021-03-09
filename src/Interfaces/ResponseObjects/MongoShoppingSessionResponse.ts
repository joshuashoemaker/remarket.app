import MongoItemResponse from "./MongoItemResponse";

interface MongoShoppingSessionResponse {
  _id: string,
  createdDate: string,
  modifiedDate: string,
  items: MongoItemResponse[]
}

export default MongoShoppingSessionResponse
