import { User } from '../../../entities'
import { UserRepository } from '../../../repositories/contracts'
import { CreateUserContract, CreateUserDto, CreateUserResult, CreateUserResultStatusOptions } from '../../contracts'

type Dependencies = {
  userRepository: UserRepository
}

export class CreateUserUseCase implements CreateUserContract {
  private readonly userRepository: UserRepository

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
  }

  private result (user: User, status: CreateUserResultStatusOptions = CreateUserResultStatusOptions.success): CreateUserResult {
    return { status, user }
  }

  async execute (userDto: CreateUserDto): Promise<CreateUserResult> {
    const user = new User()

    user.name = userDto.name
    user.email = userDto.email
    user.password = userDto.password
    user.phoneNumber = userDto.phoneNumber

    const createdUser = await this.userRepository.add(user)

    if (!createdUser) return this.result(createdUser, CreateUserResultStatusOptions.repository_error)

    return this.result(createdUser)
  }
}
