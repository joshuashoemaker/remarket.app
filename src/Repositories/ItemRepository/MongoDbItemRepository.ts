import axios from 'axios'
import Item from '../../Entities/Item/Item'
import User from '../../Entities/User/User'
import makeItem from '../../Factories/Item/makeItem'
import makeItemClothing from '../../Factories/Item/makeItemClothing'
import ItemClothingConstructor from '../../Interfaces/Entities/IItemClothing'
import IItem from '../../Interfaces/Entities/IItem'
import IItemRepository from '../../Interfaces/Repositories/IItemRepository'
import ItemTypes from '../../StaticDataStructures/ItemTypes'

class MongoDbItemRepository implements IItemRepository {
  getAllItems = async (): Promise<IItem[] | null> => {
    let items: IItem[]
    try {
      const itemsResponse = await axios.get('/api/protected/item',
      {
        headers: {
          Authorization: `Bearer ${User.token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      
      if (itemsResponse.status !== 200) return null

      const itemsFromApi = itemsResponse.data.data as IItem[]
      items = itemsFromApi.map(i => {
        if (i.type === 'clothing') return makeItemClothing(i as ItemClothingConstructor)
        else return makeItem(i)
      })
    } catch (err) {
      console.log(err)
      return null
    }
    
    return items
  }

  addItem = (item: IItem) => { /* Not implemented */ }

  editById = async (id: string, modifications: IItem): Promise<IItem | null> => {
    let item: IItem | null = null

    modifications.imageUri = ''

    try {
      const itemResponse = await axios.post(
        `/api/protected/item/edit/${id}`,
        modifications,
        { headers: {
            Authorization: `Bearer ${User.token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
      if (itemResponse.status !== 201) return null
      const itemFromApi = itemResponse.data.data as IItem
      if (itemFromApi.type === 'clothing') item = makeItemClothing(itemFromApi as ItemClothingConstructor)
      else item = makeItem(itemFromApi)
    } catch (err) {
      console.log(err)
    }
    
    return item
  }

  findById = async (id: string): Promise<IItem | null> => {
    let item: IItem
    try {
      const itemResponse = await axios.get(`/api/protected/item/${id}`, {
        headers: {
          Authorization: `Bearer ${User.token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if (itemResponse.status !== 200) return null

      const itemFromApi = itemResponse.data.data as IItem

      if (itemFromApi.type === 'clothing') return makeItemClothing(itemFromApi as ItemClothingConstructor)
      else return makeItem(itemFromApi)
    } catch (err) {
      console.log(err)
      return null
    }
  }

  findByQuery = async (query: any): Promise<IItem[] | null> => {
    let items: IItem[] = []
    try {
      const itemsResponse = await axios.post('/api/protected/item/_find',
      query,
      {
        headers: {
          Authorization: `Bearer ${User.token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })

      if (itemsResponse.status !== 200) return null

      const itemsFromApi = itemsResponse.data.data as IItem[]
      items = itemsFromApi.map(i => {
        if (i.type === 'clothing') return makeItemClothing(i as ItemClothingConstructor)
        else return makeItem(i)
      })
    } catch (err) {
      console.log(err)
      return null
    }

    return items
  }

  findByBrand = (brand: string) => {
    return [new Item({id: 'test', isSold: false, isProcessed: false})]
    /* Not implemented */
  }

  findByLabel = (label: string) => {
    return [new Item({id: 'test', isSold: false, isProcessed: false})]
    /* Not implemented */
  }

  findByType = (type: ItemTypes) => {
    return [new Item({id: 'test', isSold: false, isProcessed: false})]
    /* Not implemented */
  }

  findByCostRange = (min: number, max: number) => {
    return [new Item({id: 'test', isSold: false, isProcessed: false})]
    /* Not implemented */
  }

  findByDescriptedTag = (tag: string) => {
    return [new Item({id: 'test', isSold: false, isProcessed: false})]
    /* Not implemented */
  }

  removeItemById = (id: string) => {
    return [new Item({id: 'test', isSold: false, isProcessed: false})]
    /* Not implemented */
  }
}

export default MongoDbItemRepository
