import IItemClothingRequest from '../../Interfaces/RequestObjects/IItemClothingRequest'
import DbItem from './DbItem'

class DbItemClothing extends DbItem {
  private material?: string
  private timeOfProduction?: Date

  constructor (item: IItemClothingRequest) {
    super(item)
    this.material = item.material
    this.timeOfProduction = item.timeOfProduction
  }

  public get record () {
    const overloadedProps = {
      material: this.material,
      timeOfProduction: this.timeOfProduction
    }
    return { ...super.record, ...overloadedProps }
  }
}

export default DbItemClothing
