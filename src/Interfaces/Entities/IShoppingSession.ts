import IItem from './IItem'

interface IShoppingSession {
  id: string,
  items: IItem[],
  subtotal?: number,
  tax?: number,
  total: number,
  finalize(): void
}

export default IShoppingSession