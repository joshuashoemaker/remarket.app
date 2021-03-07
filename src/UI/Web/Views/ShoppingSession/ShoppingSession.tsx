import * as React from 'react'
import history from '../history'
import IItemRepository from '../../../../Interfaces/Repositories/IItemRepository'
import InMemoryItemRepository from '../../../../Repositories/ItemRepository/InMemoryItemRepository'

import ShoppingSessionPlaceholder from './ShoppingSessionPlaceholder'
import ShoppingSessionItem from './ShoppingSessionItem'
import { AppBar, Button, IconButton, Toolbar, Zoom } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import './styles.css'
import { CheckCircle } from '@material-ui/icons'

class ShoppingSession extends React.Component {
  private itemRepository: IItemRepository

  constructor (props: {}) {
    super(props)
    this.itemRepository = new InMemoryItemRepository()
    console.log(this.itemRepository.items)
  }

  onAddItemClick = () => {
    history.push('/shoppingSession/add')
  }

  onSubmitClick = () => {
    history.push('/shoppingSession/finalize')
  }

  renderItems = () => {
    if (this.itemRepository.items.length <= 0) return <Zoom in>
        <div style={{transitionDelay: '1000ms'}}>
          <ShoppingSessionPlaceholder />
        </div>
      </Zoom>

    return this.itemRepository.items.map((item, index) => {
      return <Zoom in key={item.id}>
        <div style={{transitionDelay:  `${index * 10000}ms`}}>
          <ShoppingSessionItem item={item} />
        </div>
      </Zoom>
    })
  }

  render() {
    return <div className='ShoppingSession'>
      <IconButton onClick={this.onAddItemClick} className='addItemIcon'>
        <AddIcon fontSize="default" htmlColor='white' />
      </IconButton>
      { this.renderItems() }

      <AppBar position='fixed' className='footer'>
        <Toolbar>
          <Button onClick={this.onSubmitClick} className='footerButton'>
            <CheckCircle htmlColor='#03DAC5' fontSize='large' />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  }
}

export default ShoppingSession
