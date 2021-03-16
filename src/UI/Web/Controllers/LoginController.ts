import axios from 'axios'
import base64 from 'base-64'

class LoginController {
  onSubmit = async (username: string, password: string): Promise<any | undefined> => {
    if (!username || !password) return

    const authHeaderString = `Basic ${base64.encode(`${username}:${password}`)}`

    const loginResponse = await axios.post('/api/login',
    {},
    { headers: {
      'Authorization': authHeaderString,
      'Content-Type': 'application/json'
    }})
    
    return loginResponse
  }
}

export default LoginController
