import Item from "./Item";
import ItemClothingConstructor from "../../Interfaces/Contructors/ItemClothingConstructor";

class ItemClothing extends Item {
  public material: string | undefined
  public timeOfProduction: Date | undefined

  constructor (props: ItemClothingConstructor) {
    super(props)
    this.material = props.material
    this.timeOfProduction = props.timeOfProduction
  }
}

export default ItemClothing
