import IItem from "../Entities/Item/IItem";

interface ItemClothingConstructor extends IItem {
  material?: string,
  timeOfProduction?: Date
}

export default ItemClothingConstructor
