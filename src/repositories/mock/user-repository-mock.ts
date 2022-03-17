import { User } from '../../entities'
import { makeUserMock } from '../../entities/mocks'
import { UserRepository } from '../contracts'

export class UserRepositoryStub implements UserRepository {
  async add (user: User): Promise<any> {
    return makeUserMock()
  }
}
