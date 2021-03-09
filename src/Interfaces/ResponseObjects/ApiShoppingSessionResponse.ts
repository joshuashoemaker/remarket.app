import ApiItemResponse from "./ApiItemResponse";

interface ApiShoppingSessionResponse {
  id: string,
  createdDate: string,
  modifiedDate: string,
  items: ApiItemResponse[]
}

export default ApiShoppingSessionResponse
