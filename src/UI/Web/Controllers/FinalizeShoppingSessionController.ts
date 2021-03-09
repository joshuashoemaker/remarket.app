import ShoppingSession from '../../../Entities/ShoppingSession/ShoppingSession'
import IItem from '../../../Interfaces/Entities/IItem'
import axios from 'axios'

class FinalizeShoppingSessionController {

  submit = async (items: IItem[]) => {
    const shoppingSession = new ShoppingSession({ items })
    const shoppingSessionRequest = shoppingSession.finalize()
    console.log(JSON.stringify(shoppingSessionRequest))
    let shoppingSessionResponse = {}
    try {
      shoppingSessionResponse = await axios.post(
        'http://localhost:5005/api/shoppingSession',
        shoppingSessionRequest, {
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (err) {
      console.log(err)
    }
    return shoppingSessionResponse
  }
}

export default FinalizeShoppingSessionController
