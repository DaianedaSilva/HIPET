import { User } from '../../entities'

export interface UserRepository {
  add(user: User): Promise<User>
}
