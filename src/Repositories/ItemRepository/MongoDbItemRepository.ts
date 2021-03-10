import axios from 'axios'
import Item from '../../Entities/Item/Item'
import makeItem from '../../Factories/Item/makeItem'
import makeItemClothing from '../../Factories/Item/makeItemClothing'
import ItemClothingConstructor from '../../Interfaces/Contructors/ItemClothingConstructor'
import ItemConstructor from '../../Interfaces/Contructors/ItemConstructor'
import IItem from '../../Interfaces/Entities/IItem'
import IItemRepository from '../../Interfaces/Repositories/IItemRepository'
import ApiItemResponse from '../../Interfaces/ResponseObjects/ApiItemResponse'

class MongoDbItemRepository implements IItemRepository {
  getAllItems = async (): Promise<IItem[] | null> => {
    let items: IItem[]
    try {
      const itemsResponse = await axios.get('http://localhost:5005/api/item')
      if (itemsResponse.status !== 200) return null

      const itemsFromApi = itemsResponse.data.data as ApiItemResponse[]
      items = itemsFromApi.map(i => {
        if (i.type === 'clothing') return makeItemClothing(i as ItemClothingConstructor)
        else return makeItem(i as ItemConstructor)
      })
    } catch (err) {
      console.log(err)
      return null
    }
    
    return items
  }

  addItem = (item: IItem) => { /* Not implemented */ }

  editById = (it: string, modifications: ItemConstructor): IItem => {
    return new Item({id: 'Test'})
    /* Not implemented */
  }

  findById = (id: string) => {
    return new Item({id: 'test'})
    /* Not implemented */
  }

  findByBrand = (brand: string) => {
    return [new Item({id: 'test'})]
    /* Not implemented */
  }

  findByLabel = (label: string) => {
    return [new Item({id: 'test'})]
    /* Not implemented */
  }

  findByType = (type: string) => {
    return [new Item({id: 'test'})]
    /* Not implemented */
  }

  findByCostRange = (min: number, max: number) => {
    return [new Item({id: 'test'})]
    /* Not implemented */
  }

  findByDescriptedTag = (tag: string) => {
    return [new Item({id: 'test'})]
    /* Not implemented */
  }

  removeItemById = (id: string) => {
    return [new Item({id: 'test'})]
    /* Not implemented */
  }
}

export default MongoDbItemRepository
