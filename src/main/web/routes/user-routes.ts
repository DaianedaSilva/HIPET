import { Router } from 'express'
import { makeCreateUserController } from '../../factories'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/user/create', adaptRoute(makeCreateUserController()))
}
