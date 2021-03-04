import * as React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import Home from './Home/Home'

class App extends React.Component {
  render () {
    console.log('yo')
    return <main className='App'>
      <Header />
      <Route exact path='/' component={() => <Home />} />
    </main>
  }
}

export default App
