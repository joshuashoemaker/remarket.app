import * as React from 'react'
import history from '../history'
import ShoppingSession from '../../../../Entities/ShoppingSession/ShoppingSession'

import ShoppingSessionPlaceholder from './ShoppingSessionPlaceholder'
import ShoppingSessionItem from './ShoppingSessionItem'
import { AppBar, Button, IconButton, Toolbar, Zoom } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { CheckCircle } from '@material-ui/icons'
import './styles.css'

class ShoppingSessionView extends React.Component {
  private model: ShoppingSession

  constructor (props: {}) {
    super(props)
    this.model = new ShoppingSession()
  }

  onAddItemClick = () => {
    history.push('/shoppingSession/add')
  }

  onSubmitClick = () => {
    history.push('/shoppingSession/finalize')
  }

  renderItems = () => {
    if (this.model.items.length <= 0) return <Zoom in>
        <div style={{transitionDelay: '1000ms'}}>
          <ShoppingSessionPlaceholder />
        </div>
      </Zoom>

    return this.model.items.map((item, index) => {
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

export default ShoppingSessionView
