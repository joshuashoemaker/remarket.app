import IItemClothingRequest from '../../Interfaces/RequestObjects/IItemClothingRequest'
import { ClothingGenders, ClothingArticles } from '../../StaticDataStructures/ClothingArticles'
import DbItem from './DbItem'

class DbItemClothing extends DbItem {
  private material?: string
  private timeOfProduction?: Date
  public gender?: ClothingGenders
  public article?: ClothingArticles
  public articleDetail?: string

  constructor (item: IItemClothingRequest) {
    super(item)
    this.article = item.article
    this.articleDetail = item.articleDetail
    this.gender = item.gender
    this.material = item.material
    this.timeOfProduction = item.timeOfProduction
  }

  public get record () {
    const overloadedProps = {
      article: this.article,
      articleDetail: this.articleDetail,
      gender: this.gender,
      material: this.material,
      timeOfProduction: this.timeOfProduction
    }
    return { ...super.record, ...overloadedProps }
  }
}

export default DbItemClothing
