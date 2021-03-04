import * as React from 'react'
import { Box, IconButton } from '@material-ui/core'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import './styles.css'
import AddItemToShoppingSessionController from '../../Controllers/AddItemToShoppingSessionController'
import makeInMemoryItemRepository from '../../../../Factories/makeInMemoryItemRepository'
import makeItem from '../../../../Factories/makeItem'

interface AddItemProps { }

interface AddItemState {
  itemImageSrc: string
}

class AddItemToShoppingSession extends React.Component<AddItemProps, AddItemState> {
  private fileInput: React.RefObject<HTMLInputElement>
  private controller: AddItemToShoppingSessionController

  constructor (props: AddItemProps) {
    super(props)

    this.controller = new AddItemToShoppingSessionController({ makeItemRepository: makeInMemoryItemRepository, makeItem: makeItem })

    this.state = { itemImageSrc: 'https://designshack.net/wp-content/uploads/placeholder-image.png' }
    this.fileInput = React.createRef()
  }
  
  onAddImage = () => {
    if (!this?.fileInput?.current?.files?.[0]) return

    const file = this.fileInput.current.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e!.target!.result as string
      this.setState({ itemImageSrc: src })
      this.controller.addItem({ id:'IUYTRE', imageUri: src })
    }

    reader.readAsDataURL(file)
  }

  render() {
    return <div className='AddItemToShoppingSession'>
      <Box m={1} className='itemImageSection'>
        <img alt='item preview' src={this.state.itemImageSrc} />
        <IconButton component='label' className='addItemImageIcon'>
          <PhotoCameraIcon />
          <input ref={this.fileInput} onChange={this.onAddImage} id='uploadImage' type='file' hidden accept='image/*' />
        </IconButton>
      </Box>
    </div>
  }
}

export default AddItemToShoppingSession
