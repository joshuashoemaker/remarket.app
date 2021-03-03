import IItem from '../Entities/IItem'

interface IItemRepository {
  items: IItem[],
  addItem(item: IItem): void,
  findById(id: string): IItem | undefined,
  findByBrand(brand: string): IItem[],
  findByLabel(label: string): IItem[],
  findByType(type: string): IItem[],
  findByCostRange(min: number, max: number): IItem[]
  findByDescriptedTag(tag: string): IItem[],
  removeItemById(id: string): void
}

export default IItemRepository
