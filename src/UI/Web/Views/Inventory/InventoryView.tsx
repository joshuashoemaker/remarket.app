import * as React from 'react'
import history from '../history'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import './styles.css'
import { Zoom, ListItemAvatar, Avatar, ListItemSecondaryAction, AppBar, Backdrop, Button, CircularProgress, Snackbar, Toolbar, Dialog, DialogTitle, DialogContent, TextField } from '@material-ui/core'
import InventoryController from '../../Controllers/InventoryController'
import IItem from '../../../../Interfaces/Entities/IItem'
import { ClearAll, Search } from '@material-ui/icons'
import InventoryQueryBuilder from './InventoryQueryBuilder'

interface InventoryViewProps { }

interface InventoryViewState {
  items: IItem[] | null,
  isLoading: boolean,
  showSuccessMessage: boolean,
  showErrorMessage: boolean,
  showQueryBuilder: boolean
}

class InventoryView extends React.Component<InventoryViewProps, InventoryViewState> {
  private controller = new InventoryController()

  constructor(props: InventoryViewProps = {}) {
    super(props)
    this.state = {
      isLoading: true,
      showSuccessMessage: false,
      showErrorMessage: false,
      showQueryBuilder: false,
      items: null,
    }
    this.getItems()
  }

  getItems = async () => {
    const items = await this.controller.getItems()
    this.setState({ items, isLoading: false })

    if (items && items.length < 1) this.setState({ showErrorMessage: true })
    await new Promise(resolve => setTimeout(resolve, 1500))
    this.setState({ showErrorMessage: false })
  }

  toggleItemIsProcessedCheckedById = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    history.push(`/inventory/edit/${id}`)
  }

  toggleItemIsSoldCheckedById = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    history.push(`/inventory/sell/${id}`)
  }

  toggleQueryBuilder = () => {
    this.setState({ showQueryBuilder: !this.state.showQueryBuilder })
  }

  onClearQuery = () => {
    this.onQuery({})
  }

  onQuery = async (query: any) => {
    this.setState({ isLoading: true, showQueryBuilder: false })

    const items = await this.controller.getItemsByQuery(query)
    this.setState({ items, isLoading: false })

    if (items && items.length < 1) this.setState({ showErrorMessage: true })
    await new Promise(resolve => setTimeout(resolve, 1500))
    this.setState({ showErrorMessage: false })
  }

  renderSwitch = (item: IItem) => {
    if (!item.isProcessed) return <Button variant='contained' color='primary' onClick={() => { this.toggleItemIsProcessedCheckedById(item.id) }}>Process</Button>
    else if (item.isProcessed && !item.isSold) return <Button variant='contained' color='secondary' onClick={() => { this.toggleItemIsSoldCheckedById(item.id) }}>Sell</Button>
    else return <Button disabled>Sold</Button>
  }

  renderItems = () => {
    if (!this.state.items) return

    const items = this.state.items
    return items.map(i => <Zoom in key={i.id}>
      <div style={{ transitionDelay: '1000ms' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar variant='rounded' alt={i.label} src={i.imageUri} />
          </ListItemAvatar>
          <ListItemText primary={i.label} secondary={`$${i.cost}`} />
          <ListItemSecondaryAction>
            { this.renderSwitch(i) }
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    </Zoom>
    )
  }

  renderQueryBuilder = () => {
    return <Dialog open={this.state.showQueryBuilder} onClose={this.toggleQueryBuilder} color='primary'>
      <DialogTitle>Query Inventory</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin='dense' label='Brand' />
      </DialogContent>
    </Dialog>
  }

  render() {
    return <div className='Inventory'>
      <List component="nav">
        {this.renderItems()}
      </List>

      <InventoryQueryBuilder onQuery={this.onQuery} showQueryBuilder={this.state.showQueryBuilder} toggleQueryBuilder={this.toggleQueryBuilder} />

      <AppBar position='fixed' className='footer'>
        <Toolbar>
          <Button onClick={this.onClearQuery} className='footerButton'>
            <ClearAll htmlColor='#ff6868' fontSize='large' />
          </Button>
          <Button onClick={this.toggleQueryBuilder} className='footerButton'>
            <Search htmlColor='#03DAC5' fontSize='large' />
          </Button>
        </Toolbar>
      </AppBar>

      <Backdrop style={{ zIndex: 100 }} open={this.state.isLoading}>
        <CircularProgress color='primary' />
      </Backdrop>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={this.state.showSuccessMessage} message='Success' />
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={this.state.showErrorMessage} message=' No Items Found' />
    </div>
  }
}

export default InventoryView
