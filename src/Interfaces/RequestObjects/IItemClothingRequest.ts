import IItemRequest from "./IItemRequest";

interface IItemClothingRequest extends IItemRequest {
  material?: string,
  timeOfProduction?: Date
}

export default IItemClothingRequest
