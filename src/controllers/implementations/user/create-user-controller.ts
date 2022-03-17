import { CreateUserContract } from '../../../usecases/contracts'
import { HttpController, HttpRequest, HttpResponse } from '../../contracts'
import { success, serverError } from '../../helpers/http-helpers'

export class CreateUserController implements HttpController {
  constructor (
    private readonly createUserUseCase: CreateUserContract
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.createUserUseCase.execute(httpRequest.body)
      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
