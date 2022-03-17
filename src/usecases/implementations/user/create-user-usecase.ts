import { User } from '../../../entities'
import { UserRepository } from '../../../repositories/contracts'
import { CreateUserContract, CreateUserDto } from '../../contracts'

type Dependencies = {
  userRepository: UserRepository
}

export class CreateUserUseCase implements CreateUserContract {
  private readonly userRepository: UserRepository

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
  }

  async execute (userDto: CreateUserDto): Promise<any> {
    const user = new User()

    user.name = userDto.name
    user.email = userDto.email
    user.password = userDto.password
    user.phoneNumber = userDto.phoneNumber

    const result = await this.userRepository.add(user)
    console.log(result)

    return {
      status: 'SUCCESS',
      user: result
    }
  }
}
