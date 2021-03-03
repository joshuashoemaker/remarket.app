import * as React from 'react'
import './App.css'
import Header from './Header/Header'
import Home from './Home/Home'

class App extends React.Component {
  render () {
    console.log('yo')
    return <div className='App'>
      <Header />
      <Home />
    </div>
  }
}

export default App
