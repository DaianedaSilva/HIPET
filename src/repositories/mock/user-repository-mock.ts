import { User } from '../../entities'
import { UserRepository } from '../contracts'

export class UserRepositoryStub implements UserRepository {
  async add (user: User): Promise<any> {
    return {
      id: 'any_id',
      name: user.name,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber
    }
  }
}
