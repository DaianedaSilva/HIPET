import { CreateUserController } from '../../../controllers/implementations'
import { MongoUserRepository } from '../../../repositories/implementations'
import { CreateUserUseCase } from '../../../usecases/implementations/user/create-user-usecase'

export const makeCreateUserController = (): CreateUserController => {
  const userRepository = new MongoUserRepository()
  const createUserUseCase = new CreateUserUseCase({ userRepository })

  return new CreateUserController(createUserUseCase)
}
