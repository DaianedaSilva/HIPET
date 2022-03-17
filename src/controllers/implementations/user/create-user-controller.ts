import { CreateUserContract } from '../../../usecases/contracts'
import { HttpController, HttpRequest, HttpResponse } from '../../contracts'
import { MissingParamError } from '../../errors'
import { success, serverError, badRequest } from '../../helpers/http-helpers'

export class CreateUserController implements HttpController {
  constructor (
    private readonly createUserUseCase: CreateUserContract
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'phoneNumber']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const result = await this.createUserUseCase.execute(httpRequest.body)
      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
