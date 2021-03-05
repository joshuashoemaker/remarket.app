import * as React from 'react'
import AddClothingItemDetailToShoppingSession from './AddClothingItemDetailToShoppingSession'

class AddItemDetailOptions extends React.Component {
  public clothingDetailForm: React.RefObject<AddClothingItemDetailToShoppingSession> = React.createRef()

  get clothing () {
    return <AddClothingItemDetailToShoppingSession ref={this.clothingDetailForm} />
  }

    
  getDetailsByDetailType (detailType: string) {
    if (detailType === 'clothing') return this.clothingDetailForm.current?.details
  }
  
  getElementByName (name: string) {
    if (name === 'clothing') return this.clothing
  }
}

export default AddItemDetailOptions
