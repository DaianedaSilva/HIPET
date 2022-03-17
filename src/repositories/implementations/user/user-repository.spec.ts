import { User } from '../../../entities'
import { UserRepository } from '../../contracts'
import { MongoHelper } from '../../helpers/mongodb/mongo-helper'
import { MongoUserRepository } from './user-repository'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('user')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): UserRepository => {
    return new MongoUserRepository()
  }

  test('Shoult return an user account on success', async () => {
    const sut = makeSut()
    const userMock = new User()

    userMock.name = 'any_name'
    userMock.password = 'any_password'
    userMock.phoneNumber = '(00)1234-5678'
    userMock.email = 'any_email@mail.com'

    const account = await sut.add(userMock)
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
    expect(account.phoneNumber).toBe('(00)1234-5678')
  })
})
