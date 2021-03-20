import ItemClothing from "../../Entities/Item/ItemClothing";
import IItemClothing from "../../Interfaces/Entities/IItemClothing";
import IItem from "../../Interfaces/Entities/IItem";

const makeItemClothing = (itemProps: IItemClothing): IItem => {
  return new ItemClothing(itemProps)
}

export default makeItemClothing
