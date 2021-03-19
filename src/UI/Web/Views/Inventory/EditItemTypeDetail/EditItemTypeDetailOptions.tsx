import * as React from 'react'
import IItemClothing from '../../../../../Interfaces/Entities/IItemClothing'
import EditClothingItemDetailInInventory from './EditClothingItemDetailInInventory'

class EditItemDetailOptions extends React.Component {
  public clothingDetailForm: React.RefObject<EditClothingItemDetailInInventory> = React.createRef()
    
  getDetailsByDetailType (detailType: string) {
    if (detailType === 'clothing') return this.clothingDetailForm.current?.details
  }
  
  getElementByName (name: string, item?: IItemClothing) {
    if (name === 'clothing') return <EditClothingItemDetailInInventory ref={this.clothingDetailForm} item={item} />
  }
}

export default EditItemDetailOptions
