import express from 'express'
import cors from 'cors'
import { router } from './routes/index.js'
import errorMiddleware from './middleware/errorMiddleware.js'

const app = express()

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://kilpailuta365.fi',
    'https://www.kilpailuta365.fi'
  ],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/v1', router)
app.use(errorMiddleware)

export default app
