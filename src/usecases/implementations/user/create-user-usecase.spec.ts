import { UserRepository } from '../../../repositories/contracts'
import { UserRepositoryStub } from '../../../repositories/mock'
import { CreateUserContract, CreateUserResultStatusOptions } from '../../contracts'
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

const createUserDtoMock = {
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  phoneNumber: '(00) 1234-5678'
}

describe('User - Create User Use Case', () => {
  test('Should return REPOSITORY_ERROR status if repository throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'add').mockImplementationOnce(() => null)

    const createUserResult = await sut.execute(createUserDtoMock)
    expect(createUserResult).toEqual({
      status: CreateUserResultStatusOptions.repository_error,
      user: null
    })
  })

  test('Should return SUCCESS status and the correct data user', async () => {
    const { sut } = makeSut()
    const createUserResult = await sut.execute(createUserDtoMock)

    expect(createUserResult).toEqual({
      status: CreateUserResultStatusOptions.success,
      user: {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        phoneNumber: '(00) 1234-5678'
      }
    })
  })
})
