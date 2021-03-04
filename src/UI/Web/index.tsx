import * as React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import App from './Views/App'
import history from './Views/history'

const rootElement = document.getElementById('root')
render(<Router history={history}><App /></Router>, rootElement)