import * as React from 'react'
import IItemClothing from '../../../../../Interfaces/Entities/IItemClothing'
import ItemTypes from '../../../../../StaticDataStructures/ItemTypes'
import AddClothingItemDetailToShoppingSession from './AddClothingItemDetailToShoppingSession'

class AddItemDetailOptions extends React.Component {
  public clothingDetailForm: React.RefObject<AddClothingItemDetailToShoppingSession> = React.createRef()
    
  getDetailsByDetailType (detailType: ItemTypes) {
    if (detailType === ItemTypes.Clothing) return this.clothingDetailForm.current?.details
  }
  
  getElementByName (name: string, item?: IItemClothing) {
    if (name === ItemTypes.Clothing) return <AddClothingItemDetailToShoppingSession ref={this.clothingDetailForm} item={item} />
  }
}

export default AddItemDetailOptions
