import MongoItemResponse from "./MongoItemResponse";

interface MongoShoppingSessionResponse {
  _id: string,
  createdDate: Date,
  modifiedDate: Date,
  items: MongoItemResponse[]
}

export default MongoShoppingSessionResponse
