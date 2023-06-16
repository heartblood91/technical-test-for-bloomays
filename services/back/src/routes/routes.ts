import { Router } from 'express'

import { missionController } from '../controllers'

const router = Router()

router.get('/missions', missionController.getAllMissions)

export default router
