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

  insertOne = async (data: Record, collectionName: string): Promise<any> => {
    const db = this.client.db(SYS.databaseName)
    const collection = db.collection(collectionName)
    const saveResponse = await collection.insertOne(data.record)
    return saveResponse.ops[0]
  }

  insertMany = async (data: Record[], collectionName: string): Promise<any[]> => {
    const db = this.client.db(SYS.databaseName)
    const collection = db.collection(collectionName)
    const recordsProps = data.map(r => r.record)
    const saveResponse = await collection.insertMany(recordsProps)
    return saveResponse.ops
  }

  connect = async () => {
    await this.client.connect()
  }

  disconnect = async () => {
    await this.client.close()
  }
}

export default Db
