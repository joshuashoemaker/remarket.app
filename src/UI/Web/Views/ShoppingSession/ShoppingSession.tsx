import * as React from 'react'
import history from '../history'
import IItemRepository from '../../../../Interfaces/Repositories/IItemRepository'
import InMemoryItemRepository from '../../../../Repositories/ItemRepository/InMemoryItemRepository'

import ShoppingSessionPlaceholder from './ShoppingSessionPlaceholder'
import ShoppingSessionItem from './ShoppingSessionItem'
import { IconButton, Zoom } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import './styles.css'

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

  renderItems = () => {
    if (this.itemRepository.items.length <= 0) return <ShoppingSessionPlaceholder />

    return this.itemRepository.items.map((item, index) => {
      return <Zoom in key={item.id}>
        <div style={{transitionDelay:  `${index * 10000}ms`}}>
          <ShoppingSessionItem item={item} />
        </div>
      </Zoom>
    })
  }

  renderPlaceHolder = () => {

  }

  render() {
    return <div className='ShoppingSession'>
      <IconButton onClick={this.onAddItemClick} className='addItemIcon'>
        <AddIcon fontSize="default" />
      </IconButton>
      { this.renderItems() }
    </div>
  }
}

export default ShoppingSession
