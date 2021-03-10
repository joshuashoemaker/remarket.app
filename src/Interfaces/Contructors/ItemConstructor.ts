interface ItemConstructor {
  id: string,
  shoppingSessionId?: string,
  label?: string,
  brand?: string,
  type?: string,
  cost?: number,
  descriptiveTags?: string[],
  imageUri?: string,
  isProcessed?: boolean
  isSold?: boolean
}

export default ItemConstructor
