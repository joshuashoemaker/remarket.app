import * as React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import Home from './Home/Home'
import AddItemToShoppingSession from './ShoppingSession/AddItemToShoppingSession'
import EditItemInShoppingSession from './ShoppingSession/EditItemInShoppingSession'
import ShoppingSession from './ShoppingSession/ShoppingSession'

class App extends React.Component {
  render () {
    return <main className='App'>
      <Header />
      <Route exact path='/' component={() => <Home />} />
      <Route exact path='/shoppingsession' component={() => <ShoppingSession />} />
      <Route exact path='/shoppingsession/add' component={() => <AddItemToShoppingSession />} />
      <Route exact path='/shoppingsession/edit/:id' component={() => <EditItemInShoppingSession />} />
    </main>
  }
}

export default App
