import * as React from 'react'
import './App.css'
import Header from './Header/Header'

class App extends React.Component {
  render () {
    console.log('yo')
    return <div className='App'>
      <Header />
    </div>
  }
}

export default App
