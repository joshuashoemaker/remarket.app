import * as React from 'react'
import IItemClothing from '../../../../../Interfaces/Entities/IItemClothing'
import ItemTypes from '../../../../../StaticDataStructures/ItemTypes'
import EditClothingItemDetailInInventory from './EditClothingItemDetailInInventory'

class EditItemDetailOptions extends React.Component {
  public clothingDetailForm: React.RefObject<EditClothingItemDetailInInventory> = React.createRef()
    
  getDetailsByDetailType (detailType: ItemTypes) {
    console.log(detailType)
    console.log(this.clothingDetailForm)
    if (detailType === ItemTypes.Clothing) return this.clothingDetailForm.current?.details
  }
  
  getElementByName (name: string, item?: IItemClothing) {
    if (name === ItemTypes.Clothing) return <EditClothingItemDetailInInventory ref={this.clothingDetailForm} item={item} />
  }
}

export default EditItemDetailOptions
