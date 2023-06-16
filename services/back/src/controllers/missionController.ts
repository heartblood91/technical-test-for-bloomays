import { Request, Response } from 'express'

import airtable from '../services/airtable'

const missionController = {
  getAllMissions: async (req: Request, res: Response): Promise<void> => {
    await airtable
      .getAllMissions()
      .then((records) => {
        res.status(200).json(records)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).json(err)
      })
  }
}

export default missionController
