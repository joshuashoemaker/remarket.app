import * as React from 'react'
import history from '../history'
import IItemRepository from '../../../../Interfaces/Repositories/IItemRepository'
import InMemoryItemRepository from '../../../../Repositories/ItemRepository/InMemoryItemRepository'


import ShoppingSessionItem from './ShoppingSessionItem'
import { IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import './styles.css'

class ShoppingSession extends React.Component {
  private itemRepository: IItemRepository

  constructor (props: any) {
    super(props)
    this.itemRepository = new InMemoryItemRepository()
    console.log(this.itemRepository.items)
  }

  onAddItemClick = () => {
    history.push('/shoppingSession/add')
  }

  renderItems = () => {
    return this.itemRepository.items.map(i => {
      return <ShoppingSessionItem item={i} key={i.id} />
    })
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
