import * as React from 'react'
import history from '../history'
import FinalizeShoppingSessionController from '../../Controllers/FinalizeShoppingSessionController'

import { AppBar, Avatar, Backdrop, Button, CircularProgress, ListItemAvatar, ListItemSecondaryAction, Switch, Toolbar, Zoom, List, ListItem, ListItemText, Snackbar } from '@material-ui/core'
import { ShoppingCart, Cancel } from '@material-ui/icons'
import './styles.css'

interface FinalizeShoppingSessionProps { }

interface FinalizeShoppingSessionState {
  checkedItems: string[],
  isFinalizing: boolean,
  showSuccessMessage: boolean,
  showErrorMessage: boolean
}

class FinalizeShoppingSession extends React.Component<FinalizeShoppingSessionProps, FinalizeShoppingSessionState> {
  private controller = new FinalizeShoppingSessionController()

  constructor (props = {}) {
    super(props)

    this.state = {
      checkedItems: this.controller.shoppingSession.items.map(i => i.id),
      isFinalizing: false,
      showSuccessMessage: false,
      showErrorMessage: false
    }
  }

  onCancel = () => {
    history.goBack()
  }

  onSubmit = async () => {
    this.setState({ isFinalizing: true })

    const response: Response = await this.controller.submit(this.state.checkedItems)
    if (response.status === 201) {
      this.setState({ showSuccessMessage: true })
    }
    this.setState({ isFinalizing: false })
    await new Promise(resolve => setTimeout(resolve, 1000))
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
    return this.controller.shoppingSession.items.map(i => {
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
    return <div className='FinalizeShoppingSession'>
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

      <Backdrop style={{zIndex: 100}} open={this.state.isFinalizing}>
        <CircularProgress color='primary' />
      </Backdrop>

      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={this.state.showSuccessMessage} message='Success'/>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={this.state.showErrorMessage} message='Issue Finalizing'/>
    </div>
  }
}

export default FinalizeShoppingSession
