import * as React from 'react'
import history from '../history'
import { v4 as uuidv4 } from 'uuid'
import makeItem from '../../../../Factories/Item/makeItem'
import AddItemToShoppingSessionController from '../../Controllers/AddItemToShoppingSessionController'
import makeInMemoryItemRepository from '../../../../Factories/makeInMemoryItemRepository'
import AddItemDetailOptions from './AddItemDetail/AddItemDetailOptions'

import { AppBar, Box, Button, IconButton, MenuItem, TextField, Toolbar } from '@material-ui/core'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import InfoIcon from '@material-ui/icons/Info';
import './styles.css'
import makeItemClothing from '../../../../Factories/Item/makeItemClothing'

interface AddItemProps { }

interface AddItemState {
  cost: number | '',
  type: string,
  brand: string,
  label: string,
  itemImageSrc: string
}

class AddItemToShoppingSession extends React.Component<AddItemProps, AddItemState> {
  private fileInput: React.RefObject<HTMLInputElement>
  private controller: AddItemToShoppingSessionController
  private itemDetailOptions: AddItemDetailOptions

  constructor (props: AddItemProps) {
    super(props)

    this.controller = new AddItemToShoppingSessionController({ makeItemRepository: makeInMemoryItemRepository, makeItem: makeItem })
    this.itemDetailOptions = new AddItemDetailOptions({/* empty props */})

    this.state = {
      itemImageSrc: 'https://designshack.net/wp-content/uploads/placeholder-image.png',
      cost: '',
      type: 'NA',
      brand: '',
      label: ''
    }
    this.fileInput = React.createRef()
  }
  
  onAddImage = () => {
    if (!this?.fileInput?.current?.files?.[0]) return

    const file = this.fileInput.current.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e!.target!.result as string
      this.setState({ itemImageSrc: src })
    }

    reader.readAsDataURL(file)
  }

  onBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ brand: e.target.value })
  }

  onCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ cost: e.target.valueAsNumber || '' })
  }

  onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ label: e.target.value })
  }

  onTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value
    if (type === 'clothing') this.controller.makeItemFactory = makeItemClothing
    this.setState({ type })
  }

  onSubmit = () => {
    let itemProps = {
      id: uuidv4(),
      imageUri: this.state.itemImageSrc,
      cost: this.state.cost || undefined,
      type: this.state.type,
      brand: this.state.brand,
      label: this.state.label
    }
    const itemDetails = this.itemDetailOptions.getDetailsByDetailType(this.state.type)
    if (itemDetails) itemProps = Object.assign(itemProps, itemDetails)
    console.log(itemProps)
    this.controller.addItem(itemProps)

    // history.goBack()
  }

  renderAddItemDetail = () => {
    const { type } = this.state
    return this.itemDetailOptions.getElementByName(type)
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

      <form className='itemFieldsSection' noValidate autoComplete='off'>
        <TextField value={this.state.cost} onChange={this.onCostChange} id='costField' className='formInput' label='Cost' type='number' variant='outlined' autoFocus fullWidth />
        
        <TextField value={this.state.type} onChange={this.onTypeChange} id='typeField' className='formInput' label='Type' variant='outlined' select fullWidth defaultValue='NA'>
          <MenuItem value='NA'><em>None</em></MenuItem>
          <MenuItem value='clothing'>Clothing</MenuItem>
        </TextField>

        <TextField value={this.state.brand} onChange={this.onBrandChange} id='brandField' className='formInput' label='Brand' variant='outlined' fullWidth />
        
        <TextField value={this.state.label} onChange={this.onLabelChange} id='labelField' className='formInput' label='Reference Label' variant='outlined' fullWidth />
      
        { this.renderAddItemDetail() }
      </form>

      <AppBar position='fixed' className='footer'>
        <Toolbar>
          <Button className='footerButton'><CancelIcon htmlColor='white' fontSize='large' /></Button>

          <Button onClick={this.onSubmit} className='footerButton'>
            <AddIcon htmlColor='white' fontSize='large' />
          </Button>

          <Button className='footerButton'><InfoIcon htmlColor='white' fontSize='large' /></Button>
        </Toolbar>
      </AppBar>
    </div>
  }
}

export default AddItemToShoppingSession
