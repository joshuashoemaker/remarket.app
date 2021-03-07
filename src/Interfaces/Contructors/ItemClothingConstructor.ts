import IItem from "../Entities/IItem";

interface ItemClothingConstructor extends IItem {
  material?: string,
  timeOfProduction?: Date
}

export default ItemClothingConstructor
