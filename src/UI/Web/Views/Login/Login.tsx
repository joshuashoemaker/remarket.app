import * as React from 'react'
import LoginController from '../../Controllers/LoginController'
import { Button, TextField, Typography } from '@material-ui/core'
import Cookies from 'universal-cookie'
import './styles.css'
import history from '../history'

const cookie = new Cookies()

interface LoginState {
  username: string,
  password: string
}

class Login extends React.Component<{}, LoginState> {
  private controller: LoginController

  constructor (props = {}) {
    super(props)
    this.controller = new LoginController()

    this.state = {
      username: '',
      password: ''
    }
  }

  onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value })
  }

  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value })
  }

  onSubmit = async () => {
    const { username, password } = this.state
    const loginResponse = await this.controller.onSubmit(username, password)
    console.log(loginResponse)

    if (loginResponse.status !== 200) return

    const token = loginResponse.data?.data?.token
    console.log(token)
    cookie.set('token', token)
    history.push('/')
  }

  render () {
    return <div className='Login'>
      <form noValidate>
        <Typography component='h1' variant='h6'>Login to reMarket</Typography>
        <TextField onChange={this.onUsernameChange} required label='Username' className='loginInput' fullWidth variant="filled" />
        <TextField onChange={this.onPasswordChange} required label='Password' type='password' className='loginInput' fullWidth variant="filled" />
        <Button onClick={this.onSubmit} variant="contained" color="primary" fullWidth>Login</Button>
      </form>
    </div>
  }
}

export default Login
