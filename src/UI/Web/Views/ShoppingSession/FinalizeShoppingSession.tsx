import * as React from 'react'
import history from '../history'
import InMemoryItemRepository from '../../../../Repositories/ItemRepository/InMemoryItemRepository'
import IItemRepository from '../../../../Interfaces/Repositories/IItemRepository'
import ShoppingSession from '../../../../Entities/ShoppingSession/ShoppingSession'
import { AppBar, Avatar, Backdrop, Button, CircularProgress, ListItemAvatar, ListItemSecondaryAction, Switch, Toolbar, Zoom, List, ListItem, ListItemText } from '@material-ui/core'
import { ShoppingCart, Cancel } from '@material-ui/icons'
import './styles.css'

interface FinalizeShoppingSessionProps { }

interface FinalizeShoppingSessionState {
  checkedItems: string[],
  isFinalizing: boolean
}

class FinalizeShoppingSessionItems extends React.Component<FinalizeShoppingSessionProps, FinalizeShoppingSessionState> {
  private itemRepository: IItemRepository

  constructor (props = {}) {
    super(props)

    this.itemRepository = new InMemoryItemRepository()
    this.state = {
      checkedItems: this.itemRepository.items.map(i => i.id),
      isFinalizing: false
    }
  }

  onCancel = () => {
    history.goBack()
  }

  onSubmit = async () => {
    this.setState({ isFinalizing: true })
    const itemsToKeep = this.itemRepository.items.filter(i => {
      return this.state.checkedItems.includes(i.id)
    })

    const shoppingSession = new ShoppingSession({ items: itemsToKeep })
    shoppingSession.finalize()
    await new Promise(resolve => setTimeout(resolve, 600));  
    this.setState({ isFinalizing: false })
    history.push('/')
  }

  toggleItem = (id: string) => {
    let checkedItems = [...this.state.checkedItems]
    if (checkedItems.includes(id)) {
      const index = checkedItems.findIndex(i => i === id)
      checkedItems.splice(index, 1)
    } else {
      checkedItems.push(id)
    }

    this.setState({ checkedItems })
  }

  renderItemLineItems = () => {
    return this.itemRepository.items.map(i => {
      return <Zoom in key={i.id}>
        <div style={{transitionDelay: '1000ms'}}>
        <ListItem>
          <ListItemAvatar>
            <Avatar variant='rounded' alt={i.label} src={i.imageUri} />
          </ListItemAvatar>
          <ListItemText primary={i.label} secondary={`$${i.cost}`} />
          <ListItemSecondaryAction>
            <Switch edge='end'
              onChange={() => {this.toggleItem(i.id)}}
              checked={this.state.checkedItems.includes(i.id)}
              color='primary'
            />
          </ListItemSecondaryAction>
        </ListItem>
        </div>
      </Zoom>
    })
  }

  render() {
    return <div className='FinalizeShoppingSessionItems'>

      <List>
        { this.renderItemLineItems() }
      </List>

      <AppBar position='fixed' className='footer'>
        <Toolbar>
          <Button onClick={this.onCancel} className='footerButton'>
            <Cancel htmlColor='#ff6868' fontSize='large' />
          </Button>

          <Button onClick={this.onSubmit} className='footerButton'>
            <ShoppingCart htmlColor='#03DAC5' fontSize='large' />
          </Button>
        </Toolbar>
      </AppBar>

      
      <Backdrop style={{zIndex: 999999999}} open={this.state.isFinalizing}>
        <CircularProgress color='primary' />
      </Backdrop>
    </div>
  }
}

export default FinalizeShoppingSessionItems
