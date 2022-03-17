import { User } from '../../../entities'
import { UserRepository } from '../../contracts/user-repository-contract'
import { MongoHelper } from '../../helpers/mongodb/mongo-helper'

export class MongoUserRepository implements UserRepository {
  async add (user: User): Promise<any> {
    const userCollection = await MongoHelper.getCollection('user')
    const result = await userCollection.insertOne(user)
    return MongoHelper.map(result.ops[0])
  }
}
