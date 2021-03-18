interface ApiItemResponse {
  id: string,
  shoppingSessionId?: string,
  label?: string,
  brand?: string,
  type?: string,
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
