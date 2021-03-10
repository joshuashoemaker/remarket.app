import * as React from 'react'
import history from '../history'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import './styles.css'
import { Zoom, ListItemAvatar, Avatar, ListItemSecondaryAction, Switch } from '@material-ui/core'
import InventoryController from '../../Controllers/InventoryController'
import IItem from '../../../../Interfaces/Entities/IItem'

interface InventoryViewProps { }

interface InventoryViewState {
  items: IItem[] | null,
  checkedItemIds: string[]
}

class InventoryView extends React.Component<InventoryViewProps, InventoryViewState> {
  private controller = new InventoryController()

  constructor (props: InventoryViewProps = {}) {
    super(props)
    this.state = { items: null, checkedItemIds: [] }
    this.getItems()
  }

  getItems = async () => {
    const items = await this.controller.getItems()
    const checkedItemIds = items?.filter(i => i.isProcessed).map(i => i.id) || []
    this.setState({ items, checkedItemIds })
  }

  isItemChecked = (id: string): boolean => {
    return this.state.checkedItemIds?.includes(id) || false
  }

  toggleItemCheckedById = (id: string) => {
    let checkedItemIds = [...this.state.checkedItemIds]
    if (checkedItemIds.includes(id)) {
      const index = checkedItemIds.findIndex(i => i === id)
      checkedItemIds.splice(index, 1)
    } else {
      checkedItemIds.push(id)
    }

    this.setState({ checkedItemIds })
  }

  renderItems = () => {
    if (!this.state.items) return

    const items = this.state.items
    return items.map(i => <Zoom in key={i.id}>
      <div style={{transitionDelay: '1000ms'}}>
      <ListItem>
        <ListItemAvatar>
          <Avatar variant='rounded' alt={i.label} src={i.imageUri} />
        </ListItemAvatar>
        <ListItemText primary={i.label} secondary={`$${i.cost}`} />
        <ListItemSecondaryAction>
          <Switch edge='end'
            onChange={() => { this.toggleItemCheckedById(i.id) }}
            checked={this.isItemChecked(i.id)}
            color='primary'
          />
        </ListItemSecondaryAction>
      </ListItem>
      </div>
    </Zoom>
    )
  }

  render() {
    return <div className='Inventory'>
      <List component="nav">
        { this.renderItems() }
      </List>
    </div>
  }
}

export default InventoryView
