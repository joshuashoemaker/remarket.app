import * as React from 'react'
import ItemClothingConstructor from '../../../../../Interfaces/Contructors/ItemClothingConstructor'
import EditClothingItemDetailInInventory from './EditClothingItemDetailInInventory'

class EditItemDetailOptions extends React.Component {
  public clothingDetailForm: React.RefObject<EditClothingItemDetailInInventory> = React.createRef()
    
  getDetailsByDetailType (detailType: string) {
    if (detailType === 'clothing') return this.clothingDetailForm.current?.details
  }
  
  getElementByName (name: string, item?: ItemClothingConstructor) {
    if (name === 'clothing') return <EditClothingItemDetailInInventory ref={this.clothingDetailForm} item={item} />
  }
}

export default EditItemDetailOptions
