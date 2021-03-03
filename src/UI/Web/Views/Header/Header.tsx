import * as React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

class Header extends React.Component {
  render() {
    return <div className='Header'>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className='headerMenuIcon' color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className='headerTitle'>
            remarket.app
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  }
}

export default Header
