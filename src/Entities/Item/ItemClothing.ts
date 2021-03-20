import Item from "./Item";
import IItemClothing from "../../Interfaces/Entities/IItemClothing";
import { ClothingArticles, ClothingGenders } from "../../StaticDataStructures/ClothingArticles";

class ItemClothing extends Item {
  public material?: string
  public timeOfProduction?: Date
  public gender?: ClothingGenders
  public article?: ClothingArticles
  public articleDetail?: string

  constructor (props: IItemClothing) {
    super(props)
    this.article = props.article
    this.articleDetail = props.articleDetail
    this.gender = props.gender
    this.material = props.material
    this.timeOfProduction = props.timeOfProduction
  }
}

export default ItemClothing
