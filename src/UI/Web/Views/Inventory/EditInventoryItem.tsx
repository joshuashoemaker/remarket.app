import * as React from 'react'
import history from '../history'
import InventoryController from '../../Controllers/InventoryController'
import EditItemDetailOptions from './EditItemTypeDetail/EditItemTypeDetailOptions'
import IItem from '../../../../Interfaces/Entities/IItem'
import ItemTypes from '../../../../StaticDataStructures/ItemTypes'

import { Backdrop, Box, Chip, CircularProgress, IconButton, MenuItem, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@material-ui/core'
import EditInventoryItemStepper from './EditInventoryItemStepper'
import { PhotoCamera } from '@material-ui/icons'
import './styles.css'
import MarketPlatforms from '../../../../StaticDataStructures/MarketPlatforms'

interface EditInventoryItemProps { }

interface EditInventoryItemState {
  cost: number | '',
  type: ItemTypes,
  brand: string,
  label: string,
  tagFieldValue: string,
  descriptiveTags: string[],
  itemImageSrc: string,
  activeSectionNumber: number
  marketPlatform: MarketPlatforms,
  listedPrice: number | '',
  isFinalizing: boolean,
  showSuccessMessage: boolean,
  showErrorMessage: boolean
}

class EditInventoryItem extends React.Component<EditInventoryItemProps, EditInventoryItemState> {
  private fileInput: React.RefObject<HTMLInputElement>
  private controller = new InventoryController()
  private itemDetailOptions = new EditItemDetailOptions({/*  Empty Props */ })
  private item?: IItem
  private uploadedImage?: File

  constructor(props: EditInventoryItemProps) {
    super(props)

    this.state = {
      itemImageSrc: 'https://designshack.net/wp-content/uploads/placeholder-image.png',
      cost: '',
      type: ItemTypes.NA,
      brand: '',
      label: '',
      tagFieldValue: '',
      descriptiveTags: [],
      activeSectionNumber: 0,
      marketPlatform: MarketPlatforms.none,
      listedPrice: '',
      isFinalizing: false,
      showSuccessMessage: false,
      showErrorMessage: false
    }

    this.getItem()
    this.fileInput = React.createRef()
  }

  getItem = async () => {
    this.item = await this.controller.getItemById(this.getItemIdFromUrl()) || undefined
    this.setState({
      itemImageSrc: this.item?.imageUri || 'https://designshack.net/wp-content/uploads/placeholder-image.png',
      cost: this.item?.cost || '',
      type: this.item?.type as ItemTypes || ItemTypes.NA,
      brand: this.item?.brand || '',
      label: this.item?.label || '',
      marketPlatform: this.item?.marketPlatform || MarketPlatforms.none,
      listedPrice: this.item?.listedPrice || '',
      tagFieldValue: '',
      descriptiveTags: this.item?.descriptiveTags || []
    })
  }

  getItemIdFromUrl = (): string => {
    const path = window.location.pathname
    const pathArray = path.split('/')
    return pathArray[3]
  }

  getSubmitActionFromUrl = (): string => {
    const path = window.location.pathname
    const pathArray = path.split('/')
    return pathArray[2]
  }

  moveToSection = (section: number) => {
    if (section < 0) history.goBack()
    else if (section >= 3) this.onSubmit()
    else this.setState({ activeSectionNumber: section })
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

  onListedPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ listedPrice: e.target.valueAsNumber || '' })
  }

  onMarketPlatformChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ marketPlatform: e.target.value as MarketPlatforms })
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

  onSubmit = async () => {
    this.setState({ isFinalizing: true })

    let itemProps = {
      id: this.item!.id,
      image: this.uploadedImage,
      imageUri: this.state.itemImageSrc,
      cost: this.state.cost || undefined,
      type: this.state.type === ItemTypes.NA ? undefined : this.state.type,
      brand: this.state.brand,
      label: this.state.label,
      descriptiveTags: this.state.descriptiveTags,
      listedPrice: this.state.listedPrice || undefined,
      marketPlatform: this.state.marketPlatform,
      isProcessed: true
    }
    const itemDetails = this.itemDetailOptions.getDetailsByDetailType(this.state.type)
    if (itemDetails) itemProps = Object.assign(itemProps, itemDetails)

    const response = await this.controller.editItem(itemProps)
    if (response) this.setState({ showSuccessMessage: true })
    else this.setState({showErrorMessage: true})

    await new Promise(resolve => setTimeout(resolve, 1500))
    this.setState({ isFinalizing: false })
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
    return descriptiveTags.map(t => <Chip label={t} key={t} onDelete={() => this.removeTag(t)} />)
  }

  renderBasicInfo = () => {
    return <div className='EditInventoryItemSection'>
      <Box m={1} className='itemImageSection'>
        <img alt='item preview' src={this.state.itemImageSrc} />
        <IconButton component='label' className='addItemImageIcon'>
          <PhotoCamera htmlColor='white' />
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

        {this.renderAddItemDetail()}

        <TextField value={this.state.tagFieldValue} onChange={this.onTagFieldChange} onKeyPress={this.onTagFieldEnter} id='descriptiveTagField' className='formInput' label='Add Tag' variant='outlined' fullWidth />

        {this.renderDescriptiveTags()}
      </form>
    </div>
  }

  renderProcess = () => {
    return <div className='EditInventoryItemSection'>
      <form className='itemFieldsSection' noValidate autoComplete='off'>
        <TextField value={this.state.marketPlatform} onChange={this.onMarketPlatformChange} id='typeField' className='formInput' label='Market Platform' variant='outlined' select fullWidth defaultValue={MarketPlatforms.none}>
          <MenuItem value={MarketPlatforms.none}><em>None</em></MenuItem>
          <MenuItem value={MarketPlatforms.depop}>DEPOP</MenuItem>
          <MenuItem value={MarketPlatforms.etsy}>ETSY</MenuItem>
        </TextField>

        <TextField value={this.state.listedPrice} onChange={this.onListedPriceChange} id='brandField' className='formInput' type='number' label='Listed Price' variant='outlined' fullWidth />
      </form>
    </div>
  }

  renderReview = () => {
    return <div className='EditInventoryItemSection'>
      <TableContainer component={Paper} className='reviewInfo'>
        <Typography component='h4'>
          Review Your Changes
        </Typography>
        <Table className='reviewTable'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Property Name</TableCell>
              <TableCell align='right'>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='left'>Label</TableCell>
              <TableCell align='right'>{this.state.label}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left'>Cost</TableCell>
              <TableCell align='right'>{this.state.cost}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left'>Listed Price</TableCell>
              <TableCell align='right'>{this.state.listedPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left'>Brand</TableCell>
              <TableCell align='right'>{this.state.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left'>Market Platform</TableCell>
              <TableCell align='right'>{this.state.marketPlatform}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left'>Tags</TableCell>
              <TableCell align='right'>{this.state.descriptiveTags.map(t => `${t}, `)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  }

  renderSection = () => {
    const section = [
      this.renderBasicInfo,
      this.renderProcess,
      this.renderReview
    ]

    return section[this.state.activeSectionNumber]()
  }

  render() {
    return <div className='EditInventoryItem'>
      {this.renderSection()}
      <EditInventoryItemStepper moveToSection={this.moveToSection} />

      <Backdrop style={{zIndex: 100}} open={this.state.isFinalizing}>
        <CircularProgress color='primary' />
      </Backdrop>

      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={this.state.showSuccessMessage} message='Success'/>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={this.state.showErrorMessage} message='Issue Finalizing'/>
    
    </div>
  }
}

export default EditInventoryItem
