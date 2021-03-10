import { MongoClient } from 'mongodb'
import SYS from '../SYS'
import Record from './Interfaces/Database/Record'

let instance: Db | null = null

class Db {
  readonly client = new MongoClient(SYS.databaseConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })

  constructor () {
    if (!instance) instance = this
    return instance
  }

  find = async (query: Object, collectionName: string): Promise<any> => {
    try {
      const collection = this.db.collection(collectionName)
      const findResposne = await collection.find(query).toArray()
      return findResposne
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  insertOne = async (data: Record, collectionName: string): Promise<any> => {
    try {
      const collection = this.db.collection(collectionName)
      const saveResponse = await collection.insertOne(data.record)
      return saveResponse.ops[0]
    } catch (err) {
      throw err
    }
  }

  insertMany = async (data: Record[], collectionName: string): Promise<any[]> => {
    try {
      const collection = this.db.collection(collectionName)
      const recordsProps = data.map(r => r.record)
      const saveResponse = await collection.insertMany(recordsProps)
    return saveResponse.ops
    } catch (err) {
      throw err
    }
  }

  connect = async () => {
    await this.client.connect()
  }

  disconnect = async () => {
    await this.client.close()
  }

  get db () {
    return this.client.db(SYS.databaseName)
  }
}

export default Db
