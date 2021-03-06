import * as React from 'react'
import history from '../history'
import { v4 as uuidv4 } from 'uuid'
import makeItem from '../../../../Factories/Item/makeItem'
import makeItemClothing from '../../../../Factories/Item/makeItemClothing'
import AddItemToShoppingSessionController from '../../Controllers/AddItemToShoppingSessionController'
import makeInMemoryItemRepository from '../../../../Factories/makeInMemoryItemRepository'
import AddItemDetailOptions from './AddItemDetail/AddItemDetailOptions'
import IItem from '../../../../Interfaces/Entities/Item/IItem'
import InMemoryItemRepository from '../../../../Repositories/ItemRepository/InMemoryItemRepository'
import IItemRepository from '../../../../Interfaces/Repositories/IItemRepository'

import { AppBar, Box, Button, Chip, IconButton, MenuItem, TextField, Toolbar } from '@material-ui/core'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import './styles.css'

interface AddItemProps { }

interface AddItemState {
  cost: number | '',
  type: string,
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
  private itemRepository: IItemRepository
  private itemId: string
  private item: IItem | undefined

  constructor (props: AddItemProps) {
    super(props)

    this.controller = new AddItemToShoppingSessionController({ makeItemRepository: makeInMemoryItemRepository, makeItem: makeItem })
    this.itemDetailOptions = new AddItemDetailOptions({/* empty props */})
    this.itemRepository = new InMemoryItemRepository()
    this.item = this.itemRepository.findById(this.getItemIdFromUrl())

    if (this.item) this.itemId = this.item.id
    else this.itemId = uuidv4()

    this.state = {
      itemImageSrc: this.item?.imageUri || 'https://designshack.net/wp-content/uploads/placeholder-image.png',
      cost: this.item?.cost || '',
      type: this.item?.type || 'NA',
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
    const type = e.target.value
    if (type === 'clothing') this.controller.makeItemFactory = makeItemClothing
    this.setState({ type })
  }

  onSubmit = () => {
    let itemProps = {
      id: this.itemId,
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
          <PhotoCameraIcon />
          <input ref={this.fileInput} onChange={this.onAddImage} id='uploadImage' type='file' hidden accept='image/*' />
        </IconButton>
      </Box>

      <form className='itemFieldsSection' noValidate autoComplete='off'>
        <TextField value={this.state.cost} onChange={this.onCostChange} id='costField' className='formInput' label='Cost' type='number' variant='outlined' autoFocus fullWidth />
        
        <TextField value={this.state.label} onChange={this.onLabelChange} id='labelField' className='formInput' label='Reference Label' variant='outlined' fullWidth />
        
        <TextField value={this.state.brand} onChange={this.onBrandChange} id='brandField' className='formInput' label='Brand' variant='outlined' fullWidth />
        
        <TextField value={this.state.type} onChange={this.onTypeChange} id='typeField' className='formInput' label='Type' variant='outlined' select fullWidth defaultValue='NA'>
          <MenuItem value='NA'><em>None</em></MenuItem>
          <MenuItem value='clothing'>Clothing</MenuItem>
        </TextField>
      
        { this.renderAddItemDetail() }

        <TextField value={this.state.tagFieldValue} onChange={this.onTagFieldChange} onKeyPress={this.onTagFieldEnter} id='descriptiveTagField' className='formInput' label='Add Tag' variant='outlined' fullWidth  />

        { this.renderDescriptiveTags() }
      </form>

      <AppBar position='fixed' className='footer'>
        <Toolbar>
          <Button onClick={this.onCancel} className='footerButton'><CancelIcon htmlColor='white' fontSize='large' /></Button>

          <Button onClick={this.onSubmit} className='footerButton'>
            <AddIcon htmlColor='white' fontSize='large' />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  }
}

export default EditItemInShoppingSession
