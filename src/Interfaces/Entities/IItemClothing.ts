import IItem from './IItem'

interface IItemClothing extends IItem {
  material?: string,
  timeOfProduction?: Date
}

export default IItemClothing
