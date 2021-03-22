import IItemClothingRequest from '../../Interfaces/RequestObjects/IItemClothingRequest'
import { ClothingGenders, ClothingArticles } from '../../StaticDataStructures/ClothingArticles'
import DbItem from './DbItem'

class DbItemClothing extends DbItem {
  private material?: string
  public gender?: ClothingGenders
  public article?: ClothingArticles
  public articleDetail?: string

  constructor (item: IItemClothingRequest) {
    super(item)
    this.article = item.article
    this.articleDetail = item.articleDetail
    this.gender = item.gender
    this.material = item.material
  }

  public get record () {
    const overloadedProps = {
      article: this.article,
      articleDetail: this.articleDetail,
      gender: this.gender,
      material: this.material
    }
    return { ...super.record, ...overloadedProps }
  }
}

export default DbItemClothing
