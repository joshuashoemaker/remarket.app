import Item from "./Item";
import IItemClothing from "../../Interfaces/Entities/IItemClothing";

class ItemClothing extends Item {
  public material: string | undefined
  public timeOfProduction: Date | undefined

  constructor (props: IItemClothing) {
    super(props)
    this.material = props.material
    this.timeOfProduction = props.timeOfProduction
  }
}

export default ItemClothing
