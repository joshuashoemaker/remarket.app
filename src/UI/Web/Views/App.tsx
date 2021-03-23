import * as React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import Home from './Home/Home'
import InventoryView from './Inventory/InventoryView'
import EditItemInShoppingSession from './ShoppingSession/EditItemInShoppingSession'
import FinalizeShoppingSession from './ShoppingSession/FinalizeShoppingSession'
import ShoppingSessionView from './ShoppingSession/ShoppingSessionView'
import EditInventoryItem from './Inventory/EditInventoryItem'
import SellInventoryItem from './Inventory/SellInventoryItem'
import Login from './Login/Login'
import axios, { AxiosResponse } from 'axios'
import User from '../../../Entities/User/User'
import history from './history'

class App extends React.Component {
  constructor (props = {}) {
    super(props)
    
    this.redirectNonauthenticatedUser()
  }

  redirectNonauthenticatedUser = async () => {
    let isUserAuthenticatedRequest: AxiosResponse<any>
    try {
      isUserAuthenticatedRequest = await axios.get('/api/protected/verifyAuthentication', {
        headers: {
          Authorization: `Bearer ${User.token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })

      if (isUserAuthenticatedRequest.status !== 200) history.push('/login')
    } catch (err) {
      history.push('/login')
    }
  }

  render () {
    return <main className='App'>
      <Header />
      <Route exact path='/login' component={() => <Login />} />
      <Route exact path='/' component={() => <Home />} />
      <Route exact path='/shoppingsession' component={() => <ShoppingSessionView />} />
      <Route exact path='/shoppingsession/add' component={() => <EditItemInShoppingSession />} />
      <Route exact path='/shoppingsession/edit/:id' component={() => <EditItemInShoppingSession />} />
      <Route exact path='/shoppingsession/finalize' component={() => <FinalizeShoppingSession />} />
      <Route exact path='/inventory' component={() => <InventoryView />} />
      <Route exact path='/inventory/edit/:id' component={() => <EditInventoryItem />} />
      <Route exact path='/inventory/sell/:id' component={() => <SellInventoryItem />} />
    </main>
  }
}

export default App
