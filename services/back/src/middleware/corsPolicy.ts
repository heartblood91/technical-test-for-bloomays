import { Request, Response, NextFunction } from 'express'

const corsPolicy = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.BLOOMAYS_APP_URL || 'http://localhost:3000'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

export default corsPolicy
