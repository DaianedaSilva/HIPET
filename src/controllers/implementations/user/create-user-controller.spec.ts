import { CreateUserController } from './create-user-controller'
import { MissingParamError, ServerError } from '../../errors'
import { badRequest, serverError, success } from '../../helpers/http-helpers'
import { makeCreateUserUseCase } from '../../../usecases/mock'
import { CreateUserContract } from '../../../usecases/contracts'
import { HttpRequest } from '../../contracts'

interface SutTypes {
  sut: CreateUserController
  createUserUseCaseStub: CreateUserContract
}

const makeSut = (): SutTypes => {
  const createUserUseCaseStub = makeCreateUserUseCase()
  const sut = new CreateUserController(createUserUseCaseStub)
  return {
    sut,
    createUserUseCaseStub
  }
}

const mockBody = {
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  phoneNumber: '(00) 1234-5678'
}

const makeRequest = (body: any): HttpRequest => ({ body })

describe('Create User Controller', () => {
  test('Should return 500 if CreateUserUseCase throws', async () => {
    const { sut, createUserUseCaseStub } = makeSut()
    jest.spyOn(createUserUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if is missing a parameter', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({}))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      user: {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        phoneNumber: '(00) 1234-5678'
      }
    }))
  })
})
