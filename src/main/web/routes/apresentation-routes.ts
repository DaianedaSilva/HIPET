import { Router } from 'express'
import { makeVersionController } from '../../factories'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/version', adaptRoute(makeVersionController()))
}
