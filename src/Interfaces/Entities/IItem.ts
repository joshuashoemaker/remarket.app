import ItemTypes from "../../StaticDataStructures/ItemTypes";
import MarketPlatforms from "../../StaticDataStructures/MarketPlatforms";

interface IItem {
  id: string,
  shoppingSessionId?: string,
  label?: string,
  brand?: string,
  type?: ItemTypes,
  cost?: number,
  descriptiveTags?: string[],
  imageUri?: string,
  image?: File,
  isProcessed: boolean,
  isSold: boolean,
  marketPlatform?: MarketPlatforms,
  listedPrice?: number,
  sellPrice?: number,
  addDescriptiveTag(tag: string): void,
  removeDescriptiveTag(tag: string): void
}

export default IItem
