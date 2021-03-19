import IItem from '../Entities/IItem'

interface IItemRepository {
  items?: IItem[],
  getAllItems?(): Promise<IItem[] | null>,
  addItem(item: IItem): void,
  editById(id: string, modifications: IItem): Promise<IItem | null> | IItem,
  findById(id: string): IItem | Promise<IItem | null> | undefined,
  findByBrand(brand: string): IItem[],
  findByLabel(label: string): IItem[],
  findByType(type: string): IItem[],
  findByCostRange(min: number, max: number): IItem[]
  findByDescriptedTag(tag: string): IItem[],
  removeItemById(id: string): void
}

export default IItemRepository
