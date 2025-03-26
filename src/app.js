import express from 'express'
import cors from 'cors'
import { router } from './routes/index.js'
import errorMiddleware from './middleware/errorMiddleware.js'

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())
app.use('/api/v1', router)
app.use(errorMiddleware)

export default app
