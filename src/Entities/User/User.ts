import Cookies from 'universal-cookie'
const cookie = new Cookies()

class User {
  static get token () {
    return cookie.get('token')
  }
}

export default User