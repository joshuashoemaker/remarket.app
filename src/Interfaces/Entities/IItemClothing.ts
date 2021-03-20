import { ClothingArticles, ClothingGenders } from '../../StaticDataStructures/ClothingArticles'
import IItem from './IItem'

interface IItemClothing extends IItem {
  material?: string,
  gender?: ClothingGenders,
  article?: ClothingArticles,
  articleDetail?: string,
  timeOfProduction?: Date
}

export default IItemClothing
