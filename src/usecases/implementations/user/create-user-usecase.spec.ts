import { UserRepository } from '../../../repositories/contracts'
import { UserRepositoryStub } from '../../../repositories/mock'
import { CreateUserContract } from '../../contracts'
import { CreateUserUseCase } from './create-user-usecase'

interface SutTypes {
  sut: CreateUserContract
  userRepositoryStub: UserRepository
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = new UserRepositoryStub()
  const sut = new CreateUserUseCase({ userRepository: userRepositoryStub })
  return {
    sut,
    userRepositoryStub
  }
}

describe('User - Create User Use Case', () => {
  test('Should return the correct data about this project', async () => {
    const { sut } = makeSut()
    const createUserDtoMock = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      phoneNumber: '(00)1234-5678'
    }
    const createUserResult = await sut.execute(createUserDtoMock)
    expect(createUserResult).toEqual({
      status: 'SUCCESS',
      user: {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        phoneNumber: '(00)1234-5678'
      }
    })
  })
})
