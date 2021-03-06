import { UserRepository } from '../../../../hipet/repositories/interfaces'
import { CryptographService } from '../../../../hipet/services/interfaces'
import { GetUserUseCase } from '../../../../hipet/usecases/implementations'
import { GetUserResultStatusOptions, GetUserUseCaseInterface } from '../../../../hipet/usecases/interfaces'
import { mockUser } from '../../../mocks/entity/user-mock'
import { UserRepositoryStub } from '../../../mocks/repositories'
import { CryptographServiceStub } from '../../../mocks/services'

interface SutTypes {
  sut: GetUserUseCaseInterface
  userRepositoryStub: UserRepository
  cryptographServiceStub: CryptographService

}

const makeSut = (): SutTypes => {
  const userRepositoryStub = new UserRepositoryStub()
  const cryptographServiceStub = new CryptographServiceStub()
  const sut = new GetUserUseCase({ userRepository: userRepositoryStub, crytographService: cryptographServiceStub })
  return {
    sut,
    userRepositoryStub,
    cryptographServiceStub
  }
}

const makeUserRequest = {
  email: 'any_email@mail.com'
}

describe('User - Use Case', () => {
  describe('Get User', () => {
    test('Should return USER_NOT_EXISTS status if repository returns null', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // email

      const getUserResult = await sut.get(makeUserRequest)
      expect(getUserResult).toEqual({
        status: GetUserResultStatusOptions.user_not_exists,
        user: null
      })
    })

    test('Should return SUCCESS and user data', async () => {
      const { sut } = makeSut()
      const getUserResult = await sut.get(makeUserRequest)

      expect(getUserResult).toEqual({
        status: GetUserResultStatusOptions.success,
        user: { ...mockUser, password: 'any_encoded_password', document: 'any_decoded_value' }
      })
    })
  })
})
