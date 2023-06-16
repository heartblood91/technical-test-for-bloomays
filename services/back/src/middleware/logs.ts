import { Request, Response, NextFunction } from 'express'

const logs = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now()

  const logRequest = () => {
    const { ip, method, originalUrl, headers } = req
    const { statusCode } = res
    const responseTime = Date.now() - startTime
    const language = headers['accept-language']

    console.log(
      `IP: ${ip} | Method: ${method} | URL: ${originalUrl} | Status: ${statusCode} | Response Time: ${responseTime}ms | Language: ${language}`
    )
  }
  res.on('finish', logRequest)
  res.on('close', logRequest)

  next()
}

export default logs
