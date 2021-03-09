interface IItemRequest {
  id: string,
  shoppingSessionId?: string,
  label?: string,
  brand?: string,
  type?: string,
  cost?: number,
  descriptiveTags?: string[],
  imageUri?: string,
  createdDate?: Date,
  isProccessed?: boolean
}

export default IItemRequest