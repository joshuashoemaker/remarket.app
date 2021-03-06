import * as React from 'react'
import ItemClothingConstructor from '../../../../../Interfaces/Contructors/ItemClothingConstructor'
import AddClothingItemDetailToShoppingSession from './AddClothingItemDetailToShoppingSession'

class AddItemDetailOptions extends React.Component {
  public clothingDetailForm: React.RefObject<AddClothingItemDetailToShoppingSession> = React.createRef()
    
  getDetailsByDetailType (detailType: string) {
    if (detailType === 'clothing') return this.clothingDetailForm.current?.details
  }
  
  getElementByName (name: string, item?: ItemClothingConstructor) {
    if (name === 'clothing') return <AddClothingItemDetailToShoppingSession ref={this.clothingDetailForm} item={item} />
  }
}

export default AddItemDetailOptions
