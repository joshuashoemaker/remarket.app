import ShoppingSession from '../../../Entities/ShoppingSession/ShoppingSession'
import axios from 'axios'

class FinalizeShoppingSessionController {
  public shoppingSession = new ShoppingSession()

  submit = async (itemIdsTtFinalize?: string[]): Promise<Response> => {
    const shoppingSessionRequest = this.shoppingSession.finalize(itemIdsTtFinalize)
    let shoppingSessionResponse = {}
    try {
      shoppingSessionResponse: Response = await axios.post(
        'http://localhost:5005/api/shoppingSession',
        shoppingSessionRequest, {
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (err) {
      console.log(err)
    }
    return shoppingSessionResponse as Response
  }
}

export default FinalizeShoppingSessionController
