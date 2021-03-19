import ItemTypes from "../../StaticDataStructures/ItemTypes";
import MarketPlatforms from "../../StaticDataStructures/MarketPlatforms";

interface ItemConstructor {
  [key: string]: any,
  id: string,
  shoppingSessionId?: string,
  label?: string,
  brand?: string,
  type?: ItemTypes,
  cost?: number,
  descriptiveTags?: string[],
  image?: File,
  imageUri?: string,
  imageKey?: string,
  isProcessed?: boolean
  isSold?: boolean,
  marketPlatform?: MarketPlatforms,
  listedPrice?: number,
  sellPrice?: number
}

export default ItemConstructor
