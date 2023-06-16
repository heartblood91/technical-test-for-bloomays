import express, { Application } from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'

import routes from './routes'
import middleware from './middleware'

const PORT = process.env.BLOOMAYS_API_PORT || 4000

const app = express()
app.use(express.json())
app.use(compression())
app.use(bodyParser.json({ type: '*/*' }) as Application)

if (process.env.NODE_ENV?.trim() !== 'development') {
  app.use(helmet() as Application)
}

app.use(middleware.corsPolicy)
app.use(middleware.logs)
app.use('/api', routes)

app.listen(PORT, (): void => {
  console.log(`Now listening on ${PORT}`)
})

export default app
