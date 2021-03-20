import { ClothingGenders, ClothingArticles } from "../../StaticDataStructures/ClothingArticles";
import IItemRequest from "./IItemRequest";

interface IItemClothingRequest extends IItemRequest {
  material?: string,
  timeOfProduction?: Date
  gender?: ClothingGenders
  article?: ClothingArticles
  articleDetail?: string
}

export default IItemClothingRequest
