import IItemRequest from "../RequestObjects/IItemRequest";

interface MongoItemResponse extends IItemRequest {
  _id: string
}

export default MongoItemResponse
