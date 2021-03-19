import ItemTypes from "../../StaticDataStructures/ItemTypes";

interface ApiItemResponse {
  id: string,
  shoppingSessionId?: string,
  label?: string,
  brand?: string,
  type?: ItemTypes,
  cost?: number,
  descriptiveTags?: string[],
  imageUri?: string,
  imageKey?: string,
  createdDate?: Date,
  isProcessed: boolean,
  isSold: boolean,
  sellPrice?: number
}

export default ApiItemResponse
