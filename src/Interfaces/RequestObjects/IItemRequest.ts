interface IItemRequest {
  id: string,
  userId?: string,
  shoppingSessionId?: string,
  label?: string,
  brand?: string,
  type?: string,
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
