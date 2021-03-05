import * as React from 'react'
import history from '../history'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import './styles.css'

class Header extends React.Component {
  render() {
    return <div className='Header'>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className='headerMenuIcon' color="inherit" aria-label="menu" onClick={() => { history.goBack() }} >
            <ArrowBackIosIcon />
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
