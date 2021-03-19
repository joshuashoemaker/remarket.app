import ItemTypes from "../../StaticDataStructures/ItemTypes";

interface IItemRequest {
  id: string,
  userId?: string,
  shoppingSessionId?: string,
  label?: string,
  brand?: string,
  type?: ItemTypes,
  cost?: number,
  descriptiveTags?: string[],
  imageUri?: string,
  image?: File,
  imageKey?: string,
  createdDate?: Date,
  isProccessed?: boolean
  isSold?: boolean,
  sellPrice?: number
}

export default IItemRequest
