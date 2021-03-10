import * as React from 'react'
import history from '../history'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import './styles.css'
import { Zoom, ListItemAvatar, Avatar, ListItemSecondaryAction, Switch, Typography, FormControlLabel } from '@material-ui/core'
import InventoryController from '../../Controllers/InventoryController'
import IItem from '../../../../Interfaces/Entities/IItem'

interface InventoryViewProps { }

interface InventoryViewState {
  items: IItem[] | null,
  processedItemIds: string[]
  soldItemIds: string[]
}

class InventoryView extends React.Component<InventoryViewProps, InventoryViewState> {
  private controller = new InventoryController()

  constructor(props: InventoryViewProps = {}) {
    super(props)
    this.state = { items: null, processedItemIds: [], soldItemIds: [] }
    this.getItems()
  }

  getItems = async () => {
    const items = await this.controller.getItems()
    const processedItemIds = items?.filter(i => i.isProcessed).map(i => i.id) || []
    const soldItemIds = items?.filter(i => i.isSold).map(i => i.id) || []
    this.setState({ items, processedItemIds, soldItemIds })
  }

  isItemProcessed = (id: string): boolean => {
    return this.state.processedItemIds?.includes(id) || false
  }

  isItemSold = (id: string): boolean => {
    return this.state.soldItemIds?.includes(id) || false
  }

  toggleItemIsProcessedCheckedById = async (id: string) => {
    let processedItemIds = [...this.state.processedItemIds]
    if (processedItemIds.includes(id)) {
      const index = processedItemIds.findIndex(i => i === id)
      processedItemIds.splice(index, 1)
    } else {
      processedItemIds.push(id)
    }

    this.setState({ processedItemIds })
    await new Promise(resolve => setTimeout(resolve, 200))
    history.push(`/inventory/edit/${id}`)
  }

  toggleItemIsSoldCheckedById = async (id: string) => {
    let soldItemIds = [...this.state.soldItemIds]
    if (soldItemIds.includes(id)) {
      const index = soldItemIds.findIndex(i => i === id)
      soldItemIds.splice(index, 1)
    } else {
      soldItemIds.push(id)
    }

    this.setState({ soldItemIds })
    await new Promise(resolve => setTimeout(resolve, 200))
    history.push(`/inventory/sell/${id}`)
  }

  renderSwitch = (item: IItem) => {
    if (!item.isProcessed) return <FormControlLabel
      value="top"
      control={<Switch color="primary" edge='end' checked={this.isItemProcessed(item.id)} onChange={() => { this.toggleItemIsProcessedCheckedById(item.id) }} />}
      label="Proccessed"
      labelPlacement="top"
    />
    else return <FormControlLabel
      value="top"
      control={<Switch color="secondary" edge='end' checked={this.isItemSold(item.id)} disabled={item.isSold} onChange={() => { this.toggleItemIsSoldCheckedById(item.id) }} />}
      label="Sold"
      labelPlacement="top"
    />
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

  render() {
    return <div className='Inventory'>
      <List component="nav">
        {this.renderItems()}
      </List>
    </div>
  }
}

export default InventoryView
