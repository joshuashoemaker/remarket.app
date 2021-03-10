import * as React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import Home from './Home/Home'
import InventoryView from './Inventory/InventoryView'
import EditItemInShoppingSession from './ShoppingSession/EditItemInShoppingSession'
import FinalizeShoppingSession from './ShoppingSession/FinalizeShoppingSession'
import ShoppingSessionView from './ShoppingSession/ShoppingSessionView'

class App extends React.Component {
  render () {
    return <main className='App'>
      <Header />
      <Route exact path='/' component={() => <Home />} />
      <Route exact path='/shoppingsession' component={() => <ShoppingSessionView />} />
      <Route exact path='/shoppingsession/add' component={() => <EditItemInShoppingSession />} />
      <Route exact path='/shoppingsession/edit/:id' component={() => <EditItemInShoppingSession />} />
      <Route exact path='/shoppingsession/finalize' component={() => <FinalizeShoppingSession />} />
      <Route exact path='/inventory' component={() => <InventoryView />} />
    </main>
  }
}

export default App
