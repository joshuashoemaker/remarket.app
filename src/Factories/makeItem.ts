import Item from "../Entities/Item";
import ItemConstructor from "../Interfaces/Contructors/ItemConstructor";
import IItem from "../Interfaces/Entities/IItem";

const makeItem = (itemProps: ItemConstructor): IItem => {
  return new Item(itemProps)
}

export default makeItem
