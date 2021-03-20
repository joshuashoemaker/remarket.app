import * as React from 'react'
import history from '../history'
import InventoryController from '../../Controllers/InventoryController'
import EditItemDetailOptions from './EditItemTypeDetail/EditItemTypeDetailOptions'
import IItem from '../../../../Interfaces/Entities/IItem'

import { AppBar, Backdrop, Box, Button, Chip, CircularProgress, IconButton, MenuItem, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@material-ui/core'
import { Cancel, Check } from '@material-ui/icons'
import './styles.css'
import MarketPlatforms from '../../../../StaticDataStructures/MarketPlatforms'
import ItemTypes from '../../../../StaticDataStructures/ItemTypes'

interface SellInventoryItemProps { }

interface SellInventoryItemState {
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
  showErrorMessage: boolean,
  sellPrice: number | ''
}

class SellInventoryItem extends React.Component<SellInventoryItemProps, SellInventoryItemState> {
  private controller = new InventoryController()
  private itemDetailOptions = new EditItemDetailOptions({/*  Empty Props */ })
  private item?: IItem

  constructor(props: SellInventoryItemProps) {
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
      showErrorMessage: false,
      sellPrice: ''
    }

    this.getItem()
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

  onCancel = () => { history.goBack() }

  onListedPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ listedPrice: e.target.valueAsNumber || '' })
  }

  onMarketPlatformChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ marketPlatform: e.target.value as MarketPlatforms })
  }

  onSellPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ sellPrice: e.target.valueAsNumber || '' })
  }

  onSubmit = async () => {
    this.setState({ isFinalizing: true })

    let itemProps = {
      id: this.item!.id,
      imageUri: this.state.itemImageSrc,
      cost: this.state.cost || undefined,
      type: this.state.type === 'NA' ? undefined : this.state.type,
      brand: this.state.brand,
      label: this.state.label,
      descriptiveTags: this.state.descriptiveTags,
      listedPrice: this.state.listedPrice || undefined,
      marketPlatform: this.state.marketPlatform,
      isProcessed: true,
      isSold: true,
      sellPrice: this.state.sellPrice || undefined
    }
    const itemDetails = this.itemDetailOptions.getDetailsByDetailType(this.state.type)
    if (itemDetails) itemProps = Object.assign(itemProps, itemDetails)

    const response = await this.controller.editItem(itemProps)
    if (response) this.setState({ showSuccessMessage: true })
    else this.setState({ showErrorMessage: true })

    await new Promise(resolve => setTimeout(resolve, 1500))
    this.setState({ isFinalizing: false })
    history.goBack()
  }

  render() {
    return <div className='EditInventoryItem'>
      <div className='EditInventoryItemSection'>
        <Box m={1} className='itemImageSection'>
          <img alt='item preview' src={this.state.itemImageSrc} />
        </Box>

        <form className='itemFieldsSection' noValidate autoComplete='off'>
          <TextField value={this.state.listedPrice} onChange={this.onListedPriceChange} id='brandField' className='formInput' type='number' label='Listed Price' variant='outlined' fullWidth disabled />

          <TextField value={this.state.marketPlatform} onChange={this.onMarketPlatformChange} id='typeField' className='formInput' label='Market Platform' variant='outlined' select fullWidth defaultValue={MarketPlatforms.none} disabled>
            <MenuItem value={MarketPlatforms.none}><em>None</em></MenuItem>
            <MenuItem value={MarketPlatforms.depop}>DEPOP</MenuItem>
            <MenuItem value={MarketPlatforms.etsy}>ETSY</MenuItem>
          </TextField>

          <TextField value={this.state.sellPrice} onChange={this.onSellPriceChange} id='brandField' className='formInput' type='number' label='Sold At' variant='outlined' fullWidth />
        </form>
      </div>

      <AppBar position='fixed' className='footer'>
        <Toolbar>
          <Button onClick={this.onCancel} className='footerButton'>
            <Cancel htmlColor='#ff6868' fontSize='large' />
          </Button>
          <Button onClick={this.onSubmit} className='footerButton'>
            <Check htmlColor='#03DAC5' fontSize='large' />
          </Button>
        </Toolbar>
      </AppBar>

      <Backdrop style={{ zIndex: 100 }} open={this.state.isFinalizing}>
        <CircularProgress color='primary' />
      </Backdrop>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={this.state.showSuccessMessage} message='Success' />
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={this.state.showErrorMessage} message='Issue Finalizing' />

    </div>
  }
}

export default SellInventoryItem
