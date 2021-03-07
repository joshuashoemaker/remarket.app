import ItemClothing from "../../Entities/Item/ItemClothing";
import ItemClothingConstructor from "../../Interfaces/Contructors/ItemClothingConstructor";
import IItem from "../../Interfaces/Entities/IItem";

const makeItemClothing = (itemProps: ItemClothingConstructor): IItem => {
  return new ItemClothing(itemProps)
}

export default makeItemClothing
