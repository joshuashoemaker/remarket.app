import Item from "../../Entities/Item/Item"
import IItem from "../../Interfaces/Entities/IItem"

const makeItem = (itemProps: IItem): IItem => {
  return new Item(itemProps)
}

export default makeItem
