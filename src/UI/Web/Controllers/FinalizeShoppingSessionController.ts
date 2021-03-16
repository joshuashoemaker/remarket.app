import ShoppingSession from '../../../Entities/ShoppingSession/ShoppingSession'
import User from '../../../Entities/User/User'
import axios from 'axios'

class FinalizeShoppingSessionController {
  public shoppingSession = new ShoppingSession()

  submit = async (itemIdsTtFinalize?: string[]): Promise<any> => {
    const shoppingSessionRequest = this.shoppingSession.finalize(itemIdsTtFinalize)
    let shoppingSessionResponse = {}
    try {
      shoppingSessionResponse = await axios.post(
        '/api/protected/shoppingSession',
        shoppingSessionRequest, {
          headers: {
            Authorization: `Bearer ${User.token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
    } catch (err) {
      console.log(err)
    }
    return shoppingSessionResponse
  }

  destroyShoppingSession = () => {
    this.shoppingSession.destructor()
  }
}

export default FinalizeShoppingSessionController
