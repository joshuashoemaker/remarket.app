import * as React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { ShoppingCart, Storefront } from '@material-ui/icons'

class Home extends React.Component {
  render() {
    return <div className='Home'>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary="Start Shopping Session" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Storefront />
          </ListItemIcon>
          <ListItemText primary="Manage Inventory" />
        </ListItem>
      </List>
    </div>
  }
}

export default Home
