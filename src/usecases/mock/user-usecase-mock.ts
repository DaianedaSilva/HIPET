import { CreateUserContract, CreateUserDto } from '../contracts'

export const makeCreateUserUseCase = (): CreateUserContract => {
  class CreateUserUseCaseStub implements CreateUserContract {
    async execute (createUserDto: CreateUserDto): Promise<any> {
      return {
        status: 'SUCCESS',
        user: {
          id: 'any_id',
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
          phoneNumber: createUserDto.phoneNumber
        }
      }
    }
  }
  return new CreateUserUseCaseStub()
}
