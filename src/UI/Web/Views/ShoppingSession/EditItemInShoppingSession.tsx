import * as React from 'react'
import history from '../history'
import makeItem from '../../../../Factories/Item/makeItem'
import AddItemToShoppingSessionController from '../../Controllers/AddItemToShoppingSessionController'
import AddItemDetailOptions from './AddItemDetail/AddItemDetailOptions'
import IItem from '../../../../Interfaces/Entities/IItem'
import ItemTypes from '../../../../StaticDataStructures/ItemTypes'

import { AppBar, Box, Button, Chip, IconButton, MenuItem, TextField, Toolbar } from '@material-ui/core'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import './styles.css'

interface AddItemProps { }

interface AddItemState {
  cost: number | '',
  type: ItemTypes,
  brand: string,
  label: string,
  tagFieldValue: string,
  descriptiveTags: string[],
  itemImageSrc: string
}

class EditItemInShoppingSession extends React.Component<AddItemProps, AddItemState> {
  private fileInput: React.RefObject<HTMLInputElement>
  private controller: AddItemToShoppingSessionController
  private itemDetailOptions: AddItemDetailOptions
  private item: IItem | undefined
  private uploadedImage?: File

  constructor (props: AddItemProps) {
    super(props)

    const itemIdFromUrl: string | undefined = this.getItemIdFromUrl()

    this.controller = new AddItemToShoppingSessionController({ itemId: itemIdFromUrl })
    this.itemDetailOptions = new AddItemDetailOptions({/* empty props */})
    this.item = this.controller.currentItem

    this.state = {
      itemImageSrc: this.item?.imageUri || 'https://designshack.net/wp-content/uploads/placeholder-image.png',
      cost: this.item?.cost || '',
      type: this.item?.type as ItemTypes || ItemTypes.NA,
      brand: this.item?.brand || '',
      label: this.item?.label || '',
      tagFieldValue: '',
      descriptiveTags: this.item?.descriptiveTags || []
    }
    this.fileInput = React.createRef()
  }

  getItemIdFromUrl = (): string => {
    const path = window.location.pathname
    const pathArray = path.split('/')
    return  pathArray[3]
  }

  getSubmitActionFromUrl = (): string => {
    const path = window.location.pathname
    const pathArray = path.split('/')
    return  pathArray[2]
  }
  
  onAddImage = () => {
    if (!this?.fileInput?.current?.files?.[0]) return

    const file = this.fileInput.current.files[0]
    this.uploadedImage = file
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e!.target!.result as string
      this.setState({ itemImageSrc: src })
    }
    reader.readAsDataURL(file)
  }

  onCancel = () => { history.goBack() }

  onBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ brand: e.target.value })
  }

  onCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ cost: e.target.valueAsNumber || '' })
  }

  onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ label: e.target.value })
  }

  onTagFieldEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    const tag = this.state.tagFieldValue
    this.setState({ tagFieldValue: '' })
    
    if (this.state.descriptiveTags.includes(tag)) return
    else this.setState({ descriptiveTags: [...this.state.descriptiveTags, tag] })
  }

  onTagFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagFieldValue = e.target.value
    this.setState({ tagFieldValue })
  }

  onTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value as ItemTypes
    this.setState({ type })
  }

  onSubmit = () => {
    let itemProps = {
      id: this.controller.itemId,
      image: this.uploadedImage,
      imageUri: this.state.itemImageSrc,
      cost: this.state.cost || undefined,
      type: this.state.type === 'NA' ? undefined : this.state.type,
      brand: this.state.brand,
      label: this.state.label,
      descriptiveTags: this.state.descriptiveTags
    }
    const itemDetails = this.itemDetailOptions.getDetailsByDetailType(this.state.type)
    if (itemDetails) itemProps = Object.assign(itemProps, itemDetails)
    
    const controllerAction = this.getSubmitActionFromUrl()
    
    if (controllerAction === 'edit') this.controller.editItem(itemProps)
    if (controllerAction === 'add') this.controller.addItem(itemProps)

    history.goBack()
  }

  removeTag = (tag: string) => {
    let descriptiveTags = [...this.state.descriptiveTags]
    const tagIndex = descriptiveTags.findIndex(t => t === tag)
    descriptiveTags.splice(tagIndex, 1)
    this.setState({ descriptiveTags: descriptiveTags })
  }

  renderAddItemDetail = () => {
    const { type } = this.state
    return this.itemDetailOptions.getElementByName(type, this.item)
  }

  renderDescriptiveTags = () => {
    const { descriptiveTags } = this.state
    return descriptiveTags.map(t => <Chip label={t} key={t} onDelete={ () => this.removeTag(t) } />)
  }

  render() {
    return <div className='AddItemToShoppingSession'>
      <Box m={1} className='itemImageSection'>
        <img alt='item preview' src={this.state.itemImageSrc} />
        <IconButton component='label' className='addItemImageIcon'>
          <PhotoCameraIcon htmlColor='white' />
          <input ref={this.fileInput} onChange={this.onAddImage} id='uploadImage' type='file' hidden accept='image/*' />
        </IconButton>
      </Box>

      <form className='itemFieldsSection' noValidate autoComplete='off'>
        <TextField value={this.state.cost} onChange={this.onCostChange} id='costField' className='formInput' label='Cost' type='number' variant='outlined' autoFocus fullWidth />
        
        <TextField value={this.state.label} onChange={this.onLabelChange} id='labelField' className='formInput' label='Reference Label' variant='outlined' fullWidth />
        
        <TextField value={this.state.brand} onChange={this.onBrandChange} id='brandField' className='formInput' label='Brand' variant='outlined' fullWidth />
        
        <TextField value={this.state.type} onChange={this.onTypeChange} id='typeField' className='formInput' label='Type' variant='outlined' select fullWidth defaultValue={ItemTypes.NA}>
          <MenuItem value={ItemTypes.NA}><em>None</em></MenuItem>
          <MenuItem value={ItemTypes.Clothing}>Clothing</MenuItem>
          <MenuItem value={ItemTypes.Other}>Other</MenuItem>
        </TextField>
      
        { this.renderAddItemDetail() }

        <TextField value={this.state.tagFieldValue} onChange={this.onTagFieldChange} onKeyPress={this.onTagFieldEnter} id='descriptiveTagField' className='formInput' label='Add Tag' variant='outlined' fullWidth  />

        { this.renderDescriptiveTags() }
      </form>

      <AppBar position='fixed' className='footer'>
        <Toolbar>
          <Button onClick={this.onCancel} className='footerButton'>
            <CancelIcon htmlColor='#ff6868' fontSize='large' />
          </Button>

          <Button onClick={this.onSubmit} className='footerButton'>
            <AddIcon htmlColor='#03DAC5' fontSize='large' />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  }
}

export default EditItemInShoppingSession
