import ItemTypes from "../../StaticDataStructures/ItemTypes";
import IItem from "../Entities/IItem";

interface IItemRequest extends IItem {
  userId?: string,
  createdDate?: Date,
}

export default IItemRequest
